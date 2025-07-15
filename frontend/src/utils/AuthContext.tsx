// src/utils/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { apiService } from '../services/ApiService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sayfa yüklendiğinde token kontrolü yap
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await apiService.getUserProfile();
          if (response.success) {
            setUser(response.data);
          } else {
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const result = await apiService.login(email, password);
      if (result.success) {
        setUser(result.data.user);
        localStorage.setItem('authToken', result.data.token);
      } else {
        throw new Error(result.message || 'Giriş yapılırken bir hata oluştu');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      const result = await apiService.register(userData);
      if (result.success) {
        setUser(result.data.user);
        localStorage.setItem('authToken', result.data.token);
      } else {
        throw new Error(result.message || 'Kayıt olurken bir hata oluştu');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    // API logout çağrısını yapmaya gerek yok, sadece client-side temizlik
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      const result = await apiService.updateUserProfile(userData);
      if (result.success) {
        setUser(result.data);
      } else {
        throw new Error(result.message || 'Profil güncellenirken bir hata oluştu');
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};