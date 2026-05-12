import { NextRequest, NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';

function getConfig() {
    return {
        token: process.env.GITHUB_TOKEN ?? '',
        owner: process.env.GITHUB_OWNER ?? 'Sujancha',
        repo: process.env.GITHUB_REPO ?? 'nepalcric_git',
        branch: process.env.GITHUB_BRANCH ?? 'main',
    };
}

function headers(token: string): HeadersInit {
    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'NepalCric-Admin/1.0',
    };
}

interface UploadBody {
    /** e.g. "rohit-paudel" */
    playerId: string;
    /** e.g. "photo1.webp" — keep it simple, no path separators */
    filename: string;
    /** raw base64 string of the image (no data-URL prefix) */
    contentBase64: string;
}

export async function POST(request: NextRequest) {
    let body: UploadBody;
    try {
        body = (await request.json()) as UploadBody;
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { playerId, filename, contentBase64 } = body;
    if (!playerId || !filename || !contentBase64) {
        return NextResponse.json({ error: 'Missing playerId, filename, or contentBase64' }, { status: 400 });
    }

    // Sanitise filename — letters, numbers, dash, underscore, dot only
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `public/images/players/${playerId}/${safe}`;
    const publicPath = `/images/players/${playerId}/${safe}`;

    const { token, owner, repo, branch } = getConfig();
    if (!token) {
        return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
    }

    // Check if file already exists (need its SHA to update)
    const checkUrl = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const checkRes = await fetch(checkUrl, { headers: headers(token), cache: 'no-store' });
    const existingSha: string | undefined =
        checkRes.ok ? ((await checkRes.json()) as { sha: string }).sha : undefined;

    // Commit the image
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
    const commitBody: Record<string, string> = {
        message: `admin: upload image for ${playerId} — ${safe}`,
        content: contentBase64,
        branch,
    };
    if (existingSha) commitBody.sha = existingSha;

    const res = await fetch(url, {
        method: 'PUT',
        headers: headers(token),
        body: JSON.stringify(commitBody),
    });

    if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json(
            { error: `GitHub API error: ${res.status}`, detail },
            { status: res.status }
        );
    }

    return NextResponse.json({ success: true, path: publicPath });
}
