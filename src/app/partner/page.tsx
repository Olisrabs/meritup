"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { PartnerData } from "@/lib/submitSurvey";
import AppHeader from "@/components/AppHeader";

const PartnerForm = dynamic(() => import("@/components/PartnerForm"), {
  ssr: false,
});

const SuccessScreen = dynamic(() => import("@/components/SuccessScreen"), {
  ssr: false,
});

const initial: PartnerData = {
  name: "",
  phone: "",
  email: "",
  handle: "",
  promotion_platform: "",
  audience_size: "",
  audience_makeup: "",
  promoted_before: "",
  bank_name: "",
  account_number: "",
  account_name: "",
};

export default function PartnerPage() {
  const [step, setStep] = useState(0); // 0 = Welcome, 1 = Form, 2 = Success
  const [formData, setFormData] = useState<PartnerData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [myReferralCode, setMyReferralCode] = useState<string>("");

  const update = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { submitPartner } = await import("@/lib/submitSurvey");
      const result = await submitPartner(formData);
      setMyReferralCode(result.myReferralCode);
      next(); // advance to SuccessScreen
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {step === 0 && (
        <>
          {/* ── MOBILE ── */}
          <div className="page-shell">
            <div className="mobile-card">
              <AppHeader />
              <div className="card-content fade-up" style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--brand-light)", color: "var(--brand)", fontSize: 11, fontWeight: 700, letterSpacing: ".6px", textTransform: "uppercase", padding: "5px 12px", borderRadius: 50 }}>
                    🤝 Partner Program
                  </span>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: "var(--gray-900)", lineHeight: 1.2, letterSpacing: -0.8, marginBottom: 14 }}>
                  Promote MeritUp.<br />
                  <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Earn Commissions.
                  </span>
                </h1>
                <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.75, marginBottom: 28 }}>
                  Partner with Africa's premier tech skills platform. Promote MeritUp to your audience and earn money for every successful referral.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {["Exclusive referral codes for your audience", "High conversion rates", "Timely payouts directly to your bank account"].map((item) => (
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

                <button className="btn-continue btn-continue-full" onClick={() => setStep(1)}>
                  Apply Now
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP ── */}
          <div className="welcome-desktop fade-up">
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
                  <img src="/logo.png" alt="MeritUp Logo" width={40} height={40} style={{ objectFit: "contain" }} />
                </div>
                <span className="b-name-lg">MERIT_UP</span>
              </div>

              <div className="welcome-left-hero" style={{ position: "relative", zIndex: 1 }}>
                <h2>Promote MeritUp.<br />Earn Commissions.<br />Grow Together.</h2>
                <p>
                  Partner with Africa's premier platform for learning high-income tech skills. Bring your audience to MeritUp and get rewarded for every single successful student you refer.
                </p>

                <div className="feature-pills" style={{ marginTop: 24 }}>
                  {["🤝 Trusted Platform", "💸 High Conversions", "⚡ Timely Payouts", "📈 Track Referrals"].map((pill) => (
                    <span key={pill} className="feature-pill">{pill}</span>
                  ))}
                </div>
              </div>

              <div className="welcome-left-footer" style={{ position: "relative", zIndex: 1 }}>
                <div className="welcome-meta">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Fast application
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Secure & Private
                  </span>
                </div>
              </div>
            </div>

            {/* Right white panel */}
            <div className="welcome-right">
              <div className="welcome-card">
                <div className="wc-eyebrow">
                  🌟 Applications Open
                </div>

                <h1>Become a Partner.</h1>
                <p>
                  Join our network of ambassadors, content creators, and community leaders. Apply to get your custom referral link today.
                </p>

                {/* Stats */}
                <div className="wc-stats">
                  <div className="wc-stat">
                    <div className="wc-stat-num">50+</div>
                    <div className="wc-stat-label">Active Partners</div>
                  </div>
                  <div className="wc-stat">
                    <div className="wc-stat-num">∞</div>
                    <div className="wc-stat-label">Earning Potential</div>
                  </div>
                </div>

                <button className="btn-continue" onClick={() => setStep(1)} style={{ padding: "15px 32px", fontSize: 15, width: "100%", justifyContent: "center" }}>
                  Apply Now
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 1 && (
        <PartnerForm
          data={formData}
          onChange={update}
          onBack={back}
          submitting={submitting}
          submitError={submitError}
          onNext={handleSubmit}
        />
      )}

      {step === 2 && (
        <SuccessScreen
          name={formData.name}
          isDuplicate={false}
          referralCode={myReferralCode}
          onRestart={() => {
            setFormData(initial);
            setMyReferralCode("");
            setStep(0);
          }}
        />
      )}
    </>
  );
}
