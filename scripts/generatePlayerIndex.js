#!/usr/bin/env node
/**
 * generatePlayerIndex.js
 *
 * Reads all .md files from content/players/, parses YAML frontmatter,
 * and writes a lightweight src/lib/playerIndex.json for use by the app.
 *
 * Run: node scripts/generatePlayerIndex.js
 * Or:  npm run generate:players
 *
 * This script is ADDITIVE. It does not modify playerData.json or any imports.
 * content/players/ is the source of truth. src/lib/playerIndex.json is derived.
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const PLAYERS_DIR = path.join(__dirname, '..', 'content', 'players')
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'playerIndex.json')

function buildImagePath(id) {
  return `/images/players/${id}/portrait.webp`
}

function generatePlayerIndex() {
  if (!fs.existsSync(PLAYERS_DIR)) {
    console.error(`ERROR: content/players/ not found at ${PLAYERS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(PLAYERS_DIR).filter(f => f.endsWith('.md'))

  if (files.length === 0) {
    console.warn('WARNING: No .md files found in content/players/')
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2), 'utf8')
    console.log('Wrote empty index to', OUTPUT_FILE)
    return
  }

  const index = []
  const errors = []

  for (const file of files) {
    const filePath = path.join(PLAYERS_DIR, file)
    try {
      const raw = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(raw)

      // Skip files with no id in frontmatter (e.g. README.md)
      if (!data.id) continue

      const id = data.id

      index.push({
        id,
        name_en:     data.name_en     || null,
        name_ne:     data.name_ne     || null,
        role:        data.role        || null,
        status:      data.status      || null,
        cricinfo_id: data.cricinfo_id || null,
        debut_date:  data.debut_date instanceof Date
          ? data.debut_date.toISOString().slice(0, 10)
          : (data.debut_date || null),
        hero_quote:  data.hero_quote  || null,
        image_path:  buildImagePath(id),
      })
    } catch (err) {
      errors.push({ file, error: err.message })
    }
  }

  // Sort by status (ACTIVE first) then alphabetically by id
  index.sort((a, b) => {
    if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1
    if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1
    return a.id.localeCompare(b.id)
  })

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf8')

  console.log(`✓ playerIndex.json written — ${index.length} player(s)`)
  index.forEach(p => console.log(`  · ${p.id} [${p.status}]`))

  if (errors.length > 0) {
    console.warn(`\nWARNING: ${errors.length} file(s) failed to parse:`)
    errors.forEach(e => console.warn(`  · ${e.file}: ${e.error}`))
  }
}

generatePlayerIndex()
