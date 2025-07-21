

import React from 'react';
import { Heart } from 'lucide-react';

interface CostumeCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  colors: string[];
  isFavorite: boolean;
  onFavoriteToggle: (id: number) => void;
  onClick?: (id: number) => void;
}

const CostumeCard: React.FC<CostumeCardProps> = ({
  id,
  name,
  price,
  image,
  colors,
  isFavorite,
  onFavoriteToggle,
  onClick
}) => {
  const getColorDots = (colors: string[]) => {
    const colorMap: { [key: string]: string } = {
      'navy': '#1e3a8a',
      'white': '#ffffff',
      'black': '#000000',
      'lime-green': '#84cc16',
      'beige': '#f5f5dc',
      'gray': '#6b7280',
      'cream': '#f9f9f9',
      'pink': '#ec4899',
      'blue': '#3b82f6',
      'zebra-print': '#000000',
      'striped': '#1f2937'
    };

    return colors.slice(0, 3).map((color, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full border ${
          color === 'white' || color === 'cream' 
            ? 'border-gray-300' 
            : 'border-transparent'
        }`}
        style={{ backgroundColor: colorMap[color] || '#6b7280' }}
        title={color}
      />
    ));
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  return (
    <div 
      className="group relative cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          onError={(e) => {
            // Görsel yüklenemezse placeholder göster
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-costume.jpg';
          }}
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide leading-tight">
          {name}
        </h3>
        <p className="text-lg font-semibold text-gray-900">
          {price}
        </p>
        
        {/* Color Options */}
        {colors.length > 0 && (
          <div className="flex items-center space-x-1">
            {getColorDots(colors)}
            {colors.length > 3 && (
              <span className="text-xs text-gray-500 ml-2">
                +{colors.length - 3} daha
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CostumeCard;