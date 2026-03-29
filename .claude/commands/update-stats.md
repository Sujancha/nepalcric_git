# /update-stats — Research Scout (Stats Refresh Only)

Refresh career statistics for player `$ARGUMENTS` from ESPNCricinfo. Does NOT trigger Lore Drafter or QA Gate.

---

## PHASE 1 — RESEARCH SCOUT (Stats Mode)

**Step 1.1 — Read player file**
Read `content/players/$ARGUMENTS.md`.
Extract `cricinfo_id`. If `cricinfo_id` is missing or 0, stop and report the gap to Sujan — do not proceed.

**Step 1.2 — Fetch live stats from ESPNCricinfo**
WebFetch: `https://www.espncricinfo.com/cricketers/[player-name]-[cricinfo_id]`

Extract all available stat categories:
- T20I: matches, innings, runs, not outs, highest score, average, strike rate, 50s, 100s
- ODI: same fields
- First-class / List A (if available)
- Bowling: matches, wickets, average, economy, best figures, 5-wicket hauls

**Step 1.3 — Write stats to verified_facts.json**
Write to `agents/research_scout/output/$ARGUMENTS-stats.json`:

```json
{
  "player_id": "$ARGUMENTS",
  "run_date": "[ISO date]",
  "cricinfo_id": "[value from .md file]",
  "stats": {
    "t20i": {
      "matches": null,
      "innings": null,
      "runs": null,
      "not_outs": null,
      "highest_score": null,
      "average": null,
      "strike_rate": null,
      "fifties": null,
      "hundreds": null,
      "source_url": "https://www.espncricinfo.com/..."
    },
    "odi": {
      "matches": null,
      "innings": null,
      "runs": null,
      "not_outs": null,
      "highest_score": null,
      "average": null,
      "strike_rate": null,
      "fifties": null,
      "hundreds": null,
      "source_url": null
    },
    "bowling_t20i": {
      "wickets": null,
      "average": null,
      "economy": null,
      "best_figures": null,
      "source_url": null
    }
  },
  "notable_records": [
    {
      "claim": "specific record or milestone",
      "source_url": null,
      "unverified": false
    }
  ],
  "fetch_status": "complete | partial | failed",
  "fetch_notes": ""
}
```

If a stat category is not available (e.g., player has no ODI appearances), set all fields to `null` and note in `fetch_notes`.

**Step 1.4 — Compare with existing .md file**
Read the existing `records` array in `content/players/$ARGUMENTS.md`.
Flag any records that are now outdated based on fresh ESPNCricinfo data.

**Step 1.5 — Update run log**
Append to `agents/run_log.json`:

```json
{
  "run_id": "[timestamp]-update-stats-$ARGUMENTS",
  "trigger": "/update-stats $ARGUMENTS",
  "date": "[ISO date]",
  "phases": ["research_scout"],
  "output_files": ["agents/research_scout/output/$ARGUMENTS-stats.json"],
  "fetch_status": "[complete | partial | failed]"
}
```

---

## FINAL OUTPUT TO USER

Report:
1. Stats successfully fetched (which formats: T20I / ODI / both)
2. Any records in the .md file that are now outdated — list specifically
3. Suggest which `records` array entries in the .md file should be updated and to what values
4. Do NOT automatically write to the .md file — present the changes for Sujan to approve

**Hard constraint:** Never write updated stats directly to `content/players/$ARGUMENTS.md` without explicit user confirmation.
