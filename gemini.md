# System Instructions: nepalCRIC Official Website

## 🛑 STRICT SAFETY RULES (CRITICAL)
1. **Strict Workspace Confinement:** You are strictly locked to the current active project directory (`Nepali_Cricket_Website`). Never read, write, modify, or execute files outside this specific path.
2. **Zero Outside Interaction:** Do not delete, move, or rename anything on my computer outside of our current working directory.
3. **Ask Before Deleting:** Even inside the project folder, do not delete any files/folders without explicitly asking for my permission first.
4. **No System Changes:** Never run terminal commands that install global packages, alter system settings, or modify environment variables. 
5. **Terminal Transparency:** Before running any terminal command that makes changes, tell me exactly what it does and wait for my go-ahead.

---

## Project Overview
Build a high-energy, interactive **fan website for the Nepali Cricket Team** (nepalCRIC). The site needs to serve as a digital home for fans, featuring live match updates, deep-dive player statistics, cinematic storytelling, and interactive fan engagement tools.

## Tech Stack & Architecture
- **Frontend Framework:** Next.js / React (or swap with your preferred stack)
- **Styling:** Tailwind CSS (Must map strictly to our custom brand colors)
- **Data Source:** Component structure must be built to receive JSON data from our NotebookLM RAG database backend.

---

## Navigation Structure

### Top Navigation Tabs
- Home (Default view)
- Live Center
- Squad
- Stats Dashboard
- Media (Videos/News)
- Fan Zone

### Header Elements
- nepalCRIC Logo (Top left)
- Live Match Indicator (Blinking red dot if a match is live)
- Dark/Light mode toggle
- "Get Tickets" button (Primary button style)

---

## Homepage Layout (Top to Bottom)

### 1. Hero Section (Cinematic)
- Edge-to-edge looping background video (stadium/action shots)
- Main Headline: "The Roar of the Rhinos"
- Primary CTA: "Watch Highlights" (Opens video player modal)

### 2. Live Action Bar (Sticky)
- Horizontal banner sitting just below the hero section.
- **If match is live:** Show current score, run rate, and current batting/bowling pair.
- **If no match:** Dynamic countdown timer to the next major fixture.

### 3. Interactive Stats Center
- Dark, sleek dashboard UI.
- Interactive tables allowing users to sort current players by:
  - Highest Strike Rate
  - Most Sixes
  - Best Bowling Economy
- Quick-view player profile cards that appear on hover.

### 4. Storytelling Hub
- Clean grid layout of high-quality video thumbnails and news cards.
- Categories: Behind the Scenes, Match Highlights, Training Montages.

### 5. Fan Zone Widget
- Match Predictor Poll (e.g., "Who will take the most wickets today?") with real-time percentage bars.
- Community Photo Gallery (Auto-scrolling grid).

---

## Design System Enforcement
🚨 **CRITICAL INSTRUCTION:** You must strictly follow the styling, colors, and typography defined in the `brandGuidelines.md` file. Always use "Rhino Blue" (#1E3A8A) for primary elements and "Crimson Red" (#D32F2F) for accents and live states.