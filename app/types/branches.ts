export interface BranchItem {
    id: number;
    country_id: number;
    name_ar: string;
    name_en: string;
    slug: string;
    address: string;
    google_maps_url: string;
    latitude: string;
    longitude: string;
    phone: string | null;
    unified_phone: string | null;
    social_links: {
        tiktok: string;
        website: string;
        facebook: string;
        snapchat: string;
        whatsapp: string;
        instagram: string;
    };
}

export interface BranchesResponse {
    data: BranchItem[];
}