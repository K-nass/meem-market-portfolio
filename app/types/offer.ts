export interface SocialLinks {
  tiktok: string;
  website: string;
  facebook: string;
  snapchat: string;
  whatsapp: string;
  instagram: string;
}

export interface Branch {
  id: number;
  country_id: number;
  name_ar: string;
  name_en: string;
  slug: string;
  address: string;
  google_maps_url: string;
  latitude: string;
  longitude: string;
  phone: string;
  unified_phone: string;
  social_links: SocialLinks;
}

export interface OfferCategory {
  id: number;
  title: string;
  slug: string;
  cover_image: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_expired: boolean;
  branch: Branch;
}

export interface Offer {
  id: number;
  title: string;
  image: string;
  sort_order: number;
  offer_category: OfferCategory;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface OffersResponse {
  data: Offer[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
