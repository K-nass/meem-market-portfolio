import { Offer, OfferDetailResponse, OffersResponse } from '@/app/types/offer';

const PDF_FIELD_CANDIDATES = [
  'pdf_url',
  'pdfUrl',
  'pdf_file',
  'pdfFile',
  'book_pdf_url',
  'bookPdfUrl',
  'offer_pdf_url',
  'offerPdfUrl',
  'offer_book_pdf_url',
  'offerBookPdfUrl',
] as const;

const DEFAULT_ALLOWED_PROXY_HOSTS = ['api.meem-market.com', 'meem-market.com', 'www.meem-market.com'];

type UnknownRecord = Record<string, unknown>;
type OfferLike = Offer | (Partial<Offer> & UnknownRecord);

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function getOffersApiBaseUrl(): string {
  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.meem-market.com');
}

export function sanitizeDateOnly(input: string): string | null {
  const normalized = input.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
}

function readPdfField(target: object | null | undefined): string | null {
  if (!target) {
    return null;
  }

  const record = target as UnknownRecord;

  for (const field of PDF_FIELD_CANDIDATES) {
    const value = record[field];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
}

function looksLikePdfUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.toLowerCase().endsWith('.pdf')) {
      return true;
    }
    return parsed.search.toLowerCase().includes('.pdf');
  } catch {
    return url.toLowerCase().includes('.pdf');
  }
}

export function resolveOfferBookPdfUrl(offer: OfferLike | null | undefined): string | null {
  if (!offer) {
    return null;
  }

  const directUrl = readPdfField(offer);
  if (directUrl) {
    return directUrl;
  }

  const category = (offer.offer_category ?? null) as unknown as UnknownRecord | null;
  const categoryUrl = readPdfField(category);
  if (categoryUrl) {
    return categoryUrl;
  }

  const imageField = offer.image;
  if (typeof imageField === 'string' && looksLikePdfUrl(imageField)) {
    return imageField;
  }

  const categoryCover = category?.cover_image;
  if (typeof categoryCover === 'string' && looksLikePdfUrl(categoryCover)) {
    return categoryCover;
  }

  return null;
}

async function fetchApiJson<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
  const searchParams = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string' && value.trim().length > 0) {
        searchParams.set(key, value);
      }
    }
  }

  const baseUrl = getOffersApiBaseUrl();
  const url = `${baseUrl}${path}${searchParams.size > 0 ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Upstream API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchOfferByIdFromApi(id: string): Promise<Offer> {
  const payload = await fetchApiJson<OfferDetailResponse>(`/api/v1/offers/${id}`);
  return payload.data;
}

export async function fetchOffersFromApi(params?: {
  branch_slug?: string;
  country_slug?: string;
  category_slug?: string;
  per_page?: string;
}): Promise<Offer[]> {
  const payload = await fetchApiJson<OffersResponse>('/api/v1/offers', params);
  return payload.data;
}

export function getAllowedProxyHosts(): string[] {
  const configured = process.env.OFFERS_BOOK_PROXY_ALLOWED_HOSTS;
  if (!configured || configured.trim().length === 0) {
    return DEFAULT_ALLOWED_PROXY_HOSTS;
  }

  return configured
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter((host) => host.length > 0);
}

export function isProxyUrlAllowed(url: URL): boolean {
  if (!['http:', 'https:'].includes(url.protocol)) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  return getAllowedProxyHosts().some((allowedHost) => {
    return hostname === allowedHost || hostname.endsWith(`.${allowedHost}`);
  });
}

export async function fetchPdfBytes(url: string): Promise<{ bytes: ArrayBuffer; contentType: string }> {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Accept: 'application/pdf,*/*',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch PDF (${response.status})`);
  }

  const contentType = response.headers.get('content-type') || 'application/pdf';
  const bytes = await response.arrayBuffer();
  return {
    bytes,
    contentType: contentType.includes('pdf') ? contentType : 'application/pdf',
  };
}
