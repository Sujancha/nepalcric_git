# content/players/

Canonical player profile files. Each file follows the 7-tier YAML frontmatter schema defined in CLAUDE.md.

## Schema tiers
- TIER 1 — IDENTITY (id, name_en, name_ne, role, status, cricinfo_id, excerpt_ne)
- TIER 2 — DEBUT (debut_date, debut_age_years, debut_age_days, debut_match, debut_note_ne)
- TIER 3 — STORY (hero_quote, lore_ne)
- TIER 4 — RECORDS (records[])
- TIER 5 — DATA (stats injected dynamically via cricinfo_id — never hardcode here)
- TIER 6 — DOMESTIC / FRANCHISE (domestic_teams[], franchise_leagues[])
- TIER 7 — META (last_updated, research_status: DRAFT | REVIEWED | FINAL)

## File naming
[player-id].md — must match the id field in frontmatter and the id in playerData.json

## Rules
- All content fields (lore_ne, excerpt_ne, hero_quote, records) must be in Devanagari
- No hardcoded stats — stats come from cricinfo_id at runtime
- research_status must be FINAL before a profile goes live
- The build script at scripts/generatePlayerIndex.js reads from this directory
