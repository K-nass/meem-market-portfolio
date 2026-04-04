import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferBookViewer } from '@/app/components/OfferBookViewer';
import { resolveOfferBookPdfUrl } from '@/app/lib/offers-book';
import { offersService } from '@/app/services/offers';
import { Offer } from '@/app/types/offer';

export const dynamic = 'force-dynamic';

interface OfferDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

interface LoadedOfferBook {
  offer: Offer;
  pages: string[];
  pdfUrl: string | null;
  date: string | undefined;
}

function sanitizePageImages(images: Array<string | null | undefined>): string[] {
  const normalized = images
    .map((image) => (typeof image === 'string' ? image.trim() : ''))
    .filter((image) => image.length > 0);
  return Array.from(new Set(normalized));
}

async function loadOfferBookData(id: string): Promise<LoadedOfferBook | null> {
  try {
    const offerResponse = await offersService.getOfferById(id);
    const offer = offerResponse.data;

    let pages = sanitizePageImages([offer.image]);

    if (offer.offer_category?.slug) {
      try {
        const relatedOffersResponse = await offersService.getOffers({
          category_slug: offer.offer_category.slug,
          branch_slug: offer.offer_category.branch?.slug,
        });

        const orderedPages = [...relatedOffersResponse.data]
          .sort((a, b) => {
            if (a.sort_order !== b.sort_order) {
              return a.sort_order - b.sort_order;
            }
            return a.id - b.id;
          })
          .map((item) => item.image);

        const normalizedPages = sanitizePageImages(orderedPages);
        if (normalizedPages.length > 0) {
          pages = normalizedPages;
        }
      } catch {
        // Fallback to the current offer image if grouped pages are unavailable.
      }
    }

    const pdfUrl = resolveOfferBookPdfUrl(offer);
    const date = offer.offer_category?.start_date?.slice(0, 10);

    return {
      offer,
      pages,
      pdfUrl,
      date,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: OfferDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const loaded = await loadOfferBookData(id);

  if (!loaded) {
    return {
      title: 'Offer Not Found',
    };
  }

  const { offer } = loaded;
  const ogImage = offer.offer_category?.cover_image || offer.image;

  return {
    title: `${offer.offer_category?.title || offer.title} | Offer Book`,
    description: offer.title,
    openGraph: {
      title: offer.offer_category?.title || offer.title,
      description: offer.title,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
  const { id } = await params;
  const loaded = await loadOfferBookData(id);

  if (!loaded) {
    notFound();
  }

  const { offer, pages, pdfUrl, date } = loaded;

  if (!pdfUrl && pages.length === 0) {
    notFound();
  }

  return (
    <OfferBookViewer
      pdfUrl={pdfUrl}
      offerBookCode={offer.offer_category?.slug || `offer-${offer.id}`}
      date={date}
      initialImages={pages}
      downloadByIdUrl={`/api/offers-book/id/${offer.id}`}
      downloadByDateUrl={date ? `/api/offers-book/date/${date}` : undefined}
      backHref="/offers"
    />
  );
}
