import aksesuarData from '../data/Accessories.json';
import React, { useState } from 'react';

const sortOptions = [
  { value: 'recommended', label: 'Önerilen' },
  { value: 'newest', label: 'En Yeniler' },
  { value: 'price-low', label: 'En düşük fiyat' },
  { value: 'price-high', label: 'En Yüksek Fiyat' },
];

const allColors = Array.from(new Set((aksesuarData.aksesuarlar as { colors: string[] }[]).flatMap(c => c.colors)));
const allSizes = Array.from(new Set((aksesuarData.aksesuarlar as { size: string[] }[]).flatMap(c => c.size || [])));

function parsePrice(priceStr: string) {
  return parseFloat(priceStr.replace(' TL', '').replace('.', '').replace(',', '.'));
}

export default function Aksesuarlar() {
  const [showFilter, setShowFilter] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Sıralama
  let sortedAksesuarlar = [...aksesuarData.aksesuarlar];
  if (selectedSort === 'price-low') {
    sortedAksesuarlar.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (selectedSort === 'price-high') {
    sortedAksesuarlar.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (selectedSort === 'newest') {
    sortedAksesuarlar.sort((a, b) => b.id - a.id);
  }

  // Filtrelenmiş ürünler
  const filteredAksesuarlar = sortedAksesuarlar.filter(c => {
    const priceNum = Number(c.price.replace(/[^\d,]/g, '').replace(',', '.'));
    const priceMatch = priceNum >= minPrice && priceNum <= maxPrice;
    const colorMatch = selectedColors.length === 0 || c.colors.some(color => selectedColors.includes(color));
    const sizeMatch = selectedSizes.length === 0 || (c.size && c.size.some(size => selectedSizes.includes(size)));
    return priceMatch && colorMatch && sizeMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* SIRALA ve FİLTRE barı */}
      <div className="newcostumes-bar">
        <div className="newcostumes-bar-inner">
          <button onClick={() => setSortOpen((v) => !v)}>
            SIRALA
            <span style={{fontSize: 24, fontWeight: 300, marginLeft: 4}}>+</span>
          </button>
          <button onClick={() => setShowFilter(true)}>
            FİLTRE
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{marginLeft: 4}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
        {sortOpen && (
          <div className="newcostumes-sort-dropdown">
            {sortOptions.map((option, idx) => (
              <div
                key={option.value}
                className={`sort-dropdown-option${selectedSort === option.value ? ' selected' : ''}`}
                style={{ borderTop: idx === 0 ? 'none' : '2px solid #222' }}
                onClick={() => { setSelectedSort(option.value); setSortOpen(false); }}
              >
                <span className="sort-radio-outer">
                  <span className={`sort-radio-inner${selectedSort === option.value ? ' checked' : ''}`}></span>
                </span>
                <span className="sort-label">{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Filtre Paneli */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="filter-modal-panel">
            <button onClick={() => setShowFilter(false)} style={{position: 'absolute', right: 32, top: 32, fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#222'}}>&times;</button>
            <h2 className="filter-modal-title">FİLTRE</h2>
            {/* Fiyat Aralığı */}
            <div className="filter-section">
              <span className="filter-section-label">FİYAT ARALIĞI</span>
              <div className="filter-range-row">
                <input type="number" value={minPrice} min={0} max={maxPrice} onChange={e => setMinPrice(Number(e.target.value))} className="filter-range-input" />
                <span className="mx-2 text-gray-500">-</span>
                <input type="number" value={maxPrice} min={minPrice} max={5000} onChange={e => setMaxPrice(Number(e.target.value))} className="filter-range-input" />
              </div>
              <input
                type="range"
                min={0}
                max={5000}
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                className="filter-slider"
              />
            </div>
            {/* Renk */}
            <div className="filter-section">
              <span className="filter-section-label">RENK</span>
              <div className="filter-checkbox-row">
                {allColors.map((color: string) => (
                  <label key={color} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() =>
                        setSelectedColors(selectedColors.includes(color)
                          ? selectedColors.filter((c: string) => c !== color)
                          : [...selectedColors, color])
                      }
                    />
                    <span>{color}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Beden */}
            <div className="filter-section">
              <span className="filter-section-label">BEDEN</span>
              <div className="filter-checkbox-row">
                {allSizes.map((size: string) => (
                  <label key={size} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() =>
                        setSelectedSizes(selectedSizes.includes(size)
                          ? selectedSizes.filter((s: string) => s !== size)
                          : [...selectedSizes, size])
                      }
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-modal-btn-row">
              <button onClick={() => setShowFilter(false)} className="filter-modal-btn close">Kapat</button>
              <button onClick={() => { setMinPrice(0); setMaxPrice(5000); setSelectedColors([]); setSelectedSizes([]); }} className="filter-modal-btn clear">Temizle</button>
            </div>
          </div>
        </div>
      )}
      {/* Ürün Grid */}
      <div className="newcostumes-grid">
        {filteredAksesuarlar.map((aksesuar: any) => (
          <div key={aksesuar.id} className="newcostumes-card" style={{position: 'relative'}}>
            <div className="newcostumes-image-container">
              <img src={aksesuar.image} alt={aksesuar.name} />
            </div>
            <div className="newcostumes-info">
              <div className="text-black text-base font-normal leading-tight">{aksesuar.name}</div>
              <div className="text-black text-lg font-bold">{aksesuar.price}</div>
              {/* Bedenler */}
              <div className="beden-row">
                {aksesuar.size && aksesuar.size.length > 0 ? (
                  (aksesuar.size as string[]).map((size: string, idx: number) => (
                    <span key={idx} className="text-xs text-gray-700 border border-gray-300 rounded px-1 mr-1">{size}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 ml-1">Beden seç</span>
                )}
              </div>
            </div>
            <span style={{position: 'absolute', right: 12, bottom: 12}}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 