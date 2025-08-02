import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export interface Favorite {
  id: number;
  userId: number;
  costumeId?: number;
  accessoryId?: number;
  createdAt: string;
  costume?: any;
  accessory?: any;
}

export class FavoriteService {
  static async getFavorites(token: string): Promise<Favorite[]> {
    const res = await axios.get(`${API_BASE}/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.favorites;
  }

  static async addFavorite({ token, costumeId, accessoryId }: { token: string; costumeId?: number; accessoryId?: number; }) {
    try {
      const res = await axios.post(`${API_BASE}/favorites/add`, { costumeId, accessoryId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.favorite;
    } catch (error) {
      console.error('Favori ekleme hatası:', error);
      throw error;
    }
  }

  static async removeFavorite({ token, costumeId, accessoryId }: { token: string; costumeId?: number; accessoryId?: number; }) {
    try {
      const res = await axios.post(`${API_BASE}/favorites/remove`, { costumeId, accessoryId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      console.error('Favori silme hatası:', error);
      throw error;
    }
  }
}

export default FavoriteService; 