export interface BranchItem {
    id: number;
    name_ar: string;
    name_en: string;
    slug: string;
}

export interface BranchesResponse {
    data: BranchItem[];
}