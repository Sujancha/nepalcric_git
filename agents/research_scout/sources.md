# Research Scout — Approved Sources

## Tier 1 — Primary (always prefer)
| Source | Use For | URL Pattern |
|--------|----------|-------------|
| ESPNCricinfo | All match stats, career averages, debut dates | `cricinfo.com/player/{cricinfo_id}` |
| ICC | Rankings, tournament results, official records | `icc-cricket.com` |
| CricketArchive | Historical match scorecards | `cricketarchive.com` |
| Nepal Cricket Association (NCA) | Official squad announcements, domestic records | `ncacricket.org` |

## Tier 2 — Secondary (use with citation)
| Source | Use For | Trust Level |
|--------|----------|-------------|
| The Kathmandu Post | Player interviews, human interest | High — national daily |
| Annapurna Post / नेपाल समाचारपत्र | Nepali-language coverage | High |
| Onlinekhabar | Breaking cricket news | Medium — verify against Tier 1 |
| ESPN Feature articles | Long-form profiles | High for quotes, low for stats |
| YouTube (official NCA channel) | Match footage, press conferences | Quotes only — not stats |

## Tier 3 — Cross-reference only (never sole source)
| Source | Reason |
|--------|---------|
| Wikipedia | May be outdated or uncited |
| Social media (Twitter/X, Facebook) | Unverified, can be fabricated |
| Fan sites / blogs | No editorial oversight |

## Forbidden Sources
- ❌ Any source that requires a paywall you cannot access (do not guess behind it)
- ❌ Any source with an AI-generated watermark or disclaimer
- ❌ Wikipedia as a sole source for statistics

## Player Cricinfo ID Reference
All player `cricinfo_id` values are stored in `/content/players/[player-id].md` under the YAML frontmatter field `cricinfo_id`. Always check this file before constructing a Cricinfo URL.

## Data Freshness Rule
- Statistics: Fetch fresh on every `/update-stats` trigger
- Career facts (debut, birthplace, family): Verify once, mark `source_label: "verified [date]"`
- Match results: Always fresh — never use cached match data older than 24 hours
