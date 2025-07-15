// src/hooks/useCostume.ts
import { useState, useEffect } from 'react';
import { Costume } from '../types';
import { apiService } from '../services/ApiService';

export const useCostume = (costumeId: string) => {
  const [costume, setCostume] = useState<Costume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCostume = async () => {
    if (!costumeId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCostumeById(costumeId);
      
      if (response.success) {
        setCostume(response.data);
      } else {
        setError(response.message || 'Kostüm bulunamadı');
      }
    } catch (err) {
      setError('Kostüm yüklenirken bir hata oluştu');
      console.error('Error fetching costume:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async (startDate: string, endDate: string) => {
    try {
      const response = await apiService.checkAvailability(costumeId, startDate, endDate);
      return response.success ? response.data.available : false;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  const addReview = async (rating: number, comment: string) => {
    try {
      const response = await apiService.addReview(costumeId, rating, comment);
      if (response.success) {
        // Kostümü yeniden yükle (yorumlar güncellenmiş olacak)
        await fetchCostume();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding review:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchCostume();
  }, [costumeId]);

  return {
    costume,
    loading,
    error,
    checkAvailability,
    addReview,
    refreshCostume: fetchCostume
  };
};