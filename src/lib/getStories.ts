import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface StoryFrontmatter {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  featured: boolean;
  lede: string;
}

export function getAllStories(): StoryFrontmatter[] {
  const directory = path.join(process.cwd(), 'content', 'stories');
  if (!fs.existsSync(directory)) {
    return [];
  }

  const filenames = fs.readdirSync(directory);
  const stories = filenames
    .filter(file => file.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const filePath = path.join(directory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        subtitle: data.subtitle || '',
        category: data.category || '',
        date: data.date || '',
        readTime: data.readTime || '',
        heroImage: data.heroImage || '',
        featured: data.featured || false,
        lede: data.lede || ''
      };
    });

  return stories;
}

export function getStoryBySlug(slug: string): { data: StoryFrontmatter, content: string } | null {
  const filePath = path.join(process.cwd(), 'content', 'stories', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    data: {
      slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      category: data.category || '',
      date: data.date || '',
      readTime: data.readTime || '',
      heroImage: data.heroImage || '',
      featured: data.featured || false,
      lede: data.lede || ''
    },
    content
  };
}
