"use client";

import Image from "next/image";
import AppHeader from "./AppHeader";

interface FormShellProps {
  step: number; // 1–5
  totalSteps?: number;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  continueLabel?: string;
}

const checkIcon = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const arrowIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const backIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function FormShell({
  step,
  totalSteps,
  children,
  onBack,
  onNext,
  disabled = false,
  continueLabel = "Continue",
}: FormShellProps) {

  const getStatus = (i: number) => {
    if (i + 1 < step) return "completed";
    if (i + 1 === step) return "active";
    return "pending";
  };

  return (
    <>
      {/* ── MOBILE (hidden ≥768px) ── */}
      <div className="page-shell">
        <div className="mobile-card">
          <AppHeader />
          <div className="card-content fade-up">
            {children}
            <div style={{ height: 24 }} />
          </div>
          <div className="divider" />
          <div className="bottom-nav">
            <button className="btn-back" onClick={onBack}>
              {backIcon} Back
            </button>
            <button className="btn-continue" onClick={onNext} disabled={disabled}>
              {continueLabel} {!disabled && arrowIcon}
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP (hidden ≤767px) ── */}
      <div className="form-desktop fade-up">
        {/* Top bar with brand + step tracker */}
        <div className="fd-topbar">
          <div className="fd-brand">
            <div className="fd-brand-icon">
              <Image src="/logo.png" alt="MeritUp Logo" width={34} height={34} style={{ objectFit: "contain" }} priority />
            </div>
            <span className="fd-brand-name">MERIT_UP</span>
          </div>

          {/* Step tracker — numbered dots only */}
          <div className="fd-tracker">
            {Array.from({ length: totalSteps || 1 }).map((_, i) => {
              const status = getStatus(i);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && (
                    <div className={`fd-dot-line${status === "completed" || (i < step - 1) ? " done" : ""}`} />
                  )}
                  <div className={`fd-dot ${status}`}>
                    {status === "completed" ? checkIcon : i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered card */}
        <div className="fd-body">
          <div className="fd-card">
            <div className="fd-card-inner">
              {children}
            </div>
            <div className="fd-footer">
              <button className="btn-back" onClick={onBack}>
                {backIcon} Back
              </button>
              <button className="btn-continue" onClick={onNext} disabled={disabled}>
                {continueLabel} {!disabled && arrowIcon}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
