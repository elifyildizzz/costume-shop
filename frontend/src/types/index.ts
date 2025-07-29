export interface User {
  id: number; // Backend'de number olarak geliyor
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface Costume {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  category?: string;
  images?: string[];
  available?: boolean;
  colors?: string[];
  size?: string[];
  // varsa diğer opsiyonel alanlar
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  id: string;
  costume: Costume;
  size: string;
  quantity: number;
  rentalDays: number;
  startDate: string;
  endDate: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}