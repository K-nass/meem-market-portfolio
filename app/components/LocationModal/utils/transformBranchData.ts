import { BranchItem } from '@/app/types/branches';
import { Branch } from '@/app/types/branch';

/**
 * Maps country_id from API to locationId used in the app
 * @param countryId - Country ID from API (1 = Saudi Arabia, 2 = Kuwait)
 * @returns Location ID string
 */
function mapCountryIdToLocationId(countryId: number): string {
  switch (countryId) {
    case 1:
      return 'saudi-arabia';
    case 2:
      return 'kuwait';
    default:
      return 'saudi-arabia';
  }
}

/**
 * Transforms API BranchItem format to internal Branch format
 * @param item - The BranchItem from the API
 * @returns Branch object compatible with LocationModal components
 */
export function transformBranchData(item: BranchItem): Branch {
  // Extract city from name (e.g., "Riyadh - Olaya" -> "Riyadh")
  const cityEn = item.name_en.split(' - ')[0] || item.name_en;
  const cityAr = item.name_ar.split(' - ')[0] || item.name_ar;

  // Map country_id to locationId
  const locationId = mapCountryIdToLocationId(item.country_id);

  // Transform social links, filtering out null/empty values
  const socialLinks = item.social_links ? {
    tiktok: item.social_links.tiktok || undefined,
    website: item.social_links.website || undefined,
    facebook: item.social_links.facebook || undefined,
    snapchat: item.social_links.snapchat || undefined,
    whatsapp: item.social_links.whatsapp || undefined,
    instagram: item.social_links.instagram || undefined,
  } : undefined;

  // Filter out social links object if all values are undefined
  const hasSocialLinks = socialLinks && Object.values(socialLinks).some(link => link !== undefined);

  return {
    id: item.id.toString(),
    locationId: locationId,
    name: {
      en: item.name_en,
      ar: item.name_ar,
    },
    city: {
      en: cityEn,
      ar: cityAr,
    },
    slug: item.slug,
    address: item.address ? {
      en: item.address,
      ar: item.address,
    } : undefined,
    coordinates: item.latitude && item.longitude ? {
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude),
    } : undefined,
    phone: item.phone || item.unified_phone || undefined,
    hours: undefined, // API doesn't provide hours
    socialLinks: hasSocialLinks ? socialLinks : undefined,
    googleMapsUrl: item.google_maps_url || undefined,
  };
}
