# /draft — Full Pipeline: Research Scout → Lore Drafter → QA Gate

Run the complete 3-agent pipeline for player `$ARGUMENTS`.

---

## PHASE 1 — RESEARCH SCOUT

**Goal:** Gather and verify all facts needed to write the player's lore.

**Step 1.1 — Load existing player file**
Read `content/players/$ARGUMENTS.md`. Extract:
- `cricinfo_id` (required for stat lookup)
- `name_en`, `name_ne`, `role`, `status`, `debut_date`, `debut_match`
- Existing `lore_ne`, `hero_quote`, `excerpt_ne` (note what already exists — do not discard good existing content)

If the file does not exist, create a stub at `content/players/$ARGUMENTS.md` using the 7-tier YAML schema from CLAUDE.md before proceeding.

**Step 1.2 — Fetch from ESPNCricinfo**
Use WebFetch on: `https://www.espncricinfo.com/player/[name]-[cricinfo_id]`
Also try: `https://www.espncricinfo.com/cricketers/[name]-[cricinfo_id]`

Extract:
- Full name, date of birth, birthplace
- Batting/bowling style
- Debut date and match details (verify against existing .md data)
- Career stats: matches, runs, average, strike rate, wickets, economy
- Highest score, best bowling figures
- Any notable records or milestones mentioned

**Step 1.3 — Cross-reference with news sources**
WebSearch for: `"[name_en]" Nepal cricket site:kathmandupot.com OR site:onlinekhabar.com OR site:espn.com`

Extract:
- Confirmed biographical details (hometown, family, early life)
- Notable quotes (exact words only — never paraphrase)
- Career-defining moments or incidents
- Any controversy or hardship that shaped their journey

**Step 1.4 — Build verified_facts.json**
Write output to `agents/research_scout/output/$ARGUMENTS-facts.json` using this exact schema:

```json
{
  "player_id": "$ARGUMENTS",
  "run_date": "[today's ISO date]",
  "facts": [
    {
      "category": "identity | debut | record | personal | context",
      "claim": "plain factual statement",
      "source_url": "URL or null",
      "source_label": "ESPNCricinfo | Kathmandu Post | etc.",
      "unverified": false
    }
  ],
  "flagged_gaps": ["any fact needed but not found"]
}
```

Tag any fact you could not verify from a Tier 1 or Tier 2 source as `"unverified": true`.

---

## PHASE 2 — LORE DRAFTER

**Goal:** Transform verified_facts.json into cinematic literary Nepali prose.

**Step 2.1 — Read soul.md**
Read `agents/lore_drafter/soul.md` in full before writing a single word.

**Step 2.2 — Read the gold standard**
Read `content/players/kushal-bhurtel.md` — specifically the `lore_ne` field. This is the benchmark for quality, rhythm, and emotional depth.

**Step 2.3 — Draft the following fields (all in Devanagari)**

`hero_quote` — 1 defining line, ≤10 words. Not a sentence. A weapon.

`excerpt_ne` — 1 punchy sentence for the squad grid card. Cinematic, not encyclopaedic.

`lore_ne` — 800–1,200 words following the Six-Act Structure from soul.md:
- Act 1 (The Arrival): Drop reader into a tense moment. Withhold subject identity until end of paragraph. Apply The Delayed Reveal Rule.
- Act 2 (Ordinary World): At least one Proustian Nepali sensory anchor from the Sensory Lexicon.
- Act 3 (Inciting Incident): Every paragraph follows But/Therefore logic — never And Then.
- Act 4 (The Ordeal): The darkest fact sits alone. Von Restorff isolation.
- Act 5 (Resurrection): One frozen cinematic image at the climax.
- Act 6 (The Return): Final sentence contains "तपाईं".

**Mandatory rules during drafting:**
- Never name emotions — describe body or environment only
- Never use Latin script
- Never use Hindi loanwords
- Maximum 5 uses of "तपाईं" in the entire piece
- Maximum 4 isolated gut-punch lines
- Every statistic must be translated into human cost before appearing

**Step 2.4 — Self-check before marking PENDING_QA**
Answer the 10 questions from `agents/qa_gate/checklist.md` privately. Revise until all 10 pass.

---

## PHASE 3 — QA GATE

**Goal:** Formally grade the draft against the 10-point checklist.

**Step 3.0 — Sanitisation gate (MUST run first)**

Before any literary checks, run:
```bash
npm run qa:sanitise -- $ARGUMENTS-[YYYY-MM-DD]
```

If exit code is 1 (BLOCKED): append to DRAFTS.md with status `BLOCKED`, report the findings from `agents/qa_gate/qa_report.md` to the user, and stop here. Do NOT proceed to literary checks.

If exit code is 0 (CLEAN): continue.

**Step 3.1 — Read checklist.md**
Read `agents/qa_gate/checklist.md` in full.

**Step 3.2 — Grade each question**
For each of the 10 questions, mark: ✅ PASS or ❌ FAIL with a one-line reason.

Also check the Additional QA Gate items (Hard No List).

**Step 3.3 — Write decision**

If all 10 PASS → status: `APPROVED`
If 1–2 FAIL → status: `REVISION_REQUIRED`, include specific revision notes
If 3+ FAIL → status: `REDRAFT`, include structural failure summary

**Step 3.4 — Append to DRAFTS.md**

Append the following to the Active Drafts section of `DRAFTS.md`:

```markdown
---
draft_id: $ARGUMENTS-[YYYY-MM-DD]
type: player_lore
status: [APPROVED | REVISION_REQUIRED | REDRAFT]
run_date: [ISO date]
source_file: agents/research_scout/output/$ARGUMENTS-facts.json
---

### QA Gate Results

| # | Question | Result | Notes |
|---|----------|--------|-------|
| 1 | Knowledge deficit hook | ✅/❌ | ... |
...

### Draft Content (if APPROVED or REVISION_REQUIRED)

**hero_quote:** [value]

**excerpt_ne:** [value]

**lore_ne:**
[full draft]

### Revision Notes (if REVISION_REQUIRED or REDRAFT)
[specific notes]
```

---

## PHASE 4 — RUN LOG

Append one entry to `agents/run_log.json`:

```json
{
  "run_id": "[timestamp]-draft-$ARGUMENTS",
  "trigger": "/draft $ARGUMENTS",
  "date": "[ISO date]",
  "phases": ["research_scout", "lore_drafter", "qa_gate"],
  "output_files": [
    "agents/research_scout/output/$ARGUMENTS-facts.json",
    "DRAFTS.md"
  ],
  "qa_result": "[APPROVED | REVISION_REQUIRED | REDRAFT]",
  "unverified_facts_count": 0,
  "flagged_gaps_count": 0
}
```

---

## FINAL OUTPUT TO USER

Report:
1. Research Scout: how many facts gathered, how many unverified, how many gaps
2. Lore Drafter: word count of lore_ne
3. QA Gate: final status and any failed questions
4. What to do next (if APPROVED: ready to publish; if REVISION_REQUIRED: specific what needs fixing)
