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

// GET
export async function GET() {
  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const filePath = `content/pages/scoreboard.json`;
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
    
    // Parse JSON
    const parsed = JSON.parse(rawContent);

    return NextResponse.json({
      data: parsed,
      sha: data.sha,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch or parse scoreboard.json', detail: message }, { status: 500 });
  }
}

// POST { data: { isLive, matchTitle, matchStatus, pulseText }, sha }
export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { data, sha } = body;

  if (!data || !sha) {
    return NextResponse.json({ error: 'Missing required fields: data, sha' }, { status: 400 });
  }

  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const filePath = `content/pages/scoreboard.json`;
  const updatedContent = JSON.stringify(data, null, 2);

  const putUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const encodedContent = Buffer.from(updatedContent, 'utf8').toString('base64');

  try {
    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: githubHeaders(token),
      body: JSON.stringify({
        message: `admin: update scoreboard config`,
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
