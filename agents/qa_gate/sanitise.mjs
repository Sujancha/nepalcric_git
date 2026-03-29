#!/usr/bin/env node
/**
 * NepalCric QA Gate — Step 0: Programmatic Sanitisation
 *
 * Usage:
 *   node agents/qa_gate/sanitise.mjs <draft_id>
 *   npm run qa:sanitise -- <draft_id>
 *
 * Runs BEFORE the literary checklist. This is a hard security gate.
 * If any check fails → status = BLOCKED, literary QA does not proceed.
 *
 * Checks (in order):
 *   1. remark parse — if the draft markdown fails to parse, BLOCKED
 *   2. HTML/script injection — strip & BLOCK if found
 *   3. Broken MDX/JSX syntax — BLOCK if found
 *   4. Unapproved URLs — BLOCK if any URL is not in sources.md allowed list
 *
 * Outputs:
 *   agents/qa_gate/qa_report.md  — detailed findings (always written)
 *   DRAFTS.md                    — status updated to BLOCKED if any check fails
 *   Exit code 0 = CLEAN, 1 = BLOCKED
 */

import { remark } from 'remark'
import remarkLint from 'remark-lint'
import remarkLintNoHtml from 'remark-lint-no-html'
import { visit } from 'unist-util-visit'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const DRAFTS_PATH   = path.join(ROOT, 'DRAFTS.md')
const SOURCES_PATH  = path.join(ROOT, 'agents', 'research_scout', 'sources.md')
const REPORT_PATH   = path.join(ROOT, 'agents', 'qa_gate', 'qa_report.md')
const RUN_LOG_PATH  = path.join(ROOT, 'agents', 'run_log.json')

// ---------------------------------------------------------------------------
// Dangerous patterns (applied to raw text — defence-in-depth over AST walk)
// ---------------------------------------------------------------------------
const DANGEROUS_PATTERNS = [
  { pattern: /<script[\s>]/gi,        label: 'script tag' },
  { pattern: /<\/script>/gi,          label: 'closing script tag' },
  { pattern: /javascript\s*:/gi,      label: 'javascript: URI' },
  { pattern: /on\w+\s*=\s*["'`{]/gi, label: 'inline event handler (onX=)' },
  { pattern: /<style[\s>]/gi,         label: 'style tag' },
  { pattern: /data\s*:\s*text\/html/gi, label: 'data:text/html URI' },
  { pattern: /eval\s*\(/gi,           label: 'eval() call' },
  { pattern: /import\s*\(/gi,         label: 'dynamic import()' },
  { pattern: /require\s*\(/gi,        label: 'require() call' },
  { pattern: /process\.env/gi,        label: 'process.env access' },
  { pattern: /child_process/gi,       label: 'child_process reference' },
  { pattern: /exec\s*\(/gi,           label: 'exec() call' },
]

// MDX/JSX: capitalised component tags that remark-parse won't handle cleanly
// e.g. <MyComponent>, <SomeWidget />, </Foo>
const JSX_COMPONENT_RE = /<\/?[A-Z][a-zA-Z0-9.]*(\s[^>]*)?\/?>/g

// ---------------------------------------------------------------------------
// Approved domains — parsed from sources.md
// ---------------------------------------------------------------------------
async function loadApprovedDomains() {
  const src = await fs.readFile(SOURCES_PATH, 'utf8')
  const domains = new Set()

  // Extract bare hostnames/domains from markdown table cells and code spans
  // Matches things like: cricinfo.com, icc-cricket.com, kathmandupot.com
  const domainRe = /\b([a-z0-9-]+(?:\.[a-z]{2,}){1,3})\b/g
  let m
  while ((m = domainRe.exec(src)) !== null) {
    const candidate = m[1]
    // Skip version numbers (1.0.3), markdown artefacts, and file extensions
    if (/^\d/.test(candidate)) continue
    if (['md', 'mjs', 'js', 'ts', 'tsx', 'json'].includes(candidate.split('.').pop())) continue
    if (candidate.includes('.md') || candidate.includes('.js')) continue
    domains.add(candidate)
  }

  // Always permit localhost and relative paths (no host)
  domains.add('localhost')
  return domains
}

// ---------------------------------------------------------------------------
// Extract a single draft entry block from DRAFTS.md
// Returns { raw: string } or null
//
// An entry block starts with exactly: ---\ndraft_id: <id>
// and ends before the next such block or EOF.
// We use this specific two-line pattern to avoid confusing DRAFTS.md
// horizontal-rule `---` separators with frontmatter delimiters.
// ---------------------------------------------------------------------------
function extractDraftEntry(draftsContent, draftId) {
  const escaped = draftId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Match from "---\ndraft_id: <id>" until the next entry block, a top-level
  // DRAFTS.md section boundary (`\n---\n\n##`), or EOF.
  // The section-boundary stop prevents template sections like "## Published Archive"
  // from being captured as part of the entry body.
  const pattern = new RegExp(
    `(---\\r?\\ndraft_id:\\s*${escaped}[\\s\\S]*?)(?=\\n---\\r?\\ndraft_id:|\\n+---\\n+##|$)`,
  )
  const match = pattern.exec(draftsContent)
  if (!match) return null
  return { raw: match[1].trim() }
}

// ---------------------------------------------------------------------------
// Extract all URLs from a remark AST
// ---------------------------------------------------------------------------
function extractUrls(ast) {
  const urls = []
  visit(ast, ['link', 'image', 'definition'], (node) => {
    if (node.url) urls.push(node.url)
  })
  // Also catch bare URLs in HTML nodes
  visit(ast, 'html', (node) => {
    const hrefRe = /href=["']([^"']+)["']/gi
    const srcRe  = /src=["']([^"']+)["']/gi
    let m
    while ((m = hrefRe.exec(node.value)) !== null) urls.push(m[1])
    while ((m = srcRe.exec(node.value))  !== null) urls.push(m[1])
  })
  return urls
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const draftId = process.argv[2]
  if (!draftId) {
    console.error('Usage: node agents/qa_gate/sanitise.mjs <draft_id>')
    process.exit(1)
  }

  const runAt = new Date().toISOString()
  const findings = []   // { check, severity, detail }
  let sanitisedContent = null  // populated if content was stripped

  // ── Read DRAFTS.md ──────────────────────────────────────────────────────
  let draftsContent
  try {
    draftsContent = await fs.readFile(DRAFTS_PATH, 'utf8')
  } catch {
    console.error('DRAFTS.md not found at', DRAFTS_PATH)
    process.exit(1)
  }

  const entry = extractDraftEntry(draftsContent, draftId)
  if (!entry) {
    console.error(`Draft "${draftId}" not found in DRAFTS.md`)
    console.error('Available draft_ids:')
    const idRe = /^draft_id:\s*(.+)$/gm
    let m
    while ((m = idRe.exec(draftsContent)) !== null) console.error(' ', m[1].trim())
    process.exit(1)
  }

  let rawContent = entry.raw

  // ── CHECK 1: remark parse ───────────────────────────────────────────────
  let ast
  try {
    // Use remark-lint + remark-lint-no-html to catch HTML in markdown
    const file = await remark()
      .use(remarkLint)
      .use(remarkLintNoHtml)
      .process(rawContent)

    ast = remark().parse(rawContent)

    // Collect lint warnings (remark-lint-no-html violations)
    for (const msg of file.messages) {
      if (msg.fatal) {
        findings.push({ check: 'remark-parse', severity: 'BLOCKED', detail: msg.message })
      } else {
        findings.push({ check: 'remark-lint', severity: 'WARNING', detail: `${msg.message} (line ${msg.line})` })
      }
    }
  } catch (err) {
    findings.push({
      check: 'remark-parse',
      severity: 'BLOCKED',
      detail: `Markdown parse failure: ${err.message}`,
    })
    // Cannot proceed without a valid AST
    await writeReport(draftId, runAt, findings, rawContent, sanitisedContent)
    await updateDraftsStatus(draftsContent, draftId, 'BLOCKED')
    await appendRunLog(draftId, runAt, findings)
    console.error('BLOCKED — markdown parse failure')
    process.exit(1)
  }

  // ── CHECK 2: HTML nodes in AST + dangerous raw patterns ─────────────────
  const htmlNodes = []
  visit(ast, 'html', (node) => {
    htmlNodes.push({ value: node.value, position: node.position })
  })

  if (htmlNodes.length > 0) {
    for (const node of htmlNodes) {
      findings.push({
        check: 'html-injection',
        severity: 'BLOCKED',
        detail: `Raw HTML node found: ${node.value.slice(0, 120).replace(/\n/g, '↵')}${node.value.length > 120 ? '…' : ''}`,
      })
    }
    // Strip all HTML nodes from raw content
    sanitisedContent = rawContent
    for (const node of htmlNodes) {
      sanitisedContent = sanitisedContent.replace(node.value, `<!-- [SANITISED: HTML removed] -->`)
    }
    rawContent = sanitisedContent
  }

  // Dangerous pattern scan on raw text
  for (const { pattern, label } of DANGEROUS_PATTERNS) {
    const matches = [...rawContent.matchAll(pattern)]
    for (const match of matches) {
      findings.push({
        check: 'dangerous-pattern',
        severity: 'BLOCKED',
        detail: `Dangerous pattern "${label}" at position ${match.index}: "${match[0]}"`,
      })
      // Strip the dangerous pattern
      if (!sanitisedContent) sanitisedContent = rawContent
      sanitisedContent = sanitisedContent.replace(match[0], `[SANITISED: ${label} removed]`)
    }
    if (sanitisedContent) rawContent = sanitisedContent
  }

  // ── CHECK 3: MDX/JSX component syntax ───────────────────────────────────
  const jsxMatches = [...entry.raw.matchAll(JSX_COMPONENT_RE)]
  for (const match of jsxMatches) {
    findings.push({
      check: 'mdx-jsx-syntax',
      severity: 'BLOCKED',
      detail: `JSX/MDX component syntax found: "${match[0]}" — this will break the Next.js build if not caught here`,
    })
  }

  // ── CHECK 4: URL approval ────────────────────────────────────────────────
  let approvedDomains
  try {
    approvedDomains = await loadApprovedDomains()
  } catch (err) {
    findings.push({
      check: 'url-check',
      severity: 'WARNING',
      detail: `Could not load sources.md for URL validation: ${err.message}`,
    })
    approvedDomains = new Set()
  }

  const urls = extractUrls(ast)
  for (const url of urls) {
    // Skip relative URLs and anchors
    if (url.startsWith('/') || url.startsWith('#') || url.startsWith('.')) continue
    let hostname
    try {
      hostname = new URL(url).hostname.replace(/^www\./, '')
    } catch {
      findings.push({
        check: 'url-check',
        severity: 'BLOCKED',
        detail: `Malformed URL: "${url}"`,
      })
      continue
    }

    // Check against approved domains (partial match — subdomains OK)
    const approved = [...approvedDomains].some(d => hostname === d || hostname.endsWith('.' + d))
    if (!approved) {
      findings.push({
        check: 'url-check',
        severity: 'BLOCKED',
        detail: `URL not in approved sources: "${url}" (hostname: ${hostname})`,
      })
    }
  }

  // ── Determine overall result ─────────────────────────────────────────────
  const blocked = findings.filter(f => f.severity === 'BLOCKED')
  const warnings = findings.filter(f => f.severity === 'WARNING')
  const status = blocked.length > 0 ? 'BLOCKED' : 'CLEAN'

  // ── Write qa_report.md ───────────────────────────────────────────────────
  await writeReport(draftId, runAt, findings, entry.raw, sanitisedContent)

  // ── Update DRAFTS.md if blocked ──────────────────────────────────────────
  if (status === 'BLOCKED') {
    await updateDraftsStatus(draftsContent, draftId, 'BLOCKED', findings)
  }

  // ── Append to run_log.json ───────────────────────────────────────────────
  await appendRunLog(draftId, runAt, findings)

  // ── Console summary ──────────────────────────────────────────────────────
  console.log(`\n── Sanitisation Gate: ${status} ──`)
  console.log(`Draft:    ${draftId}`)
  console.log(`Blocked:  ${blocked.length}`)
  console.log(`Warnings: ${warnings.length}`)
  console.log(`URLs checked: ${urls.length}`)

  if (blocked.length > 0) {
    console.log('\nBLOCKED findings:')
    for (const f of blocked) {
      console.log(`  [${f.check}] ${f.detail}`)
    }
    if (sanitisedContent) {
      console.log('\nNote: Sanitised content written to qa_report.md — review before republishing.')
    }
    console.log('\nReport: agents/qa_gate/qa_report.md')
    console.log('Literary QA (Step 1-10) is SUSPENDED until all BLOCKED findings are resolved.\n')
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.log('\nWarnings (do not block):')
    for (const f of warnings) console.log(`  [${f.check}] ${f.detail}`)
  }

  console.log('\n✓ Draft is clean. Literary QA checklist may proceed.\n')
  process.exit(0)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function writeReport(draftId, runAt, findings, originalContent, sanitisedContent) {
  const blocked  = findings.filter(f => f.severity === 'BLOCKED')
  const warnings = findings.filter(f => f.severity === 'WARNING')
  const status   = blocked.length > 0 ? 'BLOCKED' : 'CLEAN'

  const lines = [
    `# QA Gate — Sanitisation Report`,
    ``,
    `**Draft ID:** \`${draftId}\``,
    `**Run at:** ${runAt}`,
    `**Result:** ${status}`,
    `**Blocked findings:** ${blocked.length}`,
    `**Warnings:** ${warnings.length}`,
    ``,
    `---`,
    ``,
  ]

  if (blocked.length > 0) {
    lines.push(`## BLOCKED Findings`, ``)
    for (const f of blocked) {
      lines.push(`### [${f.check}]`)
      lines.push(`> ${f.detail}`)
      lines.push(``)
    }
  }

  if (warnings.length > 0) {
    lines.push(`## Warnings`, ``)
    for (const f of warnings) {
      lines.push(`- **[${f.check}]** ${f.detail}`)
    }
    lines.push(``)
  }

  if (status === 'CLEAN') {
    lines.push(`## Result`, ``, `All sanitisation checks passed. Proceed to literary QA (Step 1–10).`, ``)
  }

  if (sanitisedContent) {
    lines.push(
      `---`,
      ``,
      `## Sanitised Content`,
      ``,
      `> The following content had dangerous patterns removed. Review before re-entering the pipeline.`,
      ``,
      '```markdown',
      sanitisedContent,
      '```',
      ``,
    )
  }

  lines.push(
    `---`,
    ``,
    `## Original Content Snapshot`,
    ``,
    '```markdown',
    originalContent.slice(0, 2000) + (originalContent.length > 2000 ? '\n… [truncated at 2000 chars]' : ''),
    '```',
    ``,
    `*Report generated by \`agents/qa_gate/sanitise.mjs\`*`,
  )

  await fs.writeFile(REPORT_PATH, lines.join('\n'), 'utf8')
}

async function updateDraftsStatus(draftsContent, draftId, newStatus, findings = []) {
  // Find "---\ndraft_id: <id>\n...status: <old>\n..." and replace the status line.
  // We locate the entry block using the same two-line anchor as extractDraftEntry.
  const escaped = draftId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  // Replace the status line ONLY within the matching entry's frontmatter
  // The frontmatter ends at the next standalone "---" line that closes it.
  const entryPattern = new RegExp(
    `(---\\r?\\ndraft_id:\\s*${escaped}[\\s\\S]*?)(status:\\s*[^\\n]+)`,
  )

  if (!entryPattern.test(draftsContent)) {
    console.warn(`Warning: could not update status for "${draftId}" in DRAFTS.md`)
    return
  }

  let updated = draftsContent.replace(entryPattern, (_, before, _statusLine) => {
    return `${before}status: ${newStatus}`
  })

  // Append a BLOCKED note inline after the entry's frontmatter closing ---
  if (newStatus === 'BLOCKED' && findings.length > 0) {
    const top = findings.slice(0, 3).map(f => `- [${f.check}] ${f.detail}`).join('\n')
    const more = findings.length > 3 ? `\n- … and ${findings.length - 3} more (see qa_report.md)` : ''
    const note = `\n\n> **BLOCKED by sanitisation gate** (${new Date().toISOString()})\n${top}${more}\n> Full report: \`agents/qa_gate/qa_report.md\``

    // Insert after the first `---` that closes the entry frontmatter
    const closePattern = new RegExp(
      `(---\\r?\\ndraft_id:\\s*${escaped}[\\s\\S]*?\\n---)`
    )
    updated = updated.replace(closePattern, (match) => match + note)
  }

  await fs.writeFile(DRAFTS_PATH, updated, 'utf8')
}

async function appendRunLog(draftId, runAt, findings) {
  let log = { schema_version: '1.0', runs: [] }
  try {
    const raw = await fs.readFile(RUN_LOG_PATH, 'utf8')
    log = JSON.parse(raw)
  } catch { /* first run or missing file */ }

  const blocked = findings.filter(f => f.severity === 'BLOCKED')
  log.runs.push({
    run_id:       `${runAt}-sanitise-${draftId}`,
    trigger:      `sanitise ${draftId}`,
    date:         runAt,
    phases:       ['qa_gate_step0_sanitise'],
    draft_id:     draftId,
    result:       blocked.length > 0 ? 'BLOCKED' : 'CLEAN',
    blocked_count: blocked.length,
    checks:       findings.map(f => ({ check: f.check, severity: f.severity })),
  })

  await fs.writeFile(RUN_LOG_PATH, JSON.stringify(log, null, 2), 'utf8')
}

main().catch(err => {
  console.error('Unhandled error in sanitise.mjs:', err)
  process.exit(1)
})
