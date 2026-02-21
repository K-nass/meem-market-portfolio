import axiosInstance from "../lib/axios";
import { LocationsResponse } from "../types/locations";

export const locationsService = {
    getLocations: async (): Promise<LocationsResponse> => {
        const response = await axiosInstance.get<LocationsResponse>("/api/v1/countries");
        return response.data;
    },
};