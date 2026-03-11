import { CountryItem } from '@/app/types/locations';
import { Location } from '@/app/types/branch';

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
 * Maps country slug to country code for flag images
 * @param slug - Country slug from API (e.g., 'saudi-arabia', 'kuwait')
 * @returns Country code (e.g., 'sa', 'kw')
 */
function mapSlugToCountryCode(slug: string): string {
  const slugMap: Record<string, string> = {
    'saudi-arabia': 'sa',
    'kuwait': 'kw',
  };
  return slugMap[slug.toLowerCase()] || 'sa';
}

/**
 * Transforms API CountryItem format to internal Location format
 * @param item - The CountryItem from the API
 * @returns Location object compatible with application components
 */
export function transformLocationData(item: CountryItem): Location {
  const countryCode = mapSlugToCountryCode(item.slug);
  
  return {
    id: mapCountryIdToLocationId(item.id),
    code: countryCode.toUpperCase() as 'SA' | 'KW',
    name: {
      en: item.name_en,
      ar: item.name_ar,
    },
    flag: `/${countryCode}.png`,
  };
}
