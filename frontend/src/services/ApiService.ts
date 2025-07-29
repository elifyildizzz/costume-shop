import axios, { AxiosInstance } from 'axios';
import { User, Costume, Order, ApiResponse, PaginatedResponse, RegisterData, LoginResponse, RegisterResponse } from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    this.baseURL = `${API_BASE}/api`;
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - token eklemek için
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - hata yönetimi için
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token geçersizse kullanıcıyı çıkış yap
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth metodları
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.api.post('/auth/login', { email, password });
      console.log('Login API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Giriş yapılırken bir hata oluştu');
      } else if (error.request) {
        throw new Error('Sunucuya bağlanılamıyor. Backend çalışıyor mu?');
      } else {
        throw new Error('Beklenmeyen bir hata oluştu');
      }
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await this.api.post('/auth/register', userData);
      console.log('Register API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Register API error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Kayıt olurken bir hata oluştu');
      } else if (error.request) {
        throw new Error('Sunucuya bağlanılamıyor. Backend çalışıyor mu?');
      } else {
        throw new Error('Beklenmeyen bir hata oluştu');
      }
    }
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    localStorage.removeItem('authToken');
  }

  // Kostüm metodları
  async getCostumes(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
  }): Promise<PaginatedResponse<Costume>> {
    const response = await this.api.get('/costumes', { params });
    return response.data;
  }

  async getCostumeById(id: string): Promise<ApiResponse<Costume>> {
    const response = await this.api.get(`/costumes/${id}`);
    return response.data;
  }

  async getFeaturedCostumes(): Promise<ApiResponse<Costume[]>> {
    const response = await this.api.get('/costumes/featured');
    return response.data;
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    const response = await this.api.get('/costumes/categories');
    return response.data;
  }

  // Sipariş metodları
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Order>> {
    const response = await this.api.post('/orders', orderData);
    return response.data;
  }

  async getOrders(userId: string): Promise<ApiResponse<Order[]>> {
    const response = await this.api.get(`/orders/user/${userId}`);
    return response.data;
  }

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    const response = await this.api.get(`/orders/${id}`);
    return response.data;
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<ApiResponse<Order>> {
    const response = await this.api.patch(`/orders/${id}/status`, { status });
    return response.data;
  }

  // Kullanıcı profil metodları
  async getUserProfile(): Promise<ApiResponse<User>> {
    const response = await this.api.get('/users/profile');
    return response.data;
  }

  async updateUserProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await this.api.patch('/users/profile', userData);
    return response.data;
  }

  // Müsaitlik kontrolü
  async checkAvailability(costumeId: string, startDate: string, endDate: string): Promise<ApiResponse<{ available: boolean }>> {
    const response = await this.api.post('/costumes/check-availability', {
      costumeId,
      startDate,
      endDate
    });
    return response.data;
  }

  // Yorum metodları
  async addReview(costumeId: string, rating: number, comment: string): Promise<ApiResponse<any>> {
    const response = await this.api.post(`/costumes/${costumeId}/reviews`, {
      rating,
      comment
    });
    return response.data;
  }

  async getReviews(costumeId: string): Promise<ApiResponse<any[]>> {
    const response = await this.api.get(`/costumes/${costumeId}/reviews`);
    return response.data;
  }
}

export const apiService = new ApiService();