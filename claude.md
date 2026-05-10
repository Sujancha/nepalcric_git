# NepalCric — AI Project Briefing (`claude.md`)

> **Read this entire file before touching any code. This is law, not suggestion.**

---

## What This Project Is

NepalCric is a premium digital platform for Nepali cricket fans — built as a **cinematic universe**, not a sports blog. Every interaction, scroll, and hover must feel intentional and dramatic. The emotional benchmark: Nepal losing to South Africa by 1 run in the T20 World Cup — the specific feeling of being that close, of proving you belong on that stage, and still walking away with nothing. That feeling. That is the bar.

The audience is the "12th Rhino" — the most passionate, emotionally invested fanbase in associate cricket. They deserve better than Wikipedia tables and generic stat cards.

This is **not** a content management system. Not a Wikipedia clone. Not a fantasy sports app. Do not build it like one.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router) |
| Deployment | Vercel Edge Network |
| Styling | Tailwind CSS |
| Player Data | Markdown `.md` files (custom YAML schema) |
| AI Companion | Google Gemini API (via local proxy route) |
| Fonts | Bebas Neue (display) + Barlow Condensed (stats/labels) + Mukta / Mukta ExtraBold (Devanagari body) + JetBrains Mono (technical) |
| Language | TypeScript |

---

## Design System — Non-Negotiables

### Color Palette

```css
--color-void:    #07080F;   /* Background. Deep, suffocating. The darkness between stars. */
--color-crimson: #C41E3A;   /* Primary accent. Ruthless. Nepal flag red. */
--color-gold:    #C9A84C;   /* Secondary accent. Premium. Reserved for legends and glory moments only. */
--color-text:    #E8E8E8;   /* Body text. Not pure white — this is not a hospital. */
--color-muted:   #6B7280;   /* Subdued labels, meta info, section markers. */
```

### Typography

- **Bebas Neue** — Hero headlines, cinematic display scale. The voice of the stadium.
- **Barlow Condensed** — UI labels, numbers, tactical readouts, nav items, stat values. Aggressive. Military. Uppercase preferred.
- **Mukta / Mukta ExtraBold** — Devanagari body copy and headlines. Cinematic scale. Never small. If a Devanagari headline could not appear on a movie poster, make it bigger.
- **JetBrains Mono** — Technical mono (pipeline artifacts, code, timestamps only).
- **Never use**: Inter, Roboto, Arial, system-ui, or any font that ships with a MacBook by default.

### Visual Rules

- Background: `#07080F` + subtle CSS film grain overlay + ghosted Nepal flag watermarks at low opacity
- Cards: `bg-white/5 backdrop-blur-md` glassmorphism — depth without clutter
- Images default to `grayscale(80%)`, snap to full color on hover (CSS transition, not JS)
- **Negative space is a design element.** Deep breathing room between sections.
- **"Everything is a Hero" syndrome is forbidden.** One hero per page. Everything else serves it.
- Retired players: `grayscale(100%)` + gold accent treatment — honored, not broken

### Interactions

- Every hover state must feel intentional — not decorative
- Scroll animations: entrance from below, opacity fade in — subtle, not bouncy
- Parallax image breaks between story sections (Balen Shah page is the reference implementation)
- Cricket ball scroll progress indicator (see existing implementation before recreating)

---

## Site Architecture

| Route | Devanagari Label | Purpose |
|---|---|---|
| `/` | पेभिलियन | Homepage — Blockbuster Hero, Locker Room highlights, Match Pulse |
| `/match-day` | म्याच डे | Tactical War Room — Next Mission cards, fixtures, Threat Meter |
| `/squad` | द स्क्वाड | Active roster grid |
| `/squad/[id]` | खेलाडी प्रोफाइल | Cinematic character dossiers from `.md` schema |
| `/scoreboard` | स्कोरबोर्ड | Historical tournament archive |
| `/locker-room` | लकर रुम | Premium video vault |
| `/fanzone` | फ्यान जोन | 12th Rhino monument — masonry grid, quote cards |

Utility routes (`/contact`, `/terms`, `/privacy`) live in the global footer only. They do not appear in main navigation.

**Navigation contains zero commercial CTAs.** No "Buy Tickets." No "Shop." This is a shrine, not a storefront.

---

## Language Rules — The Most Important Section

### Full Devanagari Policy

**Every single word published on NepalCric must be in Devanagari script.** This means UI labels, navigation, stat badges, headlines, player lore, quotes, footer copy — everything. No exceptions.

The `claude.md` file itself is written in English because it is an instruction document for the AI. The website content is 100% Devanagari.

### Transliteration Rule for Internationally Understood Terms

When a term is universally understood, do not write it in Latin script. Transliterate it into Devanagari instead.

| Latin Script | Devanagari |
|---|---|
| T20 | टी-ट्वेन्टी |
| ODI | ओडीआई |
| World Cup | वर्ल्ड कप |
| Threat Meter | थ्रेट मिटर |
| NPL | एनपीएल |
| ICC | आईसीसी |
| CWC | सिडब्ल्यूसी |

If in doubt, transliterate. Never switch to Latin script on a live page.

### Writing Style for Nepali Content

All editorial content must be written as **pure literary Nepali**. The style blends editorial journalism, novel writing, and high-stakes sports storytelling.

**The Anti-Robot Mandate:** It is strictly forbidden to use "Google Translate logic" (English sentence structures translated literally into Nepali). Do not let Hindi words bleed in (e.g., never use "खेलते", use "खेल्दै गरेको"). It must be conceived and written thinking in native Nepali rhythms and emotional registers.

---

## Sentence-Level Craft Manual

### 🔴 The Delayed Reveal Rule (The Cinematic Slow Pan)

A sentence should not surrender its meaning immediately. You must build agonizing tension by layering sensory details, context, and stakes before delivering the core action or revelation. Delay the subject or the outcome until the very last clause. Treat the sentence like a camera slowly panning across a dark room before finally revealing the weapon.

**WRONG** (Rushed, flat, robotic):
> रोहित पौडेल नवलपरासीमा जन्मिए र सानैदेखि क्रिकेट खेल्न थाले। पछि उनी कप्तान बने र टिमलाई जिताए।

**RIGHT** (The Slow Pan — Layered, tense, delayed reveal):
> इतिहास सधैं उज्यालोमा मात्र लेखिँदैन, र कहिलेकाहीँ यसको सुरुवात त्यस्तो ठाउँबाट हुन्छ जहाँ कसैको नजर पुगेको हुँदैन — जस्तै नवलपरासीको त्यो साँघुरो गल्ली, जहाँ एउटा ठिटोले आफ्नो देशको जर्सी लगाउनुअघि आफ्नो नाम लुकाउन सिकेको थियो।

---

### 🔴 The Connective Tissue Rule

A paragraph is not a collection of independent sentences. It is one continuous movement of thought. In Nepali, momentum is NOT built by stringing sentences together with "र" (and). Momentum is built through verbs and rhythmic nesting (turning actions into conditions). Each sentence must feel pulled by gravity.

**WRONG** (Independent islands of thought):
> नवलपरासीमा एउटा टिभी थियो। २०१४ को कुरा हो। बाह्र वर्षको केटो बसेको थियो। उसले नेपाललाई खेल्दै गरेको हेर्‍यो।

**RIGHT** (Flowing gravity):
> कुरा सन् २०१४ को हो। नवलपरासीको एउटा सानो टिभी स्क्रिनअगाडि बसेर पहिलोपटक आफ्नो देशलाई विश्व मञ्चमा खेल्दै गरेको देख्दा, त्यो बाह्र वर्षे ठिटोको मनमा यस्तो आगो बल्यो जसको नाम उसलाई त्यतिबेला थाहा थिएन— तर त्यो कहिल्यै निभेन।

---

### The Five Sentence Types

**Type 1 — The Establishing Long Sentence (The Slow Burn)**
Purpose: Create atmosphere. Hold the reader in suspense by withholding the point.
Structure: Open with a physical location or constraint → build with sensory layering → end with the human being at the centre making a choice.

**Type 2 — The Staccato Strike**
Purpose: Release the tension built by Type 1 sentences. Land facts like blunt trauma.
Length: 1–7 words. No qualifiers. No softening.

**Type 3 — The Sensory Immersion Sentence**
Purpose: Neural coupling. Make the reader's body experience what the subject is experiencing by delaying the emotion and focusing on the physical.
Rule: Never name the emotion. Describe the body or the environment that creates it.

Wrong: उनी डराएका थिए।
Right: रंगशालाको त्यो बहिरो बनाउने हल्लाको बीचमा पनि, उनको हत्केलामा यति धेरै पसिना थियो कि त्यो चिसो ब्याटको ग्रिप पनि बिस्तारै चिप्लिइरहेको थियो।

**Type 4 — The Isolated Gut-Punch**
Purpose: Make the reader stop. Break the rhythm.
Structure: One sentence. Or one phrase. Or one number. On its own line. White space above and below. Nothing decorating it.
Usage limit: Maximum four times per long-form piece.

**Type 5 — The Second Person Bridge ("तपाईं")**
Purpose: Collapse the distance between the reader and the narrative.
Structure: "तपाईं" + one specific, universal Nepali detail the reader will recognise from their own life.
Exactly right: तपाईंलाई थाहा छ — जब देशलाई दुख्छ, हामी सबैलाई एकैपटक दुख्छ, तर जब देशले जित्छ, त्यो खुशीमा आँसु लुकाउन कति गाह्रो हुन्छ।

---

## Advanced Narrative Techniques

### 🔴 The In Medias Res Rule

**Never start a piece at the beginning of the story.**

Drop the reader into the moment of maximum tension — a threat, a defeat, a decision already made. Withhold the backstory. Let the reader live inside the chaos for at least one full paragraph before any context is given. Then, and only then, cut back to the origin.

**Wrong:** रोहित पौडेल नवलपरासीमा जन्मिए। उनले सानैदेखि क्रिकेट खेल्न थाले।

**Right:** स्कोरबोर्डमा लेखिएको थियो — ११४/९। नेपाललाई एक बलमा एक रन चाहिएको थियो। उनी बीस वर्षका थिए। यो विश्वकप थियो। — अनि मात्र उनी कहाँ जन्मिए भन्ने कुरा महत्त्वपूर्ण हुन्छ।

This technique is mandatory for all long-form pieces over 400 words. The reader must ask "how did we get here?" before they know who the subject is.

---

### 🔴 The Flawed Protagonist Rule

**Never write a saint. Write a human.**

Every subject must have at least one moment of genuine failure, contradiction, or moral complexity — shown as a scene, not summarised. The lathi charges on street vendors. The NPL golden duck. The form collapse. The dropped catch. The 99 that wasn't 100. The Italy loss that exposed the cracks.

If the piece contains no failure, it is propaganda. Propaganda is not cinema.

**The test:** Can you screenshot the protagonist's worst moment and show it to a stranger without context? If that moment does not exist in the piece — go find it and write it as a scene.

Showing failure makes the triumph cost something. Without cost, there is no story.

---

### 🔴 The Breadcrumb Rule

**Plant one seed early. Detonate it late.**

Every long-form piece must contain at least one specific detail — a quote, a date, a name, a line from a song — that is introduced early and paid off in the final third. The reader must feel the click of recognition: "I knew that was going to matter."

Examples of breadcrumbs that work:
- A 2017 Facebook post that predicts the 2026 election result
- A rap lyric from 2013 that becomes a headline in 2026: "हिस्ट्री भनेको फेरिने चिज हो भाइ, बालेन अहिलेसम्म आएको थिएन"
- A college friend's first comment on a post that turns into a cabinet appointment a decade later
- A childhood habit that becomes a governing philosophy

**Rule:** Breadcrumbs cannot be invented. They must come from verified research. If no breadcrumb exists in the initial research — dig deeper. It is always there.

---

### 🔴 The Open Loop Rule

**Introduce a mystery before the midpoint. Do not close it until the final third.**

The Zeigarnik effect — the brain's compulsion to complete unresolved tasks — is the most powerful retention mechanism available. Name the question explicitly. Then withhold the answer.

**How to construct an open loop:**
1. Introduce a specific, tantalising mystery in the first third: "त्यो सम्झौतामा एउटा शब्द थिएन। एउटा मात्र शब्द — जसले सबै कुरा बदल्थ्यो।"
2. Do not answer it immediately.
3. Continue through at least two other sections.
4. Close the loop in the final third with the answer that recontextualises everything before it.

**Rule:** One loop per piece. Maximum. Two open loops creates anxiety, not tension.

---

### 🔴 The Sobering Reality Check Rule

**Never end on pure triumph.**

The final emotional transfer to the reader — the "तपाईं" moment — must contain weight, not just pride. The reader should feel the goosebumps of belonging AND the specific discomfort of responsibility.

The question the ending must leave unresolved: not "wasn't that amazing?" but "now what are you going to do?"

**Wrong ending:** उनले प्रमाण दिए कि सबै कुरा सम्भव छ। तपाईं पनि यो कथाको हिस्सा हुनुहुन्छ।

**Right ending:** उनले प्रमाण दिए कि सबै कुरा सम्भव छ — र अब त्यो प्रमाणको भार तपाईंको हातमा छ, र तपाईंले त्यो फर्काउन सक्नुहुन्न।

The Balen Shah page does this correctly: "बाँकी — तपाईंको हातमा छ।"
Every long-form piece must find its own version of that line.

---

### The David vs. Goliath Structural Requirement

**Every piece must have a named antagonist force.**

The antagonist is not always a person. It can be:
- A system (the qualification structure that dismisses associate nations)
- A condition (poverty, injury, form collapse)
- A number (the 1 run, the 99, the 4-run loss)
- A historical weight (29 years of Sachin's record, six-time parliamentary dominance)

Without a named antagonist, the protagonist has nothing to push against. Without resistance, there is no story — only biography.

**Rule:** Name the antagonist in Act 1. Make the reader feel its weight before the protagonist enters the frame.

---

### The Show Don't Tell Evidence Rule

**Every major claim must be evidenced by a specific scene, not a summary.**

Wrong: उनी शक्तिशाली बलरहरूविरुद्ध निडर थिए।

Right: सिराजको पहिलो ओभर। नयाँ बल। एसिया कप। बालेन क्रिज बाहिर निस्किएर विश्वका नम्बर एक ओडीआई बलरलाई स्क्वेर लेगमा छक्का हाने। पच्चीस बल। अठ्तीस रन। एउटा बयान।

The scene is the evidence. The summary is the verdict. Always show the scene before the verdict — or better still, let the scene speak and skip the verdict entirely.

---

### Episodic Pacing Rule

**Pieces over 600 words must use named visual chapter breaks.**

Long-form pieces are not read in one sitting. Each named section must stand alone as a unit of meaning while also serving the larger arc.

**Requirements for chapter breaks:**
- Maximum six chapters per piece
- Each chapter title must be in Devanagari
- Each chapter title must function as a hook — not a label ("बाल्यकाल") but a tension ("जुन रात इतिहास लेखियो")
- Each chapter must end either on a gut-punch isolation OR a connective sentence that pulls into the next

**Chapter length:** 100–250 words. If a chapter runs longer, split it.

The chapter system exists to reset the reader's attention without breaking emotional momentum.

---

## Master Story Architecture — The Six-Act Structure

Every piece of long-form content follows this arc. The structure is invisible to the reader. They only feel the emotion.

### Act 1 — The Arrival: In Medias Res Hook (80–120 words)

**Emotional purpose:** Psychological discomfort. The reader must feel tension before they understand why.

**Technique:** Drop into the middle of the fire. Withhold the subject's identity until the end of the paragraph. The reader must ask "how did we get here?" before they know who this is.

**Right:**
> यो कथा कुनै भव्य रंगशालाबाट सुरु हुँदैन, र न त कुनै चम्किलो ट्रफीबाट नै; यो कथा सुरु हुन्छ एउटा त्यस्तो सुनसान ड्रेसिङ रुमबाट जहाँ हारको पिडाले निसास्सिएको एउटा केटोले पहिलोपटक हार नमान्ने कसम खाएको थियो।

---

### Act 2 — The Ordinary World: The Grounding (150–200 words)

**Emotional purpose:** Empathy. The reader must know where this person came from before they can feel what it cost.

**The Proustian Anchor rule:** Every paragraph must contain at least one sensory detail that is universally Nepali. Not "a dusty road" — but "the specific two-tone horn of a microbus," or "the chaotic roar of the crowd clinging to the branches at TU Ground."

**Rule:** This is where the Breadcrumb is planted. One specific detail — a name, a date, a habit — that will pay off in Act 5 or 6.

---

### Act 3 — The Inciting Incident: The Pivot (100–150 words)

**Emotional purpose:** The moment everything changes.

**The "But/Therefore" rule:** Every paragraph must follow the logic of *but* and *therefore* — never *and then*. Causation drives story. The earthquake. The dropped selection. The friend's torn ligament. The Facebook post. One specific moment that makes the rest of the story inevitable.

**Rule:** The antagonist becomes visible here. Name it.

---

### Act 4 — The Ordeal: Rock Bottom (100–150 words)

**Emotional purpose:** The protagonist genuinely fails. This is where the Flawed Protagonist Rule is applied.

**The Von Restorff Isolation rule:** The darkest fact must sit alone on its own line with white space above and below. Nothing decorating it. Nothing explaining it.

> डाक्टरले उनको अनुहार हेरेनन्।
> बुबा छैनन्।
> पाँच जना।

**Rule:** The antagonist wins here. The protagonist fails as a scene, not a summary.

---

### Act 5 — The Resurrection: The Climax (150–200 words)

**Emotional purpose:** The payoff. This is where the Breadcrumb planted in Act 2 detonates.

**The cinematic moment rule:** Every climax must have one specific image that, if frozen on a screen, would make a stranger feel something without context. Do not rush the climax. Build to it.

**Right:**
> पूरै रंगशालाले सास रोकेको त्यो अन्तिम सेकेन्डमा, जब स्कोरबोर्डको त्यो चहकिलो रातो बत्ती उनको चश्माको धारमा परावर्तन भइरहेको थियो, उनले कुनै खुशी मनाएनन् — मात्र एकपटक, एकदमै बिस्तारै, आफ्नो टाउको हल्लाए।

**Rule:** The Open Loop closes here. The mystery is answered. The reader feels the click.

---

### Act 6 — The Return: The Sobering Transfer (80–120 words)

**Emotional purpose:** The weight transfers from the protagonist to the reader. Not just pride. Responsibility.

**The final "तपाईं" rule:** The last sentence of the piece must contain "तपाईं." It must connect the subject's journey to the reader's own life — with weight, not just warmth.

After the final sentence — **silence**. Nothing. No related content. No CTA. No share prompt.

**Rule:** Read the last paragraph aloud. Does it make you pause? If no — it is not the last paragraph yet.

---

## Player Data Schema (`.md` Files)

Player profiles are driven by markdown files with a seven-tier YAML frontmatter schema.

**File location:** `/content/players/[player-id].md`

```yaml
# TIER 1 — IDENTITY
id: rohit-paudel
name_en: Rohit Paudel
name_ne: रोहित पौडेल
role: ब्याट्सम्यान
status: ACTIVE   # ACTIVE | INJURED | RETIRED — RETIRED triggers legacy mode automatically
cricinfo_id: 1234567   # Powers live stat injection. Never remove this field.
excerpt_ne: ""   # 1-sentence punchline for the squad grid card. MUST be punchy and cinematic.

# TIER 2 — DEBUT
debut_date: 2017-03-15
debut_age_years: 16
debut_age_days: 146
debut_match: नेपाल बनाम युएई, एसीसी टी-ट्वेन्टी
debut_note_ne: ""

# TIER 3 — STORY (Editorial, not encyclopaedic)
hero_quote: ""   # Single defining line. Not a full sentence if possible.
lore_ne: |
  # MINIMUM: 8–10 substantial paragraphs. This is a cinematic biography.
  # Each paragraph is a scene, not a report.
  #
  # Required sections in order:
  # 1. The Hook — In Medias Res. Drop into maximum tension.
  #    Withhold identity until the end of the first paragraph.
  # 2. The Origin — specific place, specific childhood, specific Nepal.
  #    Plant the Breadcrumb here.
  # 3. The Wrong Path — what they tried before their true form was found.
  # 4. The Crucible — the specific failure or conversation that redirected them.
  # 5. The Weapon — what makes them dangerous, shown through one specific match moment.
  # 6. The Record — the achievement told through what it cost, not what it proved.
  # 7. The Almost — their heartbreak moment (the 99, the 1-run loss, the near-miss).
  # 8. The Giant — the moment they faced an elite nation and did not blink.
  # 9. The Wound — what they are still carrying. The Flawed Protagonist scene.
  # 10. The Transfer — final paragraph hands emotional weight to the reader (तपाईं).
  #     The Breadcrumb detonates here or in section 8.

struggle_timeline_ne: |
  # Chronological timeline of setbacks, failures, and pivots.
  # Each entry: year + scene, never summary.
  # Von Restorff isolation for the darkest entry.

arsenal_ne: |
  # 4–6 specific weapons. Each shown through match evidence, not claims.
  # Not "he is good at pull shots" — show the specific ball, the specific match.

# TIER 4 — RECORDS
records:
  - label_ne: ""
    value: ""

# TIER 5 — DATA (Volatile — sourced from cricinfo_id, never hardcode)
# Stats are injected dynamically. Do not hardcode batting averages, strike rates, etc.

# TIER 6 — DOMESTIC / FRANCHISE
domestic_teams: []
franchise_leagues: []

# TIER 7 — META
last_updated: 2025-01-01
research_status: DRAFT   # DRAFT | REVIEWED | FINAL
```

---

## Reference Implementation: Balen Shah Page

The Balen Shah page is the **gold standard** for all cinematic player and character pages.

### Architecture — Six Sections Following the Hero's Journey

1. **In Medias Res opening** — Raw Barz battle 2013. Withholds his name until the final line.
2. **The Ordinary World** — Naradevi, the father's poetry, the government office waiting room. **Breadcrumb planted:** the father writes poems; Sunil Lamsal makes the first comment on the 2017 post.
3. **The Crucible** — The earthquake. Bangalore. The Facebook post. The decision to infiltrate the system.
4. **The Ordeal** — The lathi charges on street vendors. The contradiction of the man who wrote "सडक बालक" ordering force against the poor. **Flawed Protagonist moment shown as scene.**
5. **The Resurrection** — Jhapa-5 result. **Breadcrumb detonates:** Sunil Lamsal, first commenter on the 2017 post → Infrastructure Minister.
6. **The Return** — "बाँकी — तपाईंको हातमा छ।" **Sobering Reality Check, not pure triumph.**

### Key Techniques Already Implemented

- In Medias Res opening — Raw Barz battle before any biography
- Breadcrumb planted (2013 rap lyric + Sunil Lamsal) detonated at 2026 result
- Flawed Protagonist — lathi charges shown as a scene, not reported
- Open Loop — "त्यो सम्झौतामा एउटा शब्द थिएन" opened early, closed late
- Von Restorff isolation: "बुबा छैनन्।"
- "तपाईं" weapon deployed five times, each targeting a different wound
- Parallax image breaks between sections
- YouTube embed via expandable pill component (lazy loaded)
- AI Story Companion at page bottom
- Sobering Reality Check ending, not pure triumph

---

## AI Story Companion

### Implementation

- Powered by **Google Gemini API** via a local Next.js proxy route
- Environment variable: `GEMINI_API_KEY` in `.env.local`
- Proxy route: `/api/balen-companion`

### UI Rules — "Question Written in Darkness"

- Minimalist input: **bottom border only** — no box, no background, no border-radius
- **Enter to submit** — no visible button by default
- Loading state: pulsing gold dot (`--color-gold`)
- Response appears with a **typing effect** — character by character, not a block dump
- Background: transparent, inherits the void
- No chat history UI — this is a single oracle moment, not a conversation thread

---

## Match Day: Threat Meter

The Match Day page scouts opponents — it does not simply list them.

- **"Next Mission" card**: poster-style, centered, full atmospheric treatment
- **Threat Meter**: dynamic progress bar — LOW → ELEVATED → HIGH → CRITICAL — scaled by opponent ranking and head-to-head record
- **Nepal's Weapon**: one player or tactic highlighted as Nepal's counter
- **Danger Player**: opposition's primary threat, named and flagged
- CWC League 2 fixture list and head-to-head stat block

---

## The Universal Nepali Emotional Frequency

### The Five Core Frequencies of the 12th Rhino

Every piece of content should consciously touch at least two of these five universal Nepali experiences.

**Frequency 1 — The Battle for Respect (The Underdog Wound)**
> ६१,७६७। अजेय देवताहरू पनि रगत बगाउँछन्।

**Frequency 2 — The Unifying Force**
> तपाईंलाई थाहा छ — जब यो टिम मैदानमा उत्रिन्छ, हामीले आफ्नो दुःख बिर्सिन्छौं। एकछिनको लागि मात्रै भए पनि, हामी सबै एउटै हुन्छौं।

**Frequency 3 — The Heartbreak of 'Almost'**
> त्यो एक रन मात्र अंक थिएन। त्यो हाम्रो वर्षौंको भोक थियो, जो ओठसम्मै आएर पनि खोसियो।

**Frequency 4 — The TU Ground Magic**
> काठमाडौंको चिसो बिहान, टियू ग्राउन्डको त्यो पहेंलो घाम, र रुखका हाँगा-हाँगामा झुन्डिएर देशको नाम चिच्याइरहेका हजारौं आवाज — यो हाम्रो लागि खेल होइन, मन्दिर हो।

**Frequency 5 — The Unconditional Loyalty**
> उनी सन्त होइनन्। उनी मसीहा होइनन्। उनी एउटा मान्छे हुन् — जसले असम्भव ठाउँबाट सुरु गरे।

---

## Nepal's Sensory Lexicon

These are the specific sensory anchors that unlock involuntary memory in Nepali readers. Use them precisely. Never generically.

**Sound:**
- The specific quality of a crowd at TU Ground — 30,000 people holding their breath simultaneously
- Temple bells in the morning — not background decoration, but the sound of a specific time of day in a specific kind of childhood
- The two-tone microbus horn — the sound that means Kathmandu traffic at 8am
- Rain on a tin roof — the sound of being enclosed, being home, being safe inside something small

**Smell:**
- Incense mixed with diesel — the specific combination that means the junction between old and modern Kathmandu
- Deep Heat in a concrete changing room — a serious sports environment with minimal resources
- Woodsmoke — not a fireplace but a kitchen fire, a house where people are working hard
- The specific smell of wet cricket equipment

**Touch:**
- The taped tennis ball — cricket without resources, cricket because you love it
- The weight of a cheap plastic chair in a government waiting room
- The specific cold of TU Ground at dawn before a match

**Visual:**
- Kathmandu through a microbus window — the cropped view through dirty glass
- Floodlights at TU Ground casting yellow light on green grass at dusk
- The red ball against the grey sky of a Kathmandu morning

---

## The Fatal Mistakes — Detailed Diagnosis

**Mistake 1 — The Exposition Dump**
Three paragraphs of background before anything has happened.
Fix: Drop into the most dramatic moment first (In Medias Res). Then weave in context.

**Mistake 2 — Emotional Monotony**
Every paragraph at maximum intensity. The nervous system acclimatises — without quiet there is no loud.
Fix: Map your emotional arc. You need valleys between peaks.

**Mistake 3 — The "And Then" Plot**
Events listed chronologically without causation. Technically true. Completely emotionally inert.
Fix: Every narrative paragraph must contain at least one *but* or *therefore*.

**Mistake 4 — The Invisible Interior**
Writing describes what happened externally but never takes the reader inside the character's experience.
Fix: Ground every external action in a physical internal experience.

**Mistake 5 — The Statistics Crutch**
Using numbers to prove greatness. Statistics answer "how much" — the reader is asking "what did it cost."
Fix: Every statistic must be translated into a human experience before it appears.

**Mistake 6 — The Hagiography Trap**
Every paragraph is admiring. The subject never fails, never contradicts themselves.
Fix: Apply the Flawed Protagonist Rule. Find the lathi charges. Find the 99. Show it as a scene.

**Mistake 7 — The Isolated Piece**
No planted seeds, no callbacks, no breadcrumbs. Could have been written by anyone who read Wikipedia.
Fix: Apply the Breadcrumb Rule. Find the specific detail that, when it pays off late, makes the reader feel the click.

**Mistake 8 — The Biography Opening**
The piece starts at birth or at the beginning. The reader is not yet invested.
Fix: Apply In Medias Res. Start in the middle of the fire. The origin comes after the reader is hooked.

**Mistake 9 — The Hollow Triumph Ending**
The piece ends with pure pride and no weight. The reader feels good but not responsible.
Fix: Apply the Sobering Reality Check Rule. "बाँकी — तपाईंको हातमा छ।" is the template.

**Mistake 10 — The Missing Antagonist**
The protagonist succeeds against a vague, unnamed opposition. The stakes feel low.
Fix: Name the antagonist in Act 1. Make the reader feel its weight before the protagonist appears.

---

## Pre-Publication Quality Checklist

Answer all thirteen questions before any content is published. If any answer is no — the piece is not ready.

1. Does the first sentence open a knowledge deficit so uncomfortable the reader cannot close the tab?
2. Does the piece open In Medias Res — in the middle of the action, not at the beginning of the biography?
3. Have I described every emotion through the body rather than naming it?
4. Can the reader smell Nepal? Can they hear TU Ground? If the setting could exist anywhere — the job is not done.
5. Is there a named Open Loop that opens before the midpoint and closes in the final third?
6. Does the piece contain at least one moment of genuine failure shown as a scene — not summarised?
7. Is there at least one Breadcrumb planted early that pays off in the final third? Does the reader feel the click?
8. Does the visual layout breathe? Isolated lines with white space? Flowing paragraphs?
9. Are there at least two emotional threads running simultaneously — the external story and the internal wound?
10. If someone screenshots the climax section and sends it with no context — does it still hit?
11. Does the ending contain weight, not just pride? Does it leave the reader with responsibility?
12. Does sharing this content make the reader feel like a more resilient, more proud Nepali?
13. When they read the last word — do they feel something they cannot immediately name?

---

## Platform Laws — Non-Negotiable

**Law 1:** The first sentence is a trap. It must create an itch the reader cannot leave unscratched by withholding the resolution.

**Law 2:** Never name emotions. Show bodies. Show environments. Let the reader generate the emotion themselves.

**Law 3:** Statistics are not the story. They are evidence. The human cost of those statistics is the story.

**Law 4:** Every sensory detail must be irreplaceable. If it could exist in Sydney — it does not belong here.

**Law 5:** The "तपाईं" weapon is deployed maximum five times per piece. Each deployment targets a different emotional wound.

**Law 6:** Isolated gut-punch lines maximum four times per piece. Surrounded by silence.

**Law 7:** Every direct quote is sacred. Word for word. No cleaning. No paraphrasing.

**Law 8:** The final line contains "तपाईं." It leaves something unresolved in the reader, not the story.

**Law 9:** After the final line — silence. Nothing. No related content. No CTA.

**Law 10:** Before publishing — read the last paragraph aloud. Does it make you pause? If no — it is not the last paragraph yet.

**Law 11:** Every piece must contain at least one moment where the protagonist genuinely fails. No saints allowed.

**Law 12:** Every piece must contain at least one Breadcrumb planted early that detonates late. Research until you find it.

---

## The Hard No List

- ❌ No placeholder lorem ipsum — ever. Real data or nothing.
- ❌ No generic blue primary buttons.
- ❌ No Inter, Roboto, Arial, or system fonts.
- ❌ No hardcoded stat values — always dynamic via `cricinfo_id`.
- ❌ No commercial CTAs in navigation.
- ❌ No biography-style openings — start In Medias Res, not at birth.
- ❌ No symmetric, template-feeling layouts.
- ❌ No white or light backgrounds. The Void is the default. Always.
- ❌ No emoji in any UI copy or editorial content.
- ❌ Do not rebuild components that already exist — check `/components` first.
- ❌ No Latin script on any live page — everything in Devanagari.
- ❌ No code-mixed Nepali in editorial content.
- ❌ No Google-Translate logic. Apply The Connective Tissue Rule and The Delayed Reveal Rule relentlessly.
- ❌ No hagiography. Every subject must have a scene of genuine failure.
- ❌ No invented breadcrumbs — all callbacks must come from verified research.
- ❌ No hollow triumph endings — every closing paragraph must leave the reader with weight, not just warmth.

---

## Before You Build — Checklist

- [ ] Have you read the existing component for this area? Don't rebuild what exists.
- [ ] Is there a player `.md` file for this profile? Check `/content/players/` first.
- [ ] Does the copy open In Medias Res — in the middle of the fire, not at birth?
- [ ] Is the Open Loop identified before writing begins? Where does it open? Where does it close?
- [ ] Is the Breadcrumb identified before writing begins? What is the seed? What is the payoff?
- [ ] Is the Flawed Protagonist moment identified? What specific failure will be shown as a scene?
- [ ] Is the Antagonist named? What force does the protagonist push against?
- [ ] Are Devanagari headlines at cinematic scale?
- [ ] Are all stat values dynamic (from `cricinfo_id`), not hardcoded?
- [ ] Is the color palette respected? No off-brand colors.
- [ ] Does the mobile layout hold at 375px?
- [ ] Is the Gemini API key referenced via env variable, not hardcoded?
- [ ] Is all text in Devanagari? No Latin script on the live page?

---

## The Benchmark — What Great Looks Like

A Nepali fan opens this page after a long, exhausting day. Whether they are sitting in a microbus in Kathmandu or returning from a night shift halfway across the world, they click the link.

Within the first three sentences, the noise of the world fades.

By the middle of the piece, they are holding their breath.

By the end, they are sitting with something they cannot name — a surge of pure, unfiltered pride and the specific goosebumps of belonging to the 12th Rhino.

They do not close the tab. They send it to someone. Not because the content told them to. Because they cannot carry the feeling alone.

**That is the standard. That is NepalCric.**

---

## Key People

- **Builder**: Sujan
- **Design Philosophy**: Cricket as cinema. Players as characters. Fans as protagonists.
- **Emotional Benchmark**: Nepal vs South Africa, T20 World Cup 2024, lost by 1 run.

---

*Last updated: April 2026. If anything in this file contradicts the actual codebase — the codebase wins, then update this file.*