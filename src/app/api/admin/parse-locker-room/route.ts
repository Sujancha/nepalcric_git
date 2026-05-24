import { NextRequest, NextResponse } from 'next/server';

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

async function fetchFile(token: string, owner: string, repo: string, branch: string, filePath: string) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const res = await fetch(url, { headers: githubHeaders(token), cache: 'no-store' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} — ${text}`);
  }
  const data = await res.json() as { content: string; sha: string };
  const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');
  return { parsed: JSON.parse(content), sha: data.sha };
}

async function putFile(token: string, owner: string, repo: string, branch: string, filePath: string, content: string, sha: string, message: string) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const encoded = Buffer.from(content, 'utf8').toString('base64');
  const res = await fetch(url, {
    method: 'PUT',
    headers: githubHeaders(token),
    body: JSON.stringify({ message, content: encoded, sha, branch }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub commit error: ${res.status} — ${text}`);
  }
  const json = await res.json() as { commit?: { sha?: string } };
  return json.commit?.sha;
}

// GET — returns both featured (homepage) stories and archive stories + their SHAs
export async function GET() {
  const { token, owner, repo, branch } = getGitHubConfig();
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });

  try {
    const [featured, archive] = await Promise.all([
      fetchFile(token, owner, repo, branch, 'content/pages/locker-room.json'),
      fetchFile(token, owner, repo, branch, 'content/locker-room.json'),
    ]);
    return NextResponse.json({
      featured: featured.parsed,
      featuredSha: featured.sha,
      archive: archive.parsed,
      archiveSha: archive.sha,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST { target: 'featured'|'archive', data: {...}, sha: '...' }
export async function POST(request: NextRequest) {
  let body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const { target, data, sha } = body;
  if (!target || !data || !sha) return NextResponse.json({ error: 'Missing required fields: target, data, sha' }, { status: 400 });

  const { token, owner, repo, branch } = getGitHubConfig();
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });

  const filePath = target === 'featured' ? 'content/pages/locker-room.json' : 'content/locker-room.json';
  const commitMsg = target === 'featured' ? 'admin: update locker room featured stories' : 'admin: update locker room archive';

  try {
    const commitSha = await putFile(token, owner, repo, branch, filePath, JSON.stringify(data, null, 2), sha, commitMsg);
    return NextResponse.json({ success: true, commit: commitSha });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
