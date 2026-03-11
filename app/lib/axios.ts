import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Server-side: use the external API directly
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.meem-market.com';
  }
  // Client-side: use relative URL to leverage Next.js rewrites
  return '';
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
