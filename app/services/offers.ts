import axiosInstance from '@/app/lib/axios';
import { OffersResponse } from '@/app/types/offer';

export const offersService = {
  getOffers: async (): Promise<OffersResponse> => {
    const response = await axiosInstance.get<OffersResponse>('/api/v1/offers');
    return response.data;
  },
};
