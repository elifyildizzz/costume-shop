import React from 'react';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow flex items-start justify-start" style={{ paddingTop: '4rem', paddingLeft: '8rem' }}>
        <div style={{
          textAlign: 'left',
          padding: '2rem',
          fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            color: '#000',
            marginBottom: '1rem',
            fontFamily: '"Playfair Display", "Georgia", serif'
          }}>
            Galeri
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: '1.6',
            fontFamily: '"Inter", "Segoe UI", -apple-system, sans-serif'
          }}>
            Görüntülerimiz yakında gelecek...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery; 