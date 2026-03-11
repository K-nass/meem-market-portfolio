import axiosInstance from "../lib/axios";
import { BranchesResponse } from "../types/branches";

export const branchesService = {
    getBranches: async (countryId?: number): Promise<BranchesResponse> => {
        const params = countryId ? { country_id: countryId } : {};
        const response = await axiosInstance.get<BranchesResponse>("/api/v1/branches", { params });
        return response.data;
    },
};