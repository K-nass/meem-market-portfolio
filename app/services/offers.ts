import axiosInstance from '@/app/lib/axios';
import { OffersResponse } from '@/app/types/offer';

export const offersService = {
  getOffers: async (params?: { branch_slug?: string; country_slug?: string; category_slug?: string }): Promise<OffersResponse> => {
    const response = await axiosInstance.get<OffersResponse>('/api/v1/offers', { params });
    return response.data;
  },

};