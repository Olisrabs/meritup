"use client";

import Image from "next/image";
import AppHeader from "./AppHeader";

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      {/* ── MOBILE ── */}
      <div className="page-shell">
        <div className="mobile-card">
          <AppHeader />
          <div className="card-content fade-up" style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--brand-light)", color: "var(--brand)", fontSize: 11, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", padding: "5px 12px", borderRadius: 50 }}>
                🚀 Now Accepting Waitlist
              </span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--gray-900)", lineHeight: 1.2, letterSpacing: -0.8, marginBottom: 14 }}>
              Learn Tech Skills.<br />
              <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Earn Real Money.
              </span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.75, marginBottom: 28 }}>
              MeritUp teaches you in-demand tech skills — from coding to digital marketing — and connects you to real income opportunities. Be among the first to get access.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {["Structured tech courses for all levels", "Real earning opportunities as you learn", "Refer friends & win exclusive rewards"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--gray-700)", fontWeight: 500 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <button className="btn-continue btn-continue-full" onClick={onContinue}>
              Secure My Spot
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p style={{ fontSize: 12, color: "var(--gray-400)", textAlign: "center", marginTop: 14 }}>
              Takes less than a minute · 100% Free
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="welcome-desktop fade-up">
        {/* Left panel — gradient background */}
        <div className="welcome-left" style={{ position: "relative", overflow: "hidden" }}>
          {/* Gradient background */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(150deg, #050505 0%, #121212 40%, #1e1e1e 75%, #dfab2e 100%)",
          }} />
          {/* Subtle pattern overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 80%, rgba(223,171,46,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(223,171,46,0.08) 0%, transparent 50%)",
          }} />

          {/* Content sits above overlay */}
          <div className="welcome-left-brand" style={{ position: "relative", zIndex: 1 }}>
            <div className="b-icon-lg">
              <img src="/logo.png" alt="MeritUp Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span className="b-name-lg">MERIT_UP</span>
          </div>

          <div className="welcome-left-hero" style={{ position: "relative", zIndex: 1 }}>
            <h2>Learn Tech.<br />Earn Money.<br />Change Your Life.</h2>
            <p>
              MeritUp is Africa's premier platform for learning high-income tech skills. From web development to digital marketing — we give youths and individuals the tools to build real careers and earn from day one.
            </p>

            <div className="feature-pills" style={{ marginTop: 24 }}>
              {["📚 Structured Courses", "💰 Real Earnings", "🎯 Mentorship", "🏆 Referral Rewards"].map((pill) => (
                <span key={pill} className="feature-pill">{pill}</span>
              ))}
            </div>
          </div>

          <div className="welcome-left-footer" style={{ position: "relative", zIndex: 1 }}>
            <div className="welcome-meta">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                &lt; 1 min to join
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secure & Private
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                100% Free
              </span>
            </div>
          </div>
        </div>

        {/* Right white panel */}
        <div className="welcome-right">
          <div className="welcome-card">
            <div className="wc-eyebrow">
              🎓 Early Access Open
            </div>

            <h1>Be First in Line.</h1>
            <p>
              Join thousands of ambitious individuals ready to transform their lives with tech. Secure your spot now and get priority access when we launch — plus exclusive early-bird perks.
            </p>

            {/* Stats */}
            <div className="wc-stats">
              <div className="wc-stat">
                <div className="wc-stat-num">100+</div>
                <div className="wc-stat-label">Already Waiting</div>
              </div>
              <div className="wc-stat">
                <div className="wc-stat-num">5+</div>
                <div className="wc-stat-label">Tech Tracks</div>
              </div>
              <div className="wc-stat">
                <div className="wc-stat-num">🏆</div>
                <div className="wc-stat-label">Refer and earn</div>
              </div>
            </div>

            <button className="btn-continue" onClick={onContinue} style={{ padding: "15px 32px", fontSize: 15, width: "100%", justifyContent: "center" }}>
              Secure My Spot
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p style={{ fontSize: 12, color: "var(--gray-400)", textAlign: "center", marginTop: 12 }}>
              Free forever · No spam · Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
