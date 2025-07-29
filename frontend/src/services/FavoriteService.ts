import axios from 'axios';
import { API_URL } from '../config'; // config.ts'ten al

const API_BASE = `${API_URL}/api`;

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
    const res = await axios.post(`${API_BASE}/favorites/add`, { costumeId, accessoryId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.favorite;
  }

  static async removeFavorite({ token, costumeId, accessoryId }: { token: string; costumeId?: number; accessoryId?: number; }) {
    const res = await axios.post(`${API_BASE}/favorites/remove`, { costumeId, accessoryId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
}

export default FavoriteService; 