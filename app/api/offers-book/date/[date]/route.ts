import {
  fetchOffersFromApi,
  fetchPdfBytes,
  isProxyUrlAllowed,
  resolveOfferBookPdfUrl,
  sanitizeDateOnly,
} from '@/app/lib/offers-book';

export const dynamic = 'force-dynamic';

function toSafeFilename(value: string): string {
  return value
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

export async function GET(_: Request, { params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const normalizedDate = sanitizeDateOnly(date);

  if (!normalizedDate) {
    return Response.json({ error: 'Invalid date format. Expected YYYY-MM-DD.' }, { status: 400 });
  }

  try {
    const offers = await fetchOffersFromApi({ per_page: '300' });
    const matchingOffer = offers.find((offer) => {
      const startDate = offer.offer_category?.start_date?.slice(0, 10);
      const endDate = offer.offer_category?.end_date?.slice(0, 10);
      return startDate === normalizedDate || endDate === normalizedDate;
    });

    if (!matchingOffer) {
      return Response.json({ error: 'No offer PDF found for this date' }, { status: 404 });
    }

    const pdfUrl = resolveOfferBookPdfUrl(matchingOffer);
    if (!pdfUrl) {
      return Response.json({ error: 'Matching offer does not include a PDF URL' }, { status: 404 });
    }

    const parsedUrl = new URL(pdfUrl);
    if (!isProxyUrlAllowed(parsedUrl)) {
      return Response.json({ error: 'PDF host is not allowed' }, { status: 403 });
    }

    const { bytes, contentType } = await fetchPdfBytes(parsedUrl.toString());
    const filenameSeed = matchingOffer.offer_category?.slug || `offer-${normalizedDate}`;
    const safeFilename = toSafeFilename(filenameSeed);

    return new Response(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename}-${normalizedDate}.pdf"`,
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

