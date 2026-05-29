// Shared bottom nav bar with Back + Continue buttons
export default function BottomNav({
  onBack,
  onNext,
  disabled = false,
  continueLabel = "Continue",
}: {
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  continueLabel?: string;
}) {
  return (
    <div className="bottom-nav">
      <button className="btn-back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <button
        className="btn-continue"
        onClick={onNext}
        disabled={disabled}
      >
        {continueLabel}
      </button>
    </div>
  );
}
