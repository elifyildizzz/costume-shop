import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sayfa Bulunamadı</h2>
          <p className="text-lg text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            to="/costumes"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Kostümlere Gözat
          </Link>
        </div>
        
        <div className="mt-12">
          <div className="text-6xl mb-4">🎭</div>
          <p className="text-gray-500">
            Belki aradığınız kostüm koleksiyonumuzda vardır!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;