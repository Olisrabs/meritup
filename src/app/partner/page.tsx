"use client";

import { useState, useEffect } from "react";
import PartnerForm from "@/components/PartnerForm";
import SuccessScreen from "@/components/SuccessScreen";
import { submitPartner } from "@/lib/submitSurvey";
import type { PartnerData } from "@/lib/submitSurvey";

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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const update = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
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
            <div className="lh-container header-flex">
              <div className="lh-brand header-brand">
                <div className="lh-brand-icon">
                  <img src="/logo.png" alt="MeritUp Logo" width={32} height={32} style={{ objectFit: "contain" }} />
                </div>
                <span className="lh-brand-name">MERIT_UP</span>
              </div>
              <div className="header-actions">
                <button 
                  className="theme-toggle" 
                  onClick={() => setIsDark(!isDark)}
                  title="Toggle Theme"
                >
                  {isDark ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button className="lh-btn" onClick={() => setStep(1)} style={{ background: 'var(--brand)', color: '#000', padding: '10px 24px', borderRadius: 50, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  Apply Now
                </button>
              </div>
            </div>
          </header>

          {/* HERO */}
          <section className="hero-section responsive-section">
            <div className="ls-container max-w-1000 text-center">
              <div className="hero-badge">
                🤝 Partner Program
              </div>
              <h1 className="hero-title text-center mx-auto" style={{ textAlign: 'center', marginBottom: 24, fontSize: 'clamp(36px, 5vw, 56px)' }}>
                Get Paid to Introduce Students to <span style={{ color: 'var(--brand)' }}>Their Breakthrough</span>
              </h1>
              <p className="hero-subtitle text-center mx-auto">
                Partner with MERIT_UP. Share the program. Earn 15% on every student who enrolls through you. No cost to join, no cap on what you can earn.
              </p>
              
              <div className="hero-cta-group mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button className="hero-btn primary-btn" onClick={() => setStep(1)}>
                  Apply to Become a Partner
                </button>
                <span className="hero-micro mt-16" style={{ marginTop: 16 }}>
                  Takes 2 minutes · Review response within 48h
                </span>
              </div>
            </div>
          </section>

          {/* WHAT IS MERIT_UP (Interstitial) */}
          <section className="landing-section responsive-section interstitial">
            <div className="ls-container max-w-800 text-center mx-auto">
              <h2 className="section-title text-center">What is MERIT_UP?</h2>
              <p className="section-subtitle mx-auto">
                MERIT_UP is a 4-month program (3 months for skill, 1 month for framework) teaching young people with weekly mentorship, not just videos. Students go from confused and broke to landing a real tech job using our proven framework.
              </p>
              <div className="insight-box mt-32">
                <p>
                  <span style={{ color: 'var(--brand)', marginRight: 8 }}>💡</span> 
                  You already know people who need this. Now you can get paid for connecting them to it.
                </p>
              </div>
            </div>
          </section>

          {/* STICKY BENEFITS */}
          <section className="landing-section responsive-section sticky-container">
            <div className="ls-container max-w-1000 mx-auto">
              <div className="section-header">
                <div>
                  <span className="eyebrow">A program built to support you</span>
                  <h2 className="section-title text-left">Why Partner With Us?</h2>
                </div>
              </div>

              <div className="cards-wrapper">
                {[
                  { title: "Zero cost to join", desc: "No investment, no inventory, no upfront fee." },
                  { title: "15% commission", desc: "On every referred student who enrolls and pays." },
                  { title: "No ceiling", desc: "Refer 5 students or 500, the math scales the same way." },
                  { title: "Easy to share", desc: "We give you ready-made captions, links, and visuals. You don't write a thing." },
                  { title: "Solve a real problem", desc: "Every student you bring in is someone who actually needs this." }
                ].map((item, idx) => (
                  <div key={idx} className="sticky-card" style={{ top: 100 + (idx * 20) }}>
                    <div className="card-left">
                      <div className="card-num check-icon">✓</div>
                      <h3 className="card-title">{item.title}</h3>
                    </div>
                    <div className="card-right">
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="landing-section responsive-section system-section">
            <div className="ls-container max-w-1000 system-split mx-auto">
              <div className="system-left">
                <h2 className="section-title text-left tight-title">
                  Get started in <br/>
                  <span style={{ color: 'var(--brand)' }}>4 simple steps.</span>
                </h2>
                <div className="insight-box mt-32 border-box">
                  <p>
                    <strong style={{ color: 'var(--brand)' }}>Important:</strong> Commission is paid on <em>enrollment</em>, not just sign-ups. If 50 people click your link but only 5 enroll, you're paid on those 5.
                  </p>
                </div>
              </div>
              
              <div className="system-right">
                {[
                  { t: 'Apply below', d: 'Takes less than 2 minutes to fill out details.' },
                  { t: 'Get approved', d: 'We review publisher applications within 24–48 hours.' },
                  { t: 'Get your tracking link', d: 'Share it with your student audience or youth communities.' },
                  { t: 'Earn 15% commission', d: 'Every time someone signs up and enrolls, you get paid.' }
                ].map((step, i) => (
                  <div key={i} className="step-card column-step">
                    <div className="step-num">{i + 1}</div>
                    <div className="step-content">
                      <div className="step-title">{step.t}</div>
                      <div className="step-desc">{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="landing-section responsive-section cta-section">
            <div className="ls-container max-w-800 mx-auto">
              <div className="cta-card">
                <h2 className="section-title text-center">Ready to Partner?</h2>
                <p className="section-subtitle mx-auto">
                  Join our network of ambassadors, content creators, and community leaders.
                </p>
                <button className="hero-btn primary-btn" onClick={() => setStep(1)}>
                  Apply to Become a Partner
                </button>
                <p className="hero-micro mt-16 text-center">We review every application personally. You'll hear back within 48 hours.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content mx-auto">
              <div className="footer-copy">© {new Date().getFullYear()} MeritUp. All rights reserved.</div>
              <div className="footer-links">
                <span>Terms of Use</span>
                <span>Help Center</span>
              </div>
            </div>
          </footer>

          <style dangerouslySetInnerHTML={{__html: `
            /* Responsive Utility Classes (Reused from WelcomeScreen) */
            .mx-auto { margin-left: auto; margin-right: auto; }
            .header-flex { display: flex; align-items: center; justify-content: space-between; width: 100%; }
            .header-brand { display: flex; align-items: center; gap: 12px; }
            .lh-brand-name { color: var(--text-main); font-size: 20px; font-weight: 900; }
            .header-actions { display: flex; align-items: center; }

            .responsive-section { padding: 120px 24px; border-bottom: 1px solid var(--border-color); }
            .hero-section { overflow: hidden; }
            
            .hero-badge { display: inline-flex; background: var(--bg-panel); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 50px; font-size: 13px; font-weight: 700; color: var(--brand); margin-bottom: 24px; }
            .hero-title { font-weight: 800; color: var(--text-main); line-height: 1.1; letter-spacing: -1px; }
            .hero-subtitle { font-size: 18px; color: var(--text-muted); line-height: 1.6; max-width: 680px; margin-bottom: 40px; }
            
            .hero-cta-group { display: flex; gap: 16px; }
            .hero-btn { padding: 16px 36px; border-radius: 50px; font-weight: 800; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; }
            .primary-btn { background: var(--brand); color: #000; }
            .hero-micro { font-size: 13px; color: var(--text-subtle); }

            .interstitial { background: var(--bg-card); }
            .text-center { text-align: center; }
            .section-title { font-size: clamp(32px, 4vw, 48px); color: var(--text-main); line-height: 1.2; margin-bottom: 24px; }
            .text-left { text-align: left; margin: 8px 0 0; }
            .section-subtitle { font-size: 18px; color: var(--text-muted); line-height: 1.6; }

            .insight-box { background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 24px; padding: 24px; display: inline-block; }
            .insight-box p { font-size: 16px; color: var(--text-main); font-weight: 600; margin: 0; line-height: 1.6; }
            .border-box { border-radius: 16px; text-align: left; display: block; }
            .mt-32 { margin-top: 32px; }

            .sticky-container { background: var(--bg-page); }
            .max-w-1000 { max-width: 1000px; }
            .max-w-800 { max-width: 800px; }
            
            .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px; }
            .eyebrow { font-size: 12px; font-weight: 700; color: var(--brand); text-transform: uppercase; letter-spacing: 1px; }

            .cards-wrapper { display: flex; flex-direction: column; gap: 24px; }
            .sticky-card { position: sticky; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 32px; padding: 40px 48px; display: flex; gap: 40px; box-shadow: 0 -10px 40px rgba(0,0,0,0.1); margin-bottom: 20px; }
            .card-left { flex: 1 1 40%; }
            .card-right { flex: 1 1 60%; background: var(--bg-panel); border-radius: 24px; padding: 32px; display: flex; align-items: center; }
            .card-num { width: 48px; height: 48px; border-radius: 24px; background: var(--bg-panel); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--brand); font-size: 20px; margin-bottom: 24px; }
            .check-icon { font-size: 24px; }
            .card-title { font-size: 24px; font-weight: 700; color: var(--text-main); }
            .card-right p { font-size: 18px; color: var(--text-muted); line-height: 1.6; margin: 0; }

            .system-section { background: var(--bg-card); }
            .system-split { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; }
            .system-left { flex: 1 1 45%; }
            .system-right { flex: 1 1 45%; display: flex; flex-direction: column; gap: 16px; }
            .tight-title { font-size: 40px; line-height: 1.1; margin-bottom: 24px; }
            
            .step-card { padding: 24px; background: var(--bg-panel); border-radius: 16px; border: 1px solid var(--border-color); display: flex; gap: 16px; }
            .column-step { align-items: flex-start; }
            .step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--brand-light); color: var(--brand); display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
            .step-title { font-weight: 700; color: var(--text-main); margin-bottom: 8px; font-size: 16px; }
            .step-desc { color: var(--text-muted); font-size: 14px; line-height: 1.5; }

            .cta-section { background: var(--bg-page); }
            .cta-card { background: var(--bg-card); padding: 60px 40px; border-radius: 32px; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg); text-align: center; }
            .mt-16 { margin-top: 16px; }

            .footer { background: var(--bg-page); border-top: 1px solid var(--border-color); padding: 40px 24px; text-align: center; }
            .footer-content { display: flex; justify-content: space-between; align-items: center; max-width: 1100px; }
            .footer-copy { font-size: 13px; color: var(--text-subtle); }
            .footer-links { display: flex; gap: 24px; font-size: 13px; color: var(--text-muted); }
            .footer-links span { cursor: pointer; }

            /* Media Queries for Mobile */
            @media (max-width: 768px) {
              .responsive-section { padding: 60px 20px; }
              .hero-cta-group { width: 100%; }
              .hero-btn { width: 100%; justify-content: center; }
              
              .section-header { flex-direction: column; gap: 16px; align-items: flex-start; margin-bottom: 32px; }
              .sticky-card { flex-direction: column; padding: 24px; gap: 24px; position: relative; top: auto !important; margin-bottom: 24px; }
              .card-num { margin-bottom: 16px; }
              .card-right { padding: 20px; }
              
              .system-split { flex-direction: column; gap: 32px; }
              .tight-title { font-size: 32px; }
              
              .cta-card { padding: 40px 20px; }
              .section-title { font-size: 28px; }
              
              .footer-content { flex-direction: column; gap: 16px; }
              
              .lh-brand-name { display: none; }
              .lh-btn { padding: 8px 16px; font-size: 12px; }
            }
          `}} />
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
