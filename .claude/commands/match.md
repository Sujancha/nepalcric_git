# /match — Match Preview Pipeline: Research Scout → Lore Drafter → QA Gate

Run the match preview pipeline for Nepal vs `$ARGUMENTS`.

---

## PHASE 1 — RESEARCH SCOUT (Match Mode)

**Goal:** Gather opponent intelligence and head-to-head context.

**Step 1.1 — Fetch opponent profile from ICC**
WebFetch: `https://www.icc-cricket.com/rankings/mens/team-rankings/odi` and T20I equivalent.
Extract: Current ICC ranking for `$ARGUMENTS`.

WebSearch: `"Nepal vs $ARGUMENTS" cricket head-to-head results site:espncricinfo.com`
Extract: All head-to-head results with dates, venues, margins.

**Step 1.2 — Identify opponent's danger player**
WebSearch: `"$ARGUMENTS" cricket "best player" OR "top scorer" OR "leading wicket" 2024 2025`
Extract: Name, role, key stat, and one defining moment that makes them a threat to Nepal.

**Step 1.3 — Identify Nepal's weapon**
Read `content/players/*.md` — identify the player whose strengths most directly counter the opponent.
Consider: role matchups, recent form (from any news source), head-to-head history.

**Step 1.4 — Build match verified_facts.json**
Write to `agents/research_scout/output/match-nepal-vs-$ARGUMENTS-facts.json`:

```json
{
  "match_id": "nepal-vs-$ARGUMENTS",
  "run_date": "[ISO date]",
  "opponent": "$ARGUMENTS",
  "facts": [
    {
      "category": "ranking | head_to_head | danger_player | nepals_weapon | context",
      "claim": "plain factual statement",
      "source_url": "URL or null",
      "source_label": "ICC | ESPNCricinfo | etc.",
      "unverified": false
    }
  ],
  "threat_level": "LOW | ELEVATED | HIGH | CRITICAL",
  "threat_rationale": "one sentence explaining the threat level",
  "danger_player": { "name": "", "role": "", "key_stat": "", "source_url": "" },
  "nepals_weapon": { "player_id": "", "rationale": "" },
  "flagged_gaps": []
}
```

**Threat Level Scale:**
- LOW: Nepal leads head-to-head, opponent ranked 15+
- ELEVATED: Even head-to-head, opponent ranked 10–15
- HIGH: Opponent leads H2H, ranked 7–10
- CRITICAL: Top-10 opponent, Nepal has lost last 3+ encounters

---

## PHASE 2 — LORE DRAFTER (Match Preview Mode)

**Read soul.md in full before writing.**

Draft a match preview (400–600 words) in cinematic literary Nepali. Structure:

**Section 1 — The Setup (150 words)**
Drop the reader into the stakes of this match. Not "Nepal will face X on [date]." A scene. What is at stake for Nepal's journey — tournament position, qualification, pride.

Apply The Delayed Reveal Rule. Withhold which match this is until the end of the opening paragraph.

**Section 2 — The Opponent (100 words)**
Who is coming. Their ranking, their weapons, their danger player. Written as scouting intelligence — cold, precise, slightly menacing. One Isolated gut-punch line for the danger stat.

**Section 3 — Nepal's Weapon (100 words)**
The counter. Which player, which tactic. Written with belief — not blind optimism but earned confidence. Grounded in specific recent evidence from verified_facts.json.

**Section 4 — The Threat Meter Context (100 words)**
Translate the threat level (LOW/ELEVATED/HIGH/CRITICAL) into emotional terms. What this match means for the 12th Rhino. End with one "तपाईं" sentence.

**Section 5 — The Closing Line**
One sentence. Contains "तपाईं". Leaves something unresolved.

**Mandatory rules:** All rules from `/draft` apply equally here.

---

## PHASE 3 — QA GATE (Match Preview Mode)

Apply all 10 checklist questions. For match previews, Question 4 (Zeigarnik loop) applies to the stakes narrative — is there a tension opened in Section 1 that is not resolved until the final line?

Append to DRAFTS.md with header:

```markdown
---
draft_id: match-nepal-vs-$ARGUMENTS-[YYYY-MM-DD]
type: match_preview
status: [APPROVED | REVISION_REQUIRED | REDRAFT]
run_date: [ISO date]
source_file: agents/research_scout/output/match-nepal-vs-$ARGUMENTS-facts.json
---
```

---

## PHASE 4 — RUN LOG

Append to `agents/run_log.json`:

```json
{
  "run_id": "[timestamp]-match-$ARGUMENTS",
  "trigger": "/match $ARGUMENTS",
  "date": "[ISO date]",
  "phases": ["research_scout", "lore_drafter", "qa_gate"],
  "output_files": [
    "agents/research_scout/output/match-nepal-vs-$ARGUMENTS-facts.json",
    "DRAFTS.md"
  ],
  "qa_result": "[status]",
  "threat_level": "[level]"
}
```

---

## FINAL OUTPUT TO USER

Report: threat level, danger player, Nepal's weapon, QA result, word count.
