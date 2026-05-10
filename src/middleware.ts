import { NextRequest, NextResponse } from 'next/server';

async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const dotIndex = token.indexOf('.');
    if (dotIndex === -1) return false;

    const timestamp = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);

    if (!timestamp || !signature) return false;

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts)) return false;

    // Token valid for 7 days
    const age = Date.now() - ts;
    if (age > 7 * 24 * 60 * 60 * 1000) return false;

    // Use Web Crypto API (Edge Runtime compatible)
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(timestamp);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const expectedHex = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return expectedHex === signature;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API through without check
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth')
  ) {
    return NextResponse.next();
  }

  // Protect all /admin/** and /api/admin/** routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_session')?.value;
    const secret = process.env.JWT_SECRET ?? 'fallback-dev-secret';

    const valid = token ? await verifyToken(token, secret) : false;

    if (!valid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
