import axiosInstance from '@/app/lib/axios';
import { CareersResponse, CareerDetailResponse } from '@/app/types/career';

export const careersService = {
  getCareers: async (): Promise<CareersResponse> => {
    const response = await axiosInstance.get<CareersResponse>('/api/v1/careers');
    return response.data;
  },
  
  getCareerBySlug: async (slug: string): Promise<CareerDetailResponse> => {
    const response = await axiosInstance.get<CareerDetailResponse>(`/api/v1/careers/${slug}`);
    return response.data;
  },
};
