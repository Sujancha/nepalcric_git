# QA Gate — Pre-Publication Checklist

> Copied verbatim from CLAUDE.md. This is the complete quality standard. Every draft must pass all ten questions before status is changed from `PENDING_QA` to `APPROVED`.

---

## Step 0 — Programmatic Sanitisation Gate

**This runs before the literary checklist. It is automated. It is not optional.**

```bash
npm run qa:sanitise -- <draft_id>
```

Script: `agents/qa_gate/sanitise.mjs`
Report output: `agents/qa_gate/qa_report.md`

| Check | What it does | Fail outcome |
|-------|-------------|--------------|
| remark parse | Parses draft with `remark` + `remark-lint` | BLOCKED — stop, do not run literary checks |
| HTML/script injection | Detects `html` AST nodes, `<script>`, `javascript:`, `onX=`, `eval()`, `process.env`, etc. Strips them from a sanitised copy | BLOCKED |
| MDX/JSX syntax | Regex scan for capitalised component tags (`<MyComponent>`) that break Next.js build | BLOCKED |
| URL approval | Extracts all URLs from AST, checks hostnames against `agents/research_scout/sources.md` | BLOCKED |

**Status outcomes:**
- `CLEAN` (exit 0) → proceed to The Ten Questions below
- `BLOCKED` (exit 1) → update DRAFTS.md status to `BLOCKED`, report findings, stop here

---

## The Ten Questions

Answer each question for the draft under review. Mark ✅ PASS or ❌ FAIL. If any answer is FAIL — the draft is returned to Lore Drafter with specific notes. It does not advance.

**1. Does the first sentence open a knowledge deficit so uncomfortable the reader cannot close the tab?**
- PASS: The opening withholds a key piece of information — the reader's curiosity is activated before they understand why.
- FAIL: The opening announces who the subject is, where they are from, and what they achieved. Wikipedia energy.

**2. Have I described every emotion through the body rather than naming it?**
- PASS: No words like "sad," "happy," "scared," "proud," "nervous" appear anywhere in the draft.
- FAIL: Any emotion-naming word found = automatic FAIL. Flag the exact line.

**3. Can the reader smell Nepal? Can they hear TU Ground?**
- PASS: At least one sensory detail from Nepal's Sensory Lexicon (in `soul.md`) is deployed precisely — not generically.
- FAIL: The setting could exist in any country in the world. Generic dust. Generic crowd noise.

**4. Is there a Zeigarnik loop that opens before the midpoint and does not close until the final third?**
- PASS: A question or tension is raised in Act 1 or 2 that is not resolved until Act 5 or 6.
- FAIL: Every tension resolves within the same paragraph it opens.

**5. Does the visual layout breathe?**
- PASS: At least one Isolated gut-punch line is surrounded by white space. Paragraphs are not walls of text.
- FAIL: All content is packed into uniform blocks with no visual breathing room.

**6. Am I writing about the institution or the human being who survived it?**
- PASS: The primary subject is a person with a body, a wound, a decision. The institution (NCA, tournament, cricket board) is backdrop.
- FAIL: The piece reads like an official biography or administrative record.

**7. Are there at least two emotional threads running simultaneously?**
- PASS: An external thread (match result, record broken) runs alongside an internal thread (identity question, personal cost, family wound).
- FAIL: Only one thread exists. All tension is external (match outcomes) with no interior life.

**8. If someone screenshots the climax section and sends it with no context — does it still hit?**
- PASS: The climax section contains one specific, frozen image that creates feeling without requiring the surrounding context.
- FAIL: The climax requires the reader to have read everything before it to feel anything.

**9. Does sharing this content make the reader feel like a more resilient, more proud Nepali?**
- PASS: The draft touches at least two of the Five Core Frequencies from `soul.md`.
- FAIL: The draft could describe any underdog athlete from any country.

**10. When they read the last word — do they feel something they cannot immediately name?**
- PASS: The final sentence contains "तपाईं" and leaves something unresolved in the reader. Read it aloud — does it make you pause?
- FAIL: The final sentence summarises, concludes, or wraps up cleanly. Newspaper energy.

---

## QA Gate Decision Protocol

| Result | Action |
|--------|--------|
| All 10 PASS | Change draft status in `DRAFTS.md` to `APPROVED`. Notify Sujan. |
| 1–2 FAIL | Return to Lore Drafter. Write specific revision notes under the draft entry in `DRAFTS.md`. Status: `REVISION_REQUIRED`. |
| 3+ FAIL | Full redraft required. Status: `REDRAFT`. Summarise structural failures — do not give line-by-line notes. |

---

## Additional QA Gate Checks (Non-Negotiable)

Beyond the ten questions, also verify:

- [ ] Zero Latin script in any content field
- [ ] Zero Hindi loanwords (खेलते, बोलते, etc.)
- [ ] All statistics referenced against `verified_facts.json` — no invented numbers
- [ ] All `[UNVERIFIED]` tags from the Research Scout are still present and flagged to Sujan for manual verification before publishing
- [ ] "तपाईं" used maximum five times in the piece
- [ ] Isolated gut-punch lines: maximum four in the piece
- [ ] No direct quote altered from what appears in `verified_facts.json`
- [ ] Hero quote is ≤10 words (ideally ≤7)
- [ ] `excerpt_ne` (squad card punchline) is one sentence, punchy, not encyclopaedic
- [ ] Word count is within range: player lore 800–1,200 words, match preview 400–600 words

---

## The Hard No List (instant FAIL triggers)

Any of the following found in a draft = immediate FAIL, no partial credit:

- ❌ "उनी खुशी भए" or any emotion-naming equivalent
- ❌ Any sentence beginning with a statistic before its human cost has been established
- ❌ Wikipedia-style opening: "[Name] was born in [place] on [date]."
- ❌ "र त्यसपछि" (and then) connecting two major events with no causation
- ❌ A closing sentence that does not contain "तपाईं"
- ❌ Latin script of any kind in content fields
- ❌ A sensory detail that could exist anywhere in the world
