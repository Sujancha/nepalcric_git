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

export async function GET() {
  const { token, owner, repo, branch } = getGitHubConfig();
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/content/pages/fanzone.json?ref=${branch}`;
  try {
    const res = await fetch(url, { headers: githubHeaders(token), cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub API error: ${res.status}`, detail: text }, { status: res.status });
    }
    const raw = await res.json() as { content: string; sha: string };
    const content = Buffer.from(raw.content.replace(/\n/g, ''), 'base64').toString('utf8');
    return NextResponse.json({ data: JSON.parse(content), sha: raw.sha });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const { data, sha } = body;
  if (!data || !sha) return NextResponse.json({ error: 'Missing required fields: data, sha' }, { status: 400 });

  const { token, owner, repo, branch } = getGitHubConfig();
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/content/pages/fanzone.json`;
  const encoded = Buffer.from(JSON.stringify(data, null, 2), 'utf8').toString('base64');

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: githubHeaders(token),
      body: JSON.stringify({ message: 'admin: update fan zone content', content: encoded, sha, branch }),
    });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub commit error: ${res.status}`, detail: text }, { status: res.status });
    }
    const json = await res.json() as { commit?: { sha?: string } };
    return NextResponse.json({ success: true, commit: json.commit?.sha });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
