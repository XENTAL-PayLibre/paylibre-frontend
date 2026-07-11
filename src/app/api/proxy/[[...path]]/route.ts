import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';

async function handler(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Proxy is restricted to local development' }, { status: 403 });
  }

  if (!API_BASE) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_API_URL environment variable is not defined' }, { status: 500 });
  }

  const url = new URL(request.url);
  const apiPath = url.pathname.replace('/api/proxy', '');
  const upstream = `${API_BASE}${apiPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) headers.set('cookie', cookieHeader);

  const body = request.method !== 'GET' && request.method !== 'HEAD'
    ? await request.arrayBuffer()
    : undefined;

  const upstream_res = await fetch(upstream, {
    method: request.method,
    headers,
    body,
    credentials: 'include',
  });

  const response = new NextResponse(upstream_res.body, {
    status: upstream_res.status,
    headers: upstream_res.headers,
  });

  const setCookies = upstream_res.headers.getSetCookie?.() ?? [];
  response.headers.delete('set-cookie');
  for (const raw of setCookies) {
    let rewritten = raw
      .replace(/;\s*domain=[^;]*/gi, '')
      .replace(/;\s*samesite=none/gi, '; SameSite=Lax')
      .replace(/;\s*secure/gi, '');
    
    // Make pl_access readable by JS so axios can use it as Bearer token
    if (rewritten.startsWith('pl_access=')) {
      rewritten = rewritten.replace(/;\s*httponly/gi, '');
    }
    response.headers.append('set-cookie', rewritten);
  }

  return response;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
