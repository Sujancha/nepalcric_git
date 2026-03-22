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
| Fonts | Barlow Condensed + Mukta / Mukta ExtraBold (Google Fonts) |
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

- **Barlow Condensed** — UI labels, numbers, tactical readouts, nav items, stat values. Aggressive. Military. Uppercase preferred.
- **Mukta / Mukta ExtraBold** — Devanagari headlines. Cinematic scale. Never small. If a Devanagari headline could not appear on a movie poster, make it bigger.
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
lore_ne: ""      # 2–4 paragraph origin story. Drop the reader into a scene. Apply The Delayed Reveal Rule.

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

The Balen Shah page is the **gold standard** for all cinematic player and character pages. When building any new profile page, benchmark against this.

### Architecture — Six Sections Following the Hero's Journey

1. Cinematic opening — drop the reader into a scene (apply The Delayed Reveal Rule)
2. The Crucible — conflict and pressure
3. The Weapon — what makes them different
4. The Proof — records, moments, data
5. The Reckoning — cost and consequence
6. The Legend — legacy statement

### Key Techniques Already Implemented

- Anti-skimming formatting: gut-punch isolated lines with generous white space above and below
- Zeigarnik loop discipline: major reveals withheld from early sections to sustain narrative tension
- "तपाईं" weapon moments: single, precise sentences addressed directly to the reader
- Parallax image breaks between sections
- YouTube embed via expandable pill component (lazy loaded)
- AI Story Companion at page bottom

---

## AI Story Companion

### Implementation

- Powered by **Google Gemini API** via a local Next.js proxy route
- Environment variable: `GEMINI_API_KEY` in `.env.local`
- Proxy route: `/api/gemini`

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

## Master Story Architecture — The Six-Act Structure

Every piece of long-form content on NepalCric follows this structure. Not as a rigid formula — as a skeleton you build flesh onto. The structure is invisible to the reader. They only feel the emotion.

### Act 1: The Arrival — The Aversive Hook

**Emotional purpose:** Psychological discomfort. The reader must feel tension before they understand why.

**Technique:** Drop the reader into a moment of high tension, withhold the subject's identity until the end of the paragraph.

**Right:**
> यो कथा कुनै भव्य रंगशालाबाट सुरु हुँदैन, र न त कुनै चम्किलो ट्रफीबाट नै; यो कथा सुरु हुन्छ एउटा त्यस्तो सुनसान ड्रेसिङ रुमबाट जहाँ हारको पिडाले निसास्सिएको एउटा केटोले पहिलोपटक हार नमान्ने कसम खाएको थियो।

---

### Act 2: The Ordinary World — The Empathy Baseline

**The Proustian Anchor rule:** Every paragraph must contain at least one sensory detail that is universally Nepali. Not "a dusty road" — but "the specific two-tone horn of a microbus," or "the chaotic, beautiful roar of the crowd clinging to the branches at TU Ground."

---

### Act 3: The Inciting Incident and Try/Fail Cycles

**The "But/Therefore" rule:** Every paragraph must follow the logic of *but* and *therefore* — never *and then*. Causation drives story.

---

### Act 4: The Ordeal — Rock Bottom

**The Von Restorff Isolation rule:** The darkest fact must sit alone on its own line with white space above and below. Nothing decorating it. Nothing explaining it.

> डाक्टरले उनको अनुहार हेरेनन्।
> बुबा छैनन्।
> पाँच जना।

---

### Act 5: The Resurrection — The Climax

**The cinematic moment rule:** Every climax must have one specific image that, if frozen on a screen, would make a stranger feel something without context. Do not rush the climax. Build to it.

**Right:**
> पूरै रंगशालाले सास रोकेको त्यो अन्तिम सेकेन्डमा, जब स्कोरबोर्डको त्यो चहकिलो रातो बत्ती उनको चश्माको धारमा परावर्तन भइरहेको थियो, उनले कुनै खुशी मनाएनन् — मात्र एकपटक, एकदमै बिस्तारै, आफ्नो टाउको हल्लाए।

---

### Act 6: The Return — The Identity Loop

**The final "तपाईं" rule:** The last sentence of the page must contain "तपाईं." It must connect the subject's journey to the reader's own life.

---

## The Universal Nepali Emotional Frequency

### The Five Core Frequencies of the 12th Rhino

Every piece of content should consciously touch at least two of these five universal Nepali experiences. This is what connects a fan in Kirtipur to a fan in Sydney.

**Frequency 1 — The Battle for Respect (The Underdog Wound)**
The experience of being dismissed by the cricketing elite. Playing with taped tennis balls and broken bats, yet standing face-to-face with giants and refusing to blink.
> ६१,७६७। अजेय देवताहरू पनि रगत बगाउँछन्।

**Frequency 2 — The Unifying Force**
The reality that cricket is the only thing that brings a fractured nation together. When the team plays, the politics stop, the struggles fade, and the whole country holds its breath as one.
> तपाईंलाई थाहा छ — जब यो टिम मैदानमा उत्रिन्छ, हामीले आफ्नो दुःख बिर्सिन्छौं। एकछिनको लागि मात्रै भए पनि, हामी सबै एउटै हुन्छौं।

**Frequency 3 — The Heartbreak of 'Almost'**
The tragic beauty of the 1-run loss to South Africa. The heavy, suffocating feeling of fighting perfectly and still falling agonizingly short.
> त्यो एक रन मात्र अंक थिएन। त्यो हाम्रो वर्षौंको भोक थियो, जो ओठसम्मै आएर पनि खोसियो।

**Frequency 4 — The TU Ground Magic**
The specific, chaotic, terrifyingly beautiful energy of Kirtipur. Trees filled with people, the roar of 30,000 fans acting as a literal 12th player on the field.
> काठमाडौंको चिसो बिहान, टियू ग्राउन्डको त्यो पहेंलो घाम, र रुखका हाँगा-हाँगामा झुन्डिएर देशको नाम चिच्याइरहेका हजारौं आवाज — यो हाम्रो लागि खेल होइन, मन्दिर हो।

**Frequency 5 — The Unconditional Loyalty**
Loving a team not because they are guaranteed to win, but because they are ours. Because their struggle mirrors the everyday struggle of being a Nepali.
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
Three paragraphs of background before anything has happened. Tournament history, career statistics — all before the reader has a reason to care.
Fix: Drop the reader into the most dramatic moment first. Then weave in context to explain why the moment matters.

**Mistake 2 — Emotional Monotony**
Every sentence trying to be devastating. Every paragraph at maximum intensity. The nervous system acclimatises — without quiet there is no loud.
Fix: Map your emotional arc before writing. You need valleys between peaks. After every moment of high intensity, give the reader one moment of stillness.

**Mistake 3 — The "And Then" Plot**
Events listed chronologically without causation. Each sentence is technically true and completely emotionally inert.
Fix: Every narrative paragraph must contain at least one *but* or *therefore*.

**Mistake 4 — The Invisible Interior**
Writing describes what happened externally but never takes the reader inside the character's experience.
Fix: Ground every external action in a physical internal experience. Not the emotion — the body experiencing the emotion.

**Mistake 5 — The Statistics Crutch**
Using numbers to prove greatness. Statistics answer "how much" — the reader is asking "what did it cost."
Fix: Every statistic must be translated into a human experience before it appears on the page.

---

## Pre-Publication Quality Checklist

Answer these ten questions before any content is published. If the answer to any of them is no — the piece is not ready.

1. Does the first sentence open a knowledge deficit so uncomfortable the reader cannot close the tab?
2. Have I described every emotion through the body rather than naming it? Replace words like "sad" or "happy" with a physical sensation.
3. Can the reader smell Nepal? Can they hear TU Ground? If the setting could exist anywhere in the world — the job is not done.
4. Is there a Zeigarnik loop that opens before the midpoint and does not close until the final third?
5. Does the visual layout breathe? Isolated lines with white space? Flowing paragraphs?
6. Am I writing about the institution or the human being who survived it?
7. Are there at least two emotional threads running simultaneously — the external story (match, record) and the internal story (identity, wound)?
8. If someone screenshots the climax section and sends it with no context — does it still hit?
9. Does sharing this content make the reader feel like a more resilient, more proud Nepali?
10. When they read the last word — do they feel something they cannot immediately name?

---

## Platform Laws — Non-Negotiable

**Law 1:** The first sentence is a trap. It must create an itch the reader cannot leave unscratched by withholding the resolution.

**Law 2:** Never name emotions. Show bodies. Show environments. Let the reader generate the emotion themselves.

**Law 3:** Statistics are not the story. They are evidence. The human cost of those statistics is the story.

**Law 4:** Every sensory detail must be irreplaceable. If it could exist in Sydney — it does not belong here.

**Law 5:** The "तपाईं" weapon is deployed maximum five times per piece.

**Law 6:** Isolated gut-punch lines maximum four times per piece. Surrounded by silence.

**Law 7:** Every direct quote is sacred. Word for word. No cleaning.

**Law 8:** The final line contains "तपाईं." It leaves something unresolved in the reader, not the story.

**Law 9:** After the final line — silence. Nothing. No related content. No CTA.

**Law 10:** Before publishing — read the last paragraph aloud. Does it make you pause? If no — it is not the last paragraph yet.

---

## The Hard No List

- ❌ No placeholder lorem ipsum — ever. Real data or nothing.
- ❌ No generic blue primary buttons.
- ❌ No Inter, Roboto, Arial, or system fonts.
- ❌ No hardcoded stat values — always dynamic via `cricinfo_id`.
- ❌ No commercial CTAs in navigation.
- ❌ No Wikipedia-style biography openings.
- ❌ No symmetric, template-feeling layouts.
- ❌ No white or light backgrounds. The Void is the default. Always.
- ❌ No emoji in any UI copy or editorial content.
- ❌ Do not rebuild components that already exist — check `/components` first.
- ❌ No Latin script on any live page — everything in Devanagari.
- ❌ No code-mixed Nepali in editorial content.
- ❌ No Google-Translate logic. Apply The Connective Tissue Rule and The Delayed Reveal Rule relentlessly.

---

## Before You Build — Checklist

- [ ] Have you read the existing component for this area? Don't rebuild what exists.
- [ ] Is there a player `.md` file for this profile? Check `/content/players/` first.
- [ ] Does the copy open in scene, not summary?
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

*Last updated: March 2026. If anything in this file contradicts the actual codebase — the codebase wins, then update this file.*