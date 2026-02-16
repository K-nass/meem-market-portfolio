export interface Location {
  id: string;
  code: 'SA' | 'KW';
  name: {
    en: string;
    ar: string;
  };
  flag?: string;
}

export interface Branch {
  id: string;
  locationId: string;
  name: {
    en: string;
    ar: string;
  };
  address?: {
    en: string;
    ar: string;
  };
  city: {
    en: string;
    ar: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  phone?: string;
  hours?: {
    open: string;
    close: string;
  };
}
