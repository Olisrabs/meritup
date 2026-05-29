// Shared Tenvore app header — no network icons, clean status bar
export default function AppHeader({
  showBack = false,
  onBack,
}: {
  showBack?: boolean;
  onBack?: () => void;
}) {
  return (
    <div className="app-header">

      {/* Brand */}
      <div className="brand-row ">
        <div className="brand-icon">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L3 7v11h4v-6h6v6h4V7L10 2z" fill="white" />
          </svg>
        </div>
        <span className="brand-name">Tenvore</span>
      </div>

      {/* Optional back arrow */}
      {showBack && onBack && (
        <button className="back-btn" onClick={onBack} aria-label="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}
