import axiosInstance from "../lib/axios";
import { BranchesResponse } from "../types/branches";

export const branchesService = {
    getBranches: async (): Promise<BranchesResponse> => {
        const response = await axiosInstance.get<BranchesResponse>("/api/v1/branches");
        return response.data;
    },
};