import { NextRequest, NextResponse } from 'next/server';

// gray-matter is a CJS module — must use require
const matter = require('gray-matter');

const GITHUB_API = 'https://api.github.com';

function getGitHubConfig() {
  return {
    token: process.env.GITHUB_TOKEN ?? '',
    owner: process.env.GITHUB_OWNER ?? 'Sujancha',
    repo: process.env.GITHUB_REPO ?? 'nepalcric_git',
    branch: process.env.GITHUB_BRANCH ?? 'main',
  };
}

function githubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
    'User-Agent': 'NepalCric-Admin/1.0',
  };
}

// GET ?id=rohit-paudel
// Returns { heroQuote, excerptNe, loreNe, images, sha, rawContent }
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const filePath = `content/players/${id}.md`;
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

  try {
    const res = await fetch(url, {
      headers: githubHeaders(token),
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}`, detail: errorText },
        { status: res.status }
      );
    }

    const data = (await res.json()) as { content: string; sha: string; name: string };
    const rawContent = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');

    // Parse with gray-matter
    const parsed = matter(rawContent);
    const frontmatter = parsed.data as Record<string, unknown>;

    return NextResponse.json({
      heroQuote: (frontmatter.hero_quote as string) ?? '',
      excerptNe: (frontmatter.excerpt_ne as string) ?? '',
      loreNe: (frontmatter.lore_ne as string) ?? '',
      images: (frontmatter.images as string[]) ?? [],
      sha: data.sha,
      rawContent,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch or parse player file', detail: message }, { status: 500 });
  }
}

interface PostBody {
  id: string;
  heroQuote: string;
  excerptNe: string;
  loreNe: string;
  images: string[];
  sha: string;
}

// POST { id, heroQuote, excerptNe, loreNe, images, sha }
// Rebuilds MD and commits to GitHub
export async function POST(request: NextRequest) {
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { id, heroQuote, excerptNe, loreNe, images, sha } = body;

  if (!id || !sha) {
    return NextResponse.json({ error: 'Missing required fields: id, sha' }, { status: 400 });
  }

  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  // First, fetch the current raw content so we preserve all untouched fields
  const filePath = `content/players/${id}.md`;
  const getUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

  let rawContent: string;
  try {
    const getRes = await fetch(getUrl, {
      headers: githubHeaders(token),
      cache: 'no-store',
    });

    if (!getRes.ok) {
      const errorText = await getRes.text();
      return NextResponse.json(
        { error: `GitHub fetch error: ${getRes.status}`, detail: errorText },
        { status: getRes.status }
      );
    }

    const getData = (await getRes.json()) as { content: string };
    rawContent = Buffer.from(getData.content.replace(/\n/g, ''), 'base64').toString('utf8');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch current file', detail: message }, { status: 500 });
  }

  // Parse, update the 4 editable fields, rebuild
  let updatedContent: string;
  try {
    const parsed = matter(rawContent);
    parsed.data.hero_quote = heroQuote;
    parsed.data.excerpt_ne = excerptNe;
    parsed.data.lore_ne = loreNe;
    parsed.data.images = images;
    // Use matter.stringify — second arg is the body content (empty for player files)
    updatedContent = matter.stringify('', parsed.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to rebuild markdown', detail: message }, { status: 500 });
  }

  // Commit to GitHub
  const putUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const encodedContent = Buffer.from(updatedContent, 'utf8').toString('base64');

  try {
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: githubHeaders(token),
      body: JSON.stringify({
        message: `admin: update ${id} player profile`,
        content: encodedContent,
        sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      return NextResponse.json(
        { error: `GitHub commit error: ${putRes.status}`, detail: errorText },
        { status: putRes.status }
      );
    }

    const putData = await putRes.json();
    return NextResponse.json({
      success: true,
      commit: (putData as { commit?: { sha?: string } }).commit?.sha,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to commit to GitHub', detail: message }, { status: 500 });
  }
}
