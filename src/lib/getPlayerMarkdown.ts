import fs from 'fs';
import path from 'path';
const matter = require('gray-matter');

export interface PlayerMdRecord {
  label_ne: string;
  value: string;
}

export interface PlayerMdData {
  id?: string;
  name_en?: string;
  name_ne?: string;
  role?: string;
  status?: string;
  cricinfo_id?: number;
  excerpt_ne?: string;
  debut_date?: string;
  debut_age_years?: number;
  debut_age_days?: number;
  debut_match?: string;
  debut_note_ne?: string;
  hero_quote?: string;
  lore_ne?: string;
  records?: PlayerMdRecord[];
  domestic_teams?: string[];
  franchise_leagues?: string[];
  last_updated?: string;
  research_status?: string;
}

/**
 * Parses a player's .md file from content/players/{id}.md
 * Returns typed frontmatter data, or null if no file exists.
 */
export function getPlayerMarkdown(id: string): PlayerMdData | null {
  const filePath = path.join(process.cwd(), 'content', 'players', `${id}.md`);
  const exists = fs.existsSync(filePath);
  console.log(`[getPlayerMarkdown] cwd        : ${process.cwd()}`);
  console.log(`[getPlayerMarkdown] resolved   : ${filePath}`);
  console.log(`[getPlayerMarkdown] file exists: ${exists}`);

  if (!exists) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);
    console.log(`[getPlayerMarkdown] parsed keys: ${Object.keys(data).join(', ')}`);
    return data as PlayerMdData;
  } catch (err) {
    console.error(`[getPlayerMarkdown] parse error for "${id}":`, err);
    return null;
  }
}
