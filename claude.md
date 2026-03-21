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

When a term is universally understood (cricket formats, tournament names, technical UI concepts), do not write it in Latin script. Transliterate it into Devanagari instead.

| Latin Script | Devanagari |
|---|---|
| T20 | टी-ट्वेन्टी |
| ODI | ओडीआई |
| World Cup | वर्ल्ड कप |
| Next Mission | नेक्स्ट मिसन |
| Threat Meter | थ्रेट मिटर |
| Squad | स्क्वाड |
| Live | लाइभ |
| CWC League 2 | सिडब्ल्यूसी लिग २ |

If in doubt, transliterate. Never switch to Latin script on a live page.

### Writing Style for Nepali Content

All editorial content — player lore, homepage copy, match day copy, quote cards, everything — must be written as **pure literary Nepali**. The style blends:

- **Editorial journalism**: precision, urgency, the specific weight of a fact delivered at exactly the right moment
- **Novel writing**: sensory immersion, character interiority, scenes over summaries
- **Sports storytelling**: tension, stakes, the physical reality of competition

This is not textbook Nepali. It is not code-mixed Nepali (no English words bleeding in). It is not translated English — it must be conceived and written in Nepali, thinking in Nepali rhythms, Nepali sentence structures, Nepali emotional registers.

---

## Player Data Schema (`.md` Files)

Player profiles are driven by markdown files with a seven-tier YAML frontmatter schema.

**File location:** `/content/players/[player-id].md`

### Schema Tiers

```yaml
# TIER 1 — IDENTITY
id: rohit-paudel
name_en: Rohit Paudel
name_ne: रोहित पौडेल
role: ब्याट्सम्यान
status: ACTIVE   # ACTIVE | INJURED | RETIRED — RETIRED triggers legacy mode automatically
cricinfo_id: 1234567   # Powers live stat injection. Never remove this field.

# TIER 2 — DEBUT
debut_date: 2017-03-15
debut_age_years: 16
debut_age_days: 146
debut_match: नेपाल बनाम युएई, एसीसी टी-ट्वेन्टी
debut_note_ne: ""

# TIER 3 — STORY (Editorial, not encyclopaedic)
hero_quote: ""   # Single defining line. Not a full sentence if possible.
lore_ne: ""      # 2–4 paragraph origin story. Drop the reader into a scene — never a summary.

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

### Status Modes

- `ACTIVE` — Full color, normal layout
- `INJURED` — Amber warning badge, dimmed card
- `RETIRED` — `grayscale(100%)` + gold accent. Legacy Mode. Applied automatically via the `status` field.

### Completed Player Files

- `rohit-paudel.md` · `sandeep-lamichhane.md` · `dipendra-singh-airee.md` · `kushal-bhurtel.md` · `sompal-kami.md`

### Player Files in Pipeline

- `aasif-sheikh.md` · `aarif-sheikh.md` · `gulshan-jha.md` · `karan-kc.md`
- `pratish-gc.md` · `sher-malla.md` · `lokesh-bam.md` · `sundeep-jora.md`

---

## Reference Implementation: Balen Shah Page

The Balen Shah page is the **gold standard** for all cinematic player and character pages. When building any new profile page, benchmark against this.

### Architecture — Six Sections Following the Hero's Journey

1. Cinematic opening — drop the reader into a scene (never a summary)
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
- Scroll animations, mobile-optimised layout, full SEO metadata

---

## AI Story Companion

### Implementation

- Powered by **Google Gemini API** via a local Next.js proxy route
- Environment variable: `GEMINI_API_KEY` in `.env.local`
- Proxy route: `/api/gemini` — check if this exists before creating it

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

## Content Bible — The Writing Philosophy

### The Core Question

Before writing a single word for NepalCric, understand who you are writing for.

This is the Nepali person living in a cramped apartment in Melbourne, Dubai, or Dallas — who opens their phone at 2am because they cannot sleep, because they miss something they cannot name — and for fifteen minutes, they are home.

Every sentence must be written for that person. That specific person. At that specific hour. In that specific loneliness.

**The test:**
- If they feel something before they understand what they are reading — you succeeded.
- If they finish reading and immediately want to send it to another Nepali — you succeeded.
- If they close the tab and go back to sleep unchanged — you failed. Start again.

---

## Master Story Architecture — The Six-Act Structure

Every piece of long-form content on NepalCric follows this structure. Not as a rigid formula — as a skeleton you build flesh onto. The structure is invisible to the reader. They only feel the emotion.

### Act 1: The Arrival — The Aversive Hook

**Emotional purpose:** Psychological discomfort. The reader must feel tension before they understand why. Their rational brain must be bypassed in the first three seconds.

**Length:** 3–4 sentences maximum. **Rhythm:** Short. Blunt. Staccato. Like a hand on the shoulder that makes you stop walking.

**Technique:** Drop the reader into a moment of high tension, or subvert something they believed to be true. Never explain. Never summarise. Never start with biography.

**Wrong:**
> रोहित पौडेल नवलपरासीमा जन्मिए र सानैदेखि क्रिकेट खेल्न थाले...

**Right:**
> नवलपरासीको त्यो केटो जो आफ्नो देशको लागि खेल्नुअघि आफ्नो नाम लुकाउन सिकेको थियो — उसले एकदिन इतिहास लेख्यो।
> तर त्यो दिन आउनुभन्दा अघि, उसले हार मान्ने प्रयास गरेको थियो।
> एकपटक होइन।
> तीनपटक।

**Available structural tools:**
- The Contradiction Opening: establish what everyone believes, then shatter it
- The In Media Res Drop: begin in the middle of the most dramatic scene
- The Withheld Identity: describe the moment before revealing who we are talking about
- The Unanswered Question: ask something so specific and painful the reader cannot not find the answer

---

### Act 2: The Ordinary World — The Empathy Baseline

**Emotional purpose:** Shared human connection. The reader must look at this person's life before fame and think: this could have been me.

**Length:** 2–3 full paragraphs. The longest, slowest section. Let it breathe.

**The Proustian Anchor rule:** Every paragraph must contain at least one sensory detail that could only exist in Nepal. Not "a dusty road" — but "the particular way Kathmandu dust settles on your collar in April, mixed with diesel and incense." If the detail could exist anywhere in the world, find a more specific one.

**The "तपाईं" weapon — first deployment:** Somewhere in Act 2, use the second person once. One sentence. Precise and unexpected. It should feel like a hand reaching through the screen.

> तपाईंलाई याद छ — त्यो माइक्रोबसको झ्याल जसबाट बाहिर हेर्दा काठमाडौं भाँचिएको लाग्थ्यो, र आफूले त्यसलाई जोड्न सक्दिन भन्ने थाहा हुन्थ्यो।

**Include:** Specific place with sensory detail. Family's economic reality shown through one object or moment, not summarised. What Nepal looked like through their eyes before anything changed. What the people around them expected their life to become.

**Never include:** Statistics from this period. Comparisons to other players. Explanations of why the backstory matters — the reader will feel it, trust them.

---

### Act 3: The Inciting Incident and Try/Fail Cycles

**Emotional purpose:** Vulnerability. The reader admires someone more for trying than for succeeding.

**Length:** 3–4 substantial paragraphs with strategic breaks.

**The "But/Therefore" rule:** Every paragraph must follow the logic of *but* and *therefore* — never *and then*. Chronological lists kill story. Causation drives story.

Wrong: He tried out for the team. He got selected. He played his first match.
Right: He tried — but they said he was too young. Therefore he trained alone for eight months. But when he returned, the selectors had changed.

**The Zeigarnik Loop — open it here:** Begin a scene at maximum tension, break it off, and move forward in time. The reader carries the unresolved scene through the rest of the page.

> ड्रेसिङ रुममा उनी मात्र थिए। बाहिर मैदानमा आफ्नो नाम बोलाइयो।
> उनले ब्याट उठाए।
> र जे भयो — त्यो हामी पछि भन्छौं।

---

### Act 4: The Ordeal — Rock Bottom

**Emotional purpose:** Desperation. Everything must be taken from the reader's identification with this character. The reader must feel physically tense.

**Length:** Short. 1–2 paragraphs maximum, plus isolated single lines.

**Rhythm:** Rapid-fire. The shortest sentences on the page. Single lines isolated in white space. Each one a blow.

**The Pixar Rule 16:** Stack the odds. What happens if they fail? Who else suffers? Connect their failure to something larger — family, community, country.

**The Von Restorff Isolation rule:** The darkest fact must sit alone on its own line with white space above and below. Nothing decorating it. Nothing explaining it.

> डाक्टरले उनको अनुहार हेरेनन्।
> बुबा छैनन्।
> पाँच जना।

**The Contradiction rule:** Show the aspect of your subject that complicates the hero narrative. They failed someone. They broke a promise. The reader will not love them less — they will trust the page more.

---

### Act 5: The Resurrection — The Climax

**Emotional purpose:** Catharsis. The release of everything that has been building since the first sentence.

**Length:** 2 substantial paragraphs. **Rhythm:** Begin fast, then a sudden complete stillness.

**The cinematic moment rule:** Every climax must have one specific image that, if frozen on a screen, would make a stranger feel something without context. Everything before it is acceleration. Everything after it is exhale.

> बोर्डको रातो बत्ती उनको चश्माको धारमा परावर्तन भइरहेको थियो।
> उनले एउटा मात्र काम गरे —
> एकपटक। बिस्तारै। टाउको हल्लाए।

**The Zeigarnik Loop — close it here:** The loop opened in Act 3 must close here. Bring the reader back to the abandoned scene. The payoff must be heavier because of everything that happened between.

**The Earned Payoff rule:** Plant a detail in Act 2. Use it here, transformed. The same object, the same place — but now carrying the weight of everything that happened between the planting and the harvest.

---

### Act 6: The Return — The Identity Loop

**Emotional purpose:** High-arousal sharing. The reader must leave with a lump in their throat and the immediate desire to send it to another Nepali.

**Length:** One short paragraph. The restraint is the point.

**The Transfer rule:** Connect the subject's survival explicitly to the reader's own capacity for survival. Not sentimentally. Not inspirationally. Truthfully.

**The final "तपाईं" rule:** The last sentence of the page must contain "तपाईं." It must connect the subject's journey to the reader's own life. It must leave something unresolved in the reader — not the story, but something in themselves.

**The Silence rule:** After the final sentence — nothing. No related articles. No call to action. The story earns its silence.

---

## Sentence-Level Craft Manual

### The Five Sentence Types

**Type 1 — The Establishing Long Sentence**
Purpose: Create atmosphere. Slow the reader down.
Length: 25–45 words. Multiple clauses. A rhythm that breathes.
Structure: Open with a physical location or time of day → build with sensory layering → end with the human being at the centre.

**Type 2 — The Staccato Strike**
Purpose: Accelerate. Create urgency. Land facts like blows.
Length: 1–7 words. No qualifiers. No softening.

**Type 3 — The Sensory Immersion Sentence**
Purpose: Neural coupling. Make the reader's body experience what the subject is experiencing.
**Rule:** Never name the emotion. Describe the body or the environment that creates it.

Wrong: उनी डराएका थिए।
Right: उनको हत्केलामा पसिना थियो र माइक्रोफोन सर्किरहेको थियो।

Wrong: उनलाई खुशी लागेको थियो।
Right: उनले आफ्नो हाँसो रोक्न खोजे — तर सकेनन्।

**Nepal Specificity Test:** Can this sensory detail exist anywhere in the world? If yes — make it more specific. The detail must be irreplaceable.

**Type 4 — The Isolated Gut-Punch**
Purpose: Make the reader stop. Break the rhythm.
Structure: One sentence. Or one phrase. Or one number. On its own line. White space above and below. Nothing decorating it.
**Usage limit:** Maximum four times per long-form piece. If used more, the effect disappears.

**Type 5 — The Second Person Bridge ("तपाईं")**
Purpose: Collapse the distance between the reader and the narrative.
Structure: "तपाईं" + one specific, unexpected detail the reader will recognise from their own life.
**Usage limit:** Maximum five times per piece. Each deployment must target a different emotional wound.

Too vague: तपाईंलाई थाहा छ नेपाल कति सुन्दर छ।
Exactly right: तपाईंलाई थाहा छ — आफ्नो नाम अलि फरक तरिकाले उच्चारण गर्दा कति राहत मिल्छ।

---

### Paragraph Architecture Rules

**The Flow Rule:** Normal narrative prose must group 3–5 related sentences into one paragraph. The reader needs to sink into the narrative. Isolated one-line paragraphs everywhere fragment the reading experience and prevent the deep engagement that makes content shareable. Reserve isolation for the four gut-punch moments only.

**The Paragraph Ending Rule:** Every paragraph should end on a word, image, or unanswered question that pulls the reader's eye to the next line. Never end on a conclusion — end on an opening.

**The Section Transition Rule:** Never explain what just happened at the end of a section. Never preview what is coming. Trust the architecture to carry the reader.

### Direct Quote Rules

Every direct quote from a real person must be preserved word for word. Never paraphrase in quotation marks. Never clean up grammar.

Attribution should be minimal and specific:
> — रोहित पौडेल, इङ्ल्याण्डसँग ४ रनको हारपछि, २०२६

Never: "said Rohit Paudel in an interview with..." — write it as shown above, in Devanagari.

---

## The Nepali Emotional Frequency

### The Five Core Wounds of the Nepali Diaspora

Every piece of content should consciously touch at least two of these five wounds. Not to exploit them — because this is what the audience is carrying, and the content that acknowledges what people carry is the content that earns trust.

**Wound 1 — The Identity Erasure Wound**
The experience of hiding or modifying who you are — your name, your accent, your origin — to gain access to spaces that were not built for you.
> तपाईंलाई थाहा छ — आफ्नो नाम अलि फरक तरिकाले उच्चारण गर्दा कति राहत मिल्छ।

**Wound 2 — The Lost Kathmandu Wound**
The specific grief of carrying a version of Nepal in your memory that no longer exists — or that you are no longer part of.
> काठमाडौंको आरतीको धुपको गन्ध — त्यो गन्ध जो केवल यही सहरमा हुन्छ, र जसले विदेशमा बस्ने हरेक नेपालीलाई एकैपटक घर पुर्याइदिन्छ।

**Wound 3 — The Underestimation Wound**
The experience of being dismissed because of where you are from. Nepal is small. Nepalis are frequently told their country does not matter. Resolve it rather than wallow in it.
> ६१,७६७।
> अजेय देवताहरू पनि रगत बगाउँछन्।

**Wound 4 — The Departure Wound**
The experience of having to leave Nepal because there was nothing there for you. The defining wound of a generation.
> तपाईंले त्यो रात फोनको स्क्रिनमा ती अङ्कहरू हेर्नुभयो — विदेशको कुनै कोठामा, मध्यरातको एकान्तमा। र पहिलोपटक — धेरै वर्षपछि — घर फर्किन मन लाग्यो।

**Wound 5 — The Conditional Hope Wound**
The exhaustion of someone who has hoped and been hurt enough times that hope itself feels dangerous.
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
2. Have I described every emotion through the body rather than naming it? Search for: nervous, sad, devastated, happy, proud, scared, excited. Every instance must be replaced with a physical sensation.
3. Can the reader smell Nepal? Can they hear it? If the setting could exist anywhere in the world — the job is not done.
4. Is there a Zeigarnik loop that opens before the midpoint and does not close until the final third?
5. Does the visual layout breathe? Isolated lines with white space? Flowing paragraphs? Does the page look like a heartbeat or a flatline of uniform blocks?
6. Am I writing about the institution or the human being who survived it? The Nepal Cricket Board, the ICC — these are the setting. The human spirit navigating them is the story.
7. Are there at least two emotional threads running simultaneously — the external story (match, election, record) and the internal story (identity, wound, unanswered question)?
8. If someone screenshots the climax section and sends it with no context — does it still hit? If it requires the buildup to land, the climax is not strong enough.
9. Does sharing this content say something about the reader? Does it make them feel like a more thoughtful, more resilient, more proud Nepali?
10. When they read the last word — do they feel something they cannot immediately name? And do they want to pass that feeling to someone else before it fades?

---

## Platform Laws — Non-Negotiable

These are not guidelines. Every piece of content published on NepalCric, by any writer, at any time, must obey all of them.

**Law 1:** The first sentence is a trap. It must create an itch the reader cannot leave unscratched.

**Law 2:** Never name emotions. Show bodies. Show environments. Let the reader generate the emotion themselves.

**Law 3:** Statistics are not the story. They are evidence. The human cost of those statistics is the story.

**Law 4:** Every sensory detail must be irreplaceable. If it could exist in Sydney — it does not belong here.

**Law 5:** The "तपाईं" weapon is deployed maximum five times per piece. Each deployment targets a different wound. Maximum two sentences each.

**Law 6:** Isolated gut-punch lines maximum four times per piece. Surrounded by silence. Never explained.

**Law 7:** Every direct quote is sacred. Word for word. No cleaning. No paraphrasing.

**Law 8:** The final line contains "तपाईं." It transfers the emotional weight to the reader. It leaves something unresolved in them, not in the story.

**Law 9:** After the final line — silence. Nothing. No related content. No call to action.

**Law 10:** Before publishing — read the last paragraph aloud. Does it make you pause? Does it make you want to send it to someone? If no — it is not the last paragraph yet.

---

## The Hard No List

- ❌ No placeholder lorem ipsum — ever. Real data or nothing.
- ❌ No generic blue primary buttons.
- ❌ No Inter, Roboto, Arial, or system fonts.
- ❌ No hardcoded stat values (batting average, strike rate, etc.) — always dynamic via `cricinfo_id`.
- ❌ No commercial CTAs in navigation.
- ❌ No Wikipedia-style biography openings.
- ❌ No symmetric, template-feeling layouts.
- ❌ No bouncy, spinning, or jQuery-era animations.
- ❌ No white or light backgrounds. The Void is the default. Always.
- ❌ No emoji in any UI copy or editorial content.
- ❌ Do not rebuild components that already exist — check `/components` first.
- ❌ Do not assume the existing design from memory — always ask for screenshots or code before writing prompts that modify existing UI.
- ❌ No Latin script on any live page — everything in Devanagari.
- ❌ No code-mixed Nepali in editorial content — pure literary Nepali only.

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

A Nepali person living abroad opens this page at 2am. They are not looking for it. They find it by accident.

Within the first three sentences, they stop whatever else they were doing.

By the middle of the piece, they have forgotten where they are.

By the end, they are sitting with something they cannot name — a feeling that is part grief and part pride and part the specific loneliness of loving a country from a distance.

They do not close the tab. They send it to someone. Not because the content told them to. Because they cannot carry the feeling alone.

**That is the standard. That is NepalCric.**

---

## Key People

- **Builder**: Sujan
- **Design Philosophy**: Cricket as cinema. Players as characters. Fans as protagonists.
- **Emotional Benchmark**: Nepal vs South Africa, T20 World Cup 2024, lost by 1 run.

---

*Last updated: March 2026. If anything in this file contradicts the actual codebase — the codebase wins, then update this file.*