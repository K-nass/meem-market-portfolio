export interface Career {
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
}

export interface CareersResponse {
  data: Career[];
}

export interface CareerDetailResponse {
  data: Career;
}
