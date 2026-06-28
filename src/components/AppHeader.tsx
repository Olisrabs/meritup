import Image from "next/image";

// Shared MeritUp app header
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
      <div className="brand-row">
        <div className="brand-icon">
          <Image src="/logo.png" alt="MeritUp Logo" width={32} height={32} style={{ objectFit: "contain" }} priority />
        </div>
        <span className="brand-name">MERIT_UP</span>
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
