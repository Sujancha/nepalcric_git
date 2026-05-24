'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Helper to get the absolute path to a player's content file
const getPlayerFilePath = (slug: string) => {
  return path.join(process.cwd(), 'content', 'players', `${slug}.md`);
};

export async function savePlayerContent(slug: string, htmlContent: string) {
  try {
    const filePath = getPlayerFilePath(slug);
    
    let existingContent = '';
    let frontmatter = {};

    try {
      existingContent = await fs.readFile(filePath, 'utf-8');
      const parsed = matter(existingContent);
      frontmatter = parsed.data;
    } catch (e) {
      // File doesn't exist, we will create it with empty frontmatter
    }

    // Combine existing frontmatter with the new HTML content
    const newFileContent = matter.stringify(htmlContent, frontmatter);

    await fs.writeFile(filePath, newFileContent, 'utf-8');
    
    return { success: true };
  } catch (error: any) {
    console.error('Error saving player content:', error);
    return { success: false, error: error.message };
  }
}

export async function readPlayerContent(slug: string) {
  try {
    const filePath = getPlayerFilePath(slug);
    const content = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(content);
    
    return { success: true, content: parsed.content };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
