import axiosInstance from "../lib/axios";
import { CategoryResponse } from "../types/category";

export const categoriesService = {
    getCategories: async (): Promise<CategoryResponse> => {
        const response = await axiosInstance.get<CategoryResponse>("/api/v1/offer-categories");
        return response.data;
    },
};