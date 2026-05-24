// Shared story types — NO server imports (fs/path) here.
// Safe to import from both Server and Client Components.

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
