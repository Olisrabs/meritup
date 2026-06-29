"use client";

import { useState } from "react";
import AppHeader from "./AppHeader";

export default function SuccessScreen({
  name,
  isDuplicate,
  referralCode,
  onRestart,
}: {
  name?: string;
  isDuplicate?: boolean;
  referralCode?: string;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const firstName = name ? name.split(" ")[0] : "";
  const greeting = firstName ? `You're in, ${firstName}! 🎉` : "You're in! 🎉";

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://meritup.com";
  const referralLink = referralCode ? `${baseUrl}?ref=${referralCode}` : "";

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select input text
    }
  };

  const handleCopyCode = async () => {
    if (!referralCode) return;
    const writeup = `Join the MeritUp waitlist to learn tech skills and earn money! Use my phone number "${referralCode}" as your referral code when you sign up at: ${baseUrl}`;
    try {
      await navigator.clipboard.writeText(writeup);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
    }
  };

  const content = (
    <>
      <div className="success-icon">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="success-title">{greeting}</h1>
      <p className="success-sub">
        {isDuplicate
          ? "You're already on the waitlist — we love your enthusiasm! We'll notify you the moment MeritUp launches."
          : "We'll notify you the moment we launch. In the meantime, refer friends and earn your way to the top of our leaderboard."}
      </p>

      {/* Referral share box */}
      {referralLink && (
        <div className="referral-share">
          <div className="referral-share-label">Your Referral Link</div>
          <div className="referral-share-title">
            Share your unique link and get rewarded. 🏆
          </div>
          <div className="referral-link-row">
            <input
              readOnly
              className="referral-link-input"
              value={referralLink}
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="referral-share-hint">
            Your code: <strong style={{ color: "var(--brand)" }}>{referralCode}</strong>
            <button 
              onClick={handleCopyCode} 
              style={{
                background: "var(--brand-light)",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                color: "var(--brand)",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "4px",
                marginLeft: "6px",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.15s",
              }}
            >
              {copiedCode ? "✓ Copied Invite!" : "Copy Invite Text"}
            </button>
            <div style={{ marginTop: 6 }}>Every person you refer grant you a reward.</div>
          </div>
        </div>
      )}

      <a 
        href={`https://wa.me/2349124870670?text=${encodeURIComponent(`Hi my name is ${name}! I just joined the MeritUp waitlist. Please add me to the community group!`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-continue" 
        style={{ marginTop: 24, background: "#25D366", color: "#fff", textDecoration: "none", display: "flex", justifyContent: "center" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 8 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        Join our WhatsApp Group
      </a>

      <button className="btn-continue" onClick={onRestart} style={{ marginTop: 12, background: "transparent", color: "var(--gray-500)", border: "1px solid var(--gray-300)" }}>
        Back to Start
      </button>
    </>
  );

  return (
    <>
      {/* Mobile */}
      <div className="page-shell">
        <div className="mobile-card">
          <AppHeader />
          <div className="success-screen fade-up">{content}</div>
        </div>
      </div>

      {/* Desktop */}
      <div className="success-desktop fade-up">
        <div className="success-card">{content}</div>
      </div>
    </>
  );
}
