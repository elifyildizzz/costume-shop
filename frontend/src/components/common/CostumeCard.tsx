// src/components/common/CostumeCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Costume } from '../../data/costumes';

interface CostumeCardProps {
  costume: Costume;
}

const CostumeCard: React.FC<CostumeCardProps> = ({ costume }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={costume.image} 
          alt={costume.name}
          className="w-full h-48 object-cover"
        />
        {costume.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
            YENİ
          </span>
        )}
        {costume.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            -{costume.discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{costume.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{costume.category}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{costume.price}</span>
            {costume.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                {costume.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {costume.rating} ({costume.reviewCount})
            </span>
          </div>
        </div>
        
        <Link 
          to={`/kostum/${costume.id}`}
          className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
};

export default CostumeCard;