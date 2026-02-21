export interface CategoryItem {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    start_date: string;
    end_date: string;
}

export interface CategoryResponse {
    data: CategoryItem[];
}