# content/stories/

Story and editorial article files. These will replace storiesData.ts as the source of truth for all long-form content.

## File naming
[story-slug].md — must match the slug used in /story/[slug] routes

## Expected frontmatter schema
```yaml
slug: ""
title_ne: ""          # Devanagari headline — cinematic scale
subtitle_ne: ""       # Devanagari subheading
author: ""
published_date: ""    # YYYY-MM-DD
category: ""          # match-report | profile | history | opinion
featured: false       # true = appears on homepage LeadStory / StoriesGrid
hero_image: ""        # /images/stories/[slug]/hero.webp
excerpt_ne: ""        # 1–2 sentence pull quote for grid cards — Devanagari
tags: []
```

## Rules
- All content must be in Devanagari (body markdown + all frontmatter text fields)
- No English editorial copy on live pages — transliterate if needed
- Apply the Six-Act Structure and all sentence-level rules from CLAUDE.md
- The Pre-Publication Quality Checklist (10 questions) must pass before research_status → FINAL
