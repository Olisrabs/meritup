"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FAQItem {
  q: string;
  a: string;
}

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 46, hours: 14, minutes: 23, seconds: 59 });

  const pad = (n: number) => {
    return n < 10 ? "0" + n : "" + n;
  };

  useEffect(() => {
    const TARGET_DATE = new Date("2026-08-16T00:00:00Z");
    
    const updateTimer = () => {
      const difference = +TARGET_DATE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing-page">
      {/* Sticky Header */}
      <header className="landing-header">
        <div className="lh-container header-flex">
          <div className="lh-brand header-brand">
            <div className="lh-brand-icon">
              <Image src="/logo.png" alt="MeritUp Logo" width={32} height={32} style={{ objectFit: "contain" }} priority />
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
            <button className="lh-btn" onClick={onContinue}>
              Secure My Spot
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="hero-section responsive-section">
        <div className="ls-container hero-split">
          
          {/* Left Column */}
          <div className="hero-left">
            <div className="hero-badge" suppressHydrationWarning>
              🚀 Cohort 1: 200 Spots Only | {pad(timeLeft.days)}:{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </div>
            <h1 className="hero-title">
              You Don't Need Another Skill.<br />
              <span style={{ color: 'var(--brand)' }}>You Need Someone to Walk You There.</span>
            </h1>
            <p className="hero-subtitle">
              A clear, step-by-step path from zero to your <strong style={{ color: 'var(--text-main)' }}>first tech job using our proven framework</strong> for young people who are tired of starting over.
            </p>
            
            <div className="hero-cta-group">
              <button className="hero-btn primary-btn" onClick={onContinue}>
                Secure My Spot
                <span className="btn-arrow">→</span>
              </button>
              <button className="hero-btn secondary-btn" onClick={onContinue}>
                Learn More
              </button>
            </div>
            <div className="hero-micro">
              Takes 60 seconds · Cohort 1: 200 spots only
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 2: INTERSTITIAL */}
      <section className="landing-section responsive-section interstitial">
        <div className="ls-container text-center">
          <h2 className="section-title">
            You've Tried Before. <span className="highlight-pill">That's Not</span> The Problem.
          </h2>
          <p className="section-subtitle">
            You bought the course. You watched the videos. Then life happened: exams, no data, no clients... That's not a "you" problem. That's what happens when someone hands you information and walks away.
          </p>
        </div>
      </section>

      {/* SECTION 3: SKILLS WE'RE OFFERING */}
      <section className="landing-section responsive-section skills-section">
        <div className="ls-container max-w-1000">
          <div className="text-center mb-48">
            <span className="eyebrow">Skills We're Offering</span>
            <h2 className="section-title">Pick Your Path to Independence</h2>
            <p className="section-subtitle">
              We teach high-income skills that businesses are actively paying for right now, paired with weekly mentorship so you never get stuck.
            </p>
          </div>

          <div className="skills-grid">
            {[
              { title: "Affiliate Marketing", desc: "Learn to promote high-value digital products and earn commissions on every sale you generate.", icon: "💸" },
              { title: "Social Media Management", desc: "Master the art of growing brands, managing online communities, and creating content that drives results.", icon: "📱" },
              { title: "Video Editing", desc: "Turn raw footage into highly engaging short-form and long-form video content that commands attention.", icon: "🎬" },
              { title: "Graphic Design", desc: "Create stunning, high-converting visual designs, brand identity assets, and marketing materials.", icon: "🎨" },
              { title: "Web Development", desc: "Build responsive, lightning-fast websites and web applications using modern programming tools.", icon: "💻" }
            ].map((skill, idx) => (
              <div key={idx} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-desc">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STICKY CARDS */}
      <section className="landing-section responsive-section sticky-container">
        <div className="ls-container max-w-1000">
          <div className="section-header">
            <div>
              <span className="eyebrow">If this sounds like you</span>
              <h2 className="section-title text-left">Are you Temi?</h2>
            </div>
            <button className="link-btn" onClick={onContinue}>
              Skip to Waitlist →
            </button>
          </div>

          <div className="cards-wrapper">
            {[
              { title: "Watching Your Mates", desc: "Somehow 'making it' online while you're still figuring out where to start." },
              { title: "Asking For Money", desc: "Asking for money you know they don't really have to spare." },
              { title: "Starting, Not Finishing", desc: "Not because you're lazy, but because nobody gave you a reliable map." },
              { title: "The Quiet Fear", desc: "That quiet fear: 'Maybe I'm just not built for this.' (Spoiler: You are)." }
            ].map((item, idx) => (
              <div key={idx} className="sticky-card" style={{ top: 100 + (idx * 20) }}>
                <div className="card-left">
                  <div className="card-num">0{idx + 1}</div>
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

      {/* SECTION 5: THE SYSTEM */}
      <section className="landing-section responsive-section system-section">
        <div className="ls-container max-w-1000 system-split">
          <div className="system-left">
            <h2 className="section-title text-left tight-title">
              One Skill. <br/>
              <span style={{ color: 'var(--brand)' }}>One System.</span> <br/>
              One Mentor.
            </h2>
            <p className="system-desc">
              No information dumping. No disappearing after you pay. Just a clear next step, every single week, until you've landed your first tech job using our proven framework.
            </p>
            <div className="badges-row">
              <div className="sys-badge">📅 4 Months Total (3mo skill, 1mo framework)</div>
              <div className="sys-badge">🤝 Weekly Mentorship</div>
            </div>
          </div>
          
          <div className="system-right">
            {['Clarify Your Direction', 'Build Your Foundation', 'Master The Framework', 'Land Your First Job'].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{i + 1}</div>
                <div className="step-text">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* SECTION 6: FINAL CTA */}
      <section className="landing-section responsive-section cta-section">
        <div className="ls-container max-w-800">
          <div className="cta-card">
            <h2 className="section-title text-center">Cohort 1 Is 200 Spots. That's It.</h2>
            <p className="section-subtitle">
              This isn't fake urgency, it's capacity. Weekly mentorship only works if mentors aren't stretched across thousands of students. The first 200 students get the most attention and the best version of this offer we'll ever run.
            </p>
            <button className="hero-btn primary-btn" onClick={onContinue}>
              Secure My Spot: Cohort 1 (200 spots)
            </button>
            <p className="hero-micro text-center mt-16">Free to join · No spam · Founded by Anwo Favour Oluwaseun</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-copy" suppressHydrationWarning>© {new Date().getFullYear()} MeritUp. All rights reserved.</div>
          <div className="footer-links">
            <span>Terms of Use</span>
            <span>Help Center</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        /* Responsive Utility Classes */
        .header-flex { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .header-brand { display: flex; align-items: center; gap: 12px; }
        .lh-brand-name { color: var(--text-main); font-size: 20px; font-weight: 900; }
        .header-actions { display: flex; align-items: center; }

        .responsive-section { padding: 120px 24px; border-bottom: 1px solid var(--border-color); }
        .hero-section { overflow: hidden; }
        
        .hero-split { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; max-width: 1200px; margin: 0 auto; justify-content: center; }
        .hero-left { flex: 1 1 100%; display: flex; flex-direction: column; align-items: center; text-align: center; }
        
        .hero-badge { display: inline-flex; background: var(--bg-panel); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; color: var(--brand); margin-bottom: 24px; }
        .hero-title { font-size: clamp(36px, 5vw, 64px); font-weight: 800; color: var(--text-main); line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 24px; text-align: center; }
        .hero-subtitle { font-size: 17px; color: var(--text-muted); line-height: 1.6; max-width: 600px; margin-bottom: 40px; text-align: center; }
        
        .hero-cta-group { display: flex; gap: 16px; align-items: center; justify-content: center; }
        .hero-btn { padding: 16px 32px; border-radius: 50px; font-weight: 800; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; }
        .primary-btn { background: var(--brand); color: #000; }
        .secondary-btn { background: transparent; color: var(--text-main); border: 1px solid var(--border-color); }
        .btn-arrow { color: inherit; font-size: 18px; margin-left: 6px; display: inline-block; transition: transform 0.2s; }
        .primary-btn:hover .btn-arrow { transform: translateX(4px); }
        .hero-micro { margin-top: 24px; font-size: 13px; color: var(--text-subtle); }

        .marquee-container { height: 500px; overflow: hidden; display: flex; gap: 20px; justify-content: center; }
        .marquee-col { display: flex; flex-direction: column; gap: 20px; }
        .mockup-card { width: 220px; height: 280px; background: var(--bg-panel); border-radius: 24px; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; padding: 16px; }

        .interstitial { background: var(--bg-card); }
        .text-center { text-align: center; margin: 0 auto; }
        .mb-48 { margin-bottom: 48px; }
        .highlight-pill { background: var(--brand); color: #000; padding: 4px 12px; border-radius: 8px; display: inline-block; }
        .section-title { font-size: clamp(32px, 4vw, 48px); color: var(--text-main); line-height: 1.2; margin-bottom: 24px; }
        .text-left { text-align: left; margin: 8px 0 0; }
        .section-subtitle { font-size: 18px; color: var(--text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }

        /* Skills Grid Styles */
        .skills-section { background: var(--bg-page); }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; width: 100%; margin-top: 32px; }
        .skill-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 24px; padding: 32px; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 12px; text-align: left; }
        .skill-card:hover { transform: translateY(-4px); border-color: var(--brand); box-shadow: var(--shadow-brand); }
        .skill-icon { font-size: 32px; margin-bottom: 8px; }
        .skill-title { font-size: 20px; font-weight: 700; color: var(--text-main); }
        .skill-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

        .sticky-container { background: var(--bg-page); }
        .max-w-1000 { max-width: 1000px; margin: 0 auto; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px; }
        .eyebrow { font-size: 12px; font-weight: 700; color: var(--brand); text-transform: uppercase; letter-spacing: 1px; }
        .link-btn { color: var(--brand); background: transparent; border: none; font-size: 16px; font-weight: 600; cursor: pointer; }

        .cards-wrapper { display: flex; flex-direction: column; gap: 24px; }
        .sticky-card { position: sticky; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 32px; padding: 40px 48px; display: flex; gap: 40px; box-shadow: 0 -10px 40px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .card-left { flex: 1 1 40%; }
        .card-right { flex: 1 1 60%; background: var(--bg-panel); border-radius: 24px; padding: 32px; display: flex; align-items: center; }
        .card-num { width: 48px; height: 48px; border-radius: 24px; background: var(--bg-panel); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--brand); font-size: 20px; margin-bottom: 24px; }
        .card-title { font-size: 24px; font-weight: 700; color: var(--text-main); }
        .card-right p { font-size: 18px; color: var(--text-muted); line-height: 1.6; margin: 0; }

        .system-section { background: var(--bg-card); }
        .system-split { display: flex; flex-wrap: wrap; gap: 60px; align-items: center; }
        .system-left { flex: 1 1 45%; }
        .system-right { flex: 1 1 45%; display: flex; flex-direction: column; gap: 16px; }
        .tight-title { font-size: 40px; line-height: 1.1; margin-bottom: 24px; }
        .system-desc { font-size: 16px; color: var(--text-muted); line-height: 1.6; }
        .badges-row { margin-top: 32px; display: flex; flex-wrap: wrap; gap: 12px; }
        .sys-badge { background: var(--bg-panel); border: 1px solid var(--border-color); padding: 12px 20px; border-radius: 50px; font-size: 13px; color: var(--text-main); font-weight: 600; }
        .step-card { padding: 20px; background: var(--bg-panel); border-radius: 16px; border: 1px solid var(--border-color); display: flex; align-items: center; gap: 16px; }
        .step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--brand-light); color: var(--brand); display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
        .step-text { font-weight: 600; color: var(--text-main); }

        .cta-section { background: var(--bg-page); }
        .max-w-800 { max-width: 800px; margin: 0 auto; }
        .cta-card { background: var(--bg-card); padding: 60px 40px; border-radius: 32px; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg); text-align: center; }
        .mt-16 { margin-top: 16px; }

        .footer { background: var(--bg-page); border-top: 1px solid var(--border-color); padding: 40px 24px; text-align: center; }
        .footer-content { display: flex; justify-content: space-between; align-items: center; max-width: 1100px; margin: 0 auto; }
        .footer-copy { font-size: 13px; color: var(--text-subtle); }
        .footer-links { display: flex; gap: 24px; font-size: 13px; color: var(--text-muted); }
        .footer-links span { cursor: pointer; }

        /* Media Queries for Mobile */
        @media (max-width: 768px) {
          .responsive-section { padding: 60px 20px; }
          .hero-split { flex-direction: column; text-align: center; gap: 32px; }
          .hero-left { text-align: center; width: 100%; }
          .hero-title, .hero-subtitle { text-align: center !important; margin-left: auto; margin-right: auto; }
          .hero-cta-group { flex-direction: column; width: 100%; }
          .hero-btn { width: 100%; justify-content: center; }
          .marquee-container { height: 300px; }
          .mockup-card { width: 160px; height: 200px; }
          
          .section-header { flex-direction: column; gap: 16px; align-items: flex-start; margin-bottom: 32px; }
          .sticky-card { flex-direction: column; padding: 24px; gap: 24px; position: relative; top: auto !important; margin-bottom: 24px; }
          .card-num { margin-bottom: 16px; }
          .card-right { padding: 20px; }
          
          .system-split { flex-direction: column; gap: 32px; }
          .tight-title { font-size: 32px; }
          
          .cta-card { padding: 40px 20px; }
          .section-title { font-size: 28px; }
          
          .footer-content { flex-direction: column; gap: 16px; }
          
          .lh-brand-name { display: none; } /* hide text on very small screens to fit buttons */
          .lh-btn { padding: 8px 16px; font-size: 12px; }
        }
      `}} />
    </div>
  );
}
