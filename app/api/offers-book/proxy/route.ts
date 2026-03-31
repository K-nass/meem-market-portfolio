import { NextRequest } from 'next/server';
import { fetchPdfBytes, isProxyUrlAllowed } from '@/app/lib/offers-book';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url');
  if (!rawUrl) {
    return Response.json({ error: 'Missing "url" query parameter' }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return Response.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!isProxyUrlAllowed(targetUrl)) {
    return Response.json({ error: 'URL host is not allowed' }, { status: 403 });
  }

  try {
    const { bytes, contentType } = await fetchPdfBytes(targetUrl.toString());

    return new Response(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch PDF' },
      { status: 502 }
    );
  }
}

