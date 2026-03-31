import { fetchOfferByIdFromApi, fetchPdfBytes, isProxyUrlAllowed, resolveOfferBookPdfUrl } from '@/app/lib/offers-book';

export const dynamic = 'force-dynamic';

function toSafeFilename(value: string): string {
  return value
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const offer = await fetchOfferByIdFromApi(id);
    const pdfUrl = resolveOfferBookPdfUrl(offer);
    if (!pdfUrl) {
      return Response.json({ error: 'No PDF URL found for this offer' }, { status: 404 });
    }

    const parsedUrl = new URL(pdfUrl);
    if (!isProxyUrlAllowed(parsedUrl)) {
      return Response.json({ error: 'PDF host is not allowed' }, { status: 403 });
    }

    const { bytes, contentType } = await fetchPdfBytes(parsedUrl.toString());
    const fallbackName = offer.offer_category?.slug || offer.title || `offer-${id}`;
    const safeFilename = toSafeFilename(fallbackName);

    return new Response(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename}.pdf"`,
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to download offer PDF' },
      { status: 500 }
    );
  }
}

