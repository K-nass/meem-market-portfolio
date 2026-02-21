import { BranchItem } from './branches';

export interface CountryItem {
    id: number;
    name_ar: string;
    name_en: string;
    slug: string;
    branches: BranchItem[];
}

export interface LocationsResponse {
    data: CountryItem[];
}
