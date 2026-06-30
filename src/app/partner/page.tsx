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
        <div className="landing-page">
          {/* Header */}
          <header className="landing-header">
            <div className="lh-container">
              <div className="lh-brand">
                <div className="lh-brand-icon">
                  <img src="/logo.png" alt="MeritUp Logo" width={32} height={32} style={{ objectFit: "contain" }} />
                </div>
                <span className="lh-brand-name">MERIT_UP</span>
              </div>
              <button className="lh-btn" onClick={() => setStep(1)}>
                Apply Now
              </button>
            </div>
          </header>

          {/* HERO */}
          <section className="hero-section partner-hero">
            <div className="hero-glow"></div>
            <div className="ls-container" style={{ position: "relative", zIndex: 1 }}>
              <div className="hero-badge">
                🤝 Partner Program
              </div>
              <h1 className="hero-title" style={{ color: "white" }}>
                Get Paid to Introduce Students to Their Breakthrough
              </h1>
              <p className="hero-subtitle" style={{ color: "rgba(255,255,255,0.7)" }}>
                Partner with MERIT_UP. Share the program. Earn 15% on every student who enrolls through you. No cost to join, no cap on what you can earn.
              </p>
              <div className="hero-cta-group">
                <button className="hero-btn" onClick={() => setStep(1)}>
                  Apply to Become a Partner
                </button>
                <span className="hero-microcopy" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Takes 2 minutes · Review response within 48h
                </span>
              </div>
            </div>
          </section>

          {/* WHAT IS MERIT_UP */}
          <section className="landing-section">
            <div className="ls-container">
              <h2 className="section-title">What is MERIT_UP?</h2>
              <p className="section-subtitle">
                MERIT_UP is a 6-month program teaching Nigerian university students copywriting, design, video editing, or social media management, with weekly mentorship, not just videos. Students go from confused and broke to having a real, working income system.
              </p>
              <div className="system-summary-box" style={{ marginTop: 24 }}>
                <p style={{ fontSize: "16px", color: "var(--gray-900)", fontWeight: 600 }}>
                  💡 You already know people who need this. Now you can get paid for connecting them to it.
                </p>
              </div>
            </div>
          </section>

          {/* WHY PARTNER WITH US */}
          <section className="landing-section" style={{ background: "var(--gray-100)" }}>
            <div className="ls-container">
              <h2 className="section-title">Why Partner With Us?</h2>
              <p className="section-subtitle">A program built to support both you and the students you refer.</p>
              
              <div className="quotes-grid">
                <div className="quote-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    background: "rgba(223, 171, 46, 0.08)",
                    border: "1px solid rgba(223, 171, 46, 0.2)",
                    borderRadius: "6px",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand)",
                    fontWeight: "bold",
                    fontSize: "12px",
                    flexShrink: 0
                  }}>✓</div>
                  <div>
                    <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>Zero cost to join</h4>
                    <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>no investment, no inventory, no upfront fee.</p>
                  </div>
                </div>
                <div className="quote-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    background: "rgba(223, 171, 46, 0.08)",
                    border: "1px solid rgba(223, 171, 46, 0.2)",
                    borderRadius: "6px",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand)",
                    fontWeight: "bold",
                    fontSize: "12px",
                    flexShrink: 0
                  }}>✓</div>
                  <div>
                    <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>15% commission</h4>
                    <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>on every referred student who enrolls and pays.</p>
                  </div>
                </div>
                <div className="quote-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    background: "rgba(223, 171, 46, 0.08)",
                    border: "1px solid rgba(223, 171, 46, 0.2)",
                    borderRadius: "6px",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand)",
                    fontWeight: "bold",
                    fontSize: "12px",
                    flexShrink: 0
                  }}>✓</div>
                  <div>
                    <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>No ceiling</h4>
                    <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>refer 5 students or 500, the math scales the same way.</p>
                  </div>
                </div>
                <div className="quote-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    background: "rgba(223, 171, 46, 0.08)",
                    border: "1px solid rgba(223, 171, 46, 0.2)",
                    borderRadius: "6px",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand)",
                    fontWeight: "bold",
                    fontSize: "12px",
                    flexShrink: 0
                  }}>✓</div>
                  <div>
                    <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>Easy to share</h4>
                    <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>we give you ready-made captions, links, and visuals. You don't write a thing.</p>
                  </div>
                </div>
                <div className="quote-card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    background: "rgba(223, 171, 46, 0.08)",
                    border: "1px solid rgba(223, 171, 46, 0.2)",
                    borderRadius: "6px",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--brand)",
                    fontWeight: "bold",
                    fontSize: "12px",
                    flexShrink: 0
                  }}>✓</div>
                  <div>
                    <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>You're solving a real problem</h4>
                    <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>not pushing a random product. Every student you bring in is someone who actually needs this.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="landing-section">
            <div className="ls-container">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Get started in 4 simple steps.</p>

              <div className="system-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot">1</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Apply below</h4>
                    <p className="timeline-desc">Takes less than 2 minutes to fill out details.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot">2</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Get approved</h4>
                    <p className="timeline-desc">We review publisher applications within 24–48 hours.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot">3</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Get your tracking link</h4>
                    <p className="timeline-desc">Share it with your student audience or youth communities.</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot">4</div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">Earn 15% commission</h4>
                    <p className="timeline-desc">Every time someone signs up through your link and enrolls in the paid program, you get paid.</p>
                  </div>
                </div>
              </div>

              <div className="system-summary-box" style={{ background: "rgba(223, 171, 46, 0.08)", border: "1px solid rgba(223, 171, 46, 0.3)" }}>
                <p style={{ fontSize: "13.5px", color: "var(--gray-900)", lineHeight: 1.6, textAlign: "left" }}>
                  <strong>Important:</strong> Commission is paid on <em>enrollment</em>, not just sign-ups. If 50 people click your link but only 5 enroll, you're paid on those 5, but there's no limit on how many of your 50 can convert.
                </p>
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="landing-section" style={{ background: "var(--gray-100)", borderBottom: "none", textAlign: "center" }}>
            <div className="ls-container">
              <h2 className="section-title">Ready to Partner?</h2>
              <p className="section-subtitle">
                Join our network of ambassadors, content creators, and community leaders.
              </p>
              <div className="hero-cta-group" style={{ marginTop: 12 }}>
                <button className="hero-btn" onClick={() => setStep(1)}>
                  Apply to Become a Partner
                </button>
                <span className="hero-microcopy">
                  We review every application personally. You'll hear back within 48 hours.
                </span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)", padding: "30px 24px", textAlign: "center", fontSize: "13px", color: "var(--gray-400)" }}>
            <div className="ls-container">
              <p>© {new Date().getFullYear()} MeritUp. All rights reserved.</p>
            </div>
          </footer>
        </div>
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
          isPartner={true}
        />
      )}
    </>
  );
}
