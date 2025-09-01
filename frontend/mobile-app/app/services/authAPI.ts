import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token storage
apiClient.interceptors.response.use(
  async (response) => {
    // Store token if received in response
    if (response.data.token) {
      await AsyncStorage.setItem('authToken', response.data.token);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored token on 401
      await AsyncStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signIn: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('auth/login', credentials);
    return response.data;
  },
  
  signOut: async () => {
    await AsyncStorage.removeItem('authToken');
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
