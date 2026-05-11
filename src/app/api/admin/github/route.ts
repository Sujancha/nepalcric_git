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

// GET ?path=content/players/rohit-paudel.md
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
  }

  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

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

    // GitHub returns base64-encoded content with newlines
    const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');

    return NextResponse.json({
      content,
      sha: data.sha,
      name: data.name,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to fetch from GitHub', detail: message }, { status: 500 });
  }
}

interface PutBody {
  path: string;
  content: string;
  sha: string;
  message?: string;
}

// PUT { path, content, sha, message }
export async function PUT(request: NextRequest) {
  let body: PutBody;
  try {
    body = (await request.json()) as PutBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { path: filePath, content, sha, message } = body;

  if (!filePath || content === undefined || !sha) {
    return NextResponse.json(
      { error: 'Missing required fields: path, content, sha' },
      { status: 400 }
    );
  }

  const { token, owner, repo, branch } = getGitHubConfig();

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const encodedContent = Buffer.from(content, 'utf8').toString('base64');
  const commitMessage = message ?? `admin: update ${filePath}`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: githubHeaders(token),
      body: JSON.stringify({
        message: commitMessage,
        content: encodedContent,
        sha,
        branch,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `GitHub API error: ${res.status}`, detail: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      commit: (data as { commit?: { sha?: string } }).commit?.sha,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to commit to GitHub', detail: message }, { status: 500 });
  }
}
