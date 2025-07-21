export default function FilterSort() {
  return (
    <div className="sort-filter-controls">
      <div className="sort-filter-wrapper">
        <button className="sort-button">
          SIRALA
          <span style={{fontSize: 24, fontWeight: 300, marginLeft: 4}}>+</span>
        </button>
        <button className="filter-button">
          FİLTRE
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} style={{marginLeft: 4}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </div>
    </div>
  );
}