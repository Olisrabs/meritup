"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQItem {
  q: string;
  a: string;
}

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      q: "How do I know this isn't a scam?",
      a: "We're not asking for program payment yet. Joining the waitlist is free. You'll get full details before any commitment, and every step is communicated directly, not hidden behind vague promises.",
    },
    {
      q: "I don't have money to start.",
      a: "The waitlist itself is free. Pricing details (and how payment is structured) will be shared with waitlist members first, before public announcement, so you have time to plan.",
    },
    {
      q: "I'm a student, I don't have time.",
      a: "The program is built around a realistic 3-month learn, 3-month earn structure, with weekly (not daily) mentor sessions designed to fit around lectures and exams.",
    },
    {
      q: "How long until I actually see results?",
      a: "Most students start building their income system within the first 3 months and move into real earning by month 4–6, depending on consistency.",
    },
    {
      q: "What if I start and don't finish, like before?",
      a: "This is exactly the gap we built MeritUp to close. Weekly accountability check-ins mean you're never left to disappear quietly. Someone notices if you stop.",
    },
  ];

  return (
    <div className="landing-page">
      {/* Sticky Header */}
      <header className="landing-header">
        <div className="lh-container">
          <div className="lh-brand">
            <div className="lh-brand-icon">
              <Image src="/logo.png" alt="MeritUp Logo" width={32} height={32} style={{ objectFit: "contain" }} priority />
            </div>
            <span className="lh-brand-name">MERIT_UP</span>
          </div>
          <button className="lh-btn" onClick={onContinue}>
            Secure My Spot
          </button>
        </div>
      </header>

      {/* SECTION 1: HERO */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="ls-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-badge">
            🚀 Cohort 1: 200 Spots Only
          </div>
          <h1 className="hero-title">
            You Don't Need Another Skill.<br />
            <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              You Need Someone to Walk You There.
            </span>
          </h1>
          <p className="hero-subtitle">
            A clear, step-by-step path from zero to your first income online for Nigerian university students who are tired of starting over.
          </p>
          <div className="hero-cta-group">
            <button className="hero-btn" onClick={onContinue}>
              Secure My Spot
            </button>
            <span className="hero-microcopy">
              Takes 60 seconds · Cohort 1: 200 spots only
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE TRUTH NOBODY TELLS YOU */}
      <section className="landing-section agitation-section">
        <div className="ls-container">
          <h2 className="section-title">You've Tried Before. That's Not the Problem.</h2>
          <p className="section-subtitle" style={{ marginBottom: 24 }}>
            You bought the course. You watched the videos. You even finished a few modules.
            Then life happened: exams, no data, no clients, no clue what to do <em>next</em>, and the course sat there, unfinished, another tab closed forever.
          </p>
          <p style={{ textAlign: "center", fontSize: "15px", color: "var(--gray-500)", marginBottom: 32 }}>
            That's not a "you" problem. That's what happens when someone hands you information and walks away.
          </p>

          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--gray-900)", marginBottom: 20, textAlign: "center" }}>
            Here's what we kept hearing, over and over, from students just like you:
          </h3>

          <div className="quotes-grid">
            <div className="quote-card">
              <p className="quote-text">"I paid for two courses last year and didn't finish or implement them."</p>
            </div>
            <div className="quote-card">
              <p className="quote-text">"I have my page ready but nobody has purchased anything."</p>
            </div>
            <div className="quote-card">
              <p className="quote-text">"I learned the skill for 6 months, still no jobs."</p>
            </div>
            <div className="quote-card">
              <p className="quote-text">"I don't have the money to start, but I have the ideas."</p>
            </div>
          </div>

          <p style={{ fontSize: "16px", color: "var(--gray-900)", fontWeight: 600, textAlign: "center", marginTop: 32, lineHeight: 1.6 }}>
            None of these students lacked intelligence or effort. They lacked a <span style={{ color: "var(--brand)" }}>system</span> and someone checking in to make sure they actually moved.
          </p>
        </div>
      </section>

      {/* SECTION 3: ARE YOU TEMI? */}
      <section className="landing-section">
        <div className="ls-container">
          <h2 className="section-title">If This Sounds Like You, You're Not Alone.</h2>
          <p className="section-subtitle">
            You're 19–22. You're in university. You're smart, genuinely, but you're tired of:
          </p>

          <div className="temi-card">
            <div className="temi-intro">Are you Temi?</div>
            <div className="temi-list">
              <div className="temi-item">
                <span className="temi-icon">⚠️</span>
                <span>Watching your mates somehow "make it" online while you're still figuring out where to start</span>
              </div>
              <div className="temi-item">
                <span className="temi-icon">⚠️</span>
                <span>Asking your parents for money you know they don't really have to spare</span>
              </div>
              <div className="temi-item">
                <span className="temi-icon">⚠️</span>
                <span>Starting things and not finishing, not because you're lazy, but because nobody gave you a map</span>
              </div>
              <div className="temi-item">
                <span className="temi-icon">⚠️</span>
                <span>That quiet fear: <em>"Maybe I'm just not built for this."</em></span>
              </div>
            </div>
            <p style={{ fontSize: "15px", color: "var(--gray-900)", fontWeight: 600, borderTop: "1px solid var(--gray-200)", paddingTop: 20, marginTop: 10 }}>
              You're not. You were never given a clear path. That's what's different here.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE MERIT_UP SYSTEM */}
      <section className="landing-section" style={{ background: "var(--gray-100)" }}>
        <div className="ls-container">
          <h2 className="section-title">One Skill. One System. One Mentor With You Every Week.</h2>
          <p className="section-subtitle">
            No information dumping. No disappearing after you pay. Just a clear next step, every single week, until you've made your first income online.
          </p>

          <div className="system-timeline">
            <div className="timeline-item">
              <div className="timeline-dot">1</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Clarify Your Direction</h4>
                <p className="timeline-desc">Define what you're actually building toward, so you're not guessing.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot">2</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Build Your Foundation</h4>
                <p className="timeline-desc">Learn the one skill (copywriting, design, video editing, or social media management) the right way, from someone who's done it.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot">3</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Create Your Income System</h4>
                <p className="timeline-desc">Set up a simple, repeatable way to actually get paid, not just a certificate.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot">4</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Grow With Strategy</h4>
                <p className="timeline-desc">Attract real clients and opportunities, with guidance, not guesswork.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot">5</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Sustain Your Freedom</h4>
                <p className="timeline-desc">Build the habits that keep the income coming after the program ends.</p>
              </div>
            </div>
          </div>

          <div className="system-summary-box">
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--brand)", marginBottom: 6 }}>
              📅 Program Timeline: 6 Months Total
            </h4>
            <p style={{ fontSize: "14px", color: "var(--gray-900)", lineHeight: 1.5 }}>
              <strong>3 months to learn. 3 months to earn.</strong> Realistic. Honest. Achievable.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY THE WAITLIST MATTERS */}
      <section className="landing-section">
        <div className="ls-container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Cohort 1 Is 200 Spots. That's It.</h2>
          <p className="section-subtitle">
            This isn't fake urgency, it's capacity. Weekly mentorship only works if mentors aren't stretched across thousands of students. The first 200 students get the most attention, the most access, and the best version of this offer we'll ever run.
          </p>
          <div className="system-summary-box" style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", marginBottom: 36 }}>
            <p style={{ fontSize: "15px", color: "#f87171", fontWeight: 600 }}>
              ⚠️ Every day you wait is a day someone else takes the seat that could've been yours.
            </p>
          </div>
          <button className="hero-btn" onClick={onContinue}>
            Join the Waitlist Now
          </button>
        </div>
      </section>

      {/* SECTION 6: WHAT HAPPENS NEXT */}
      <section className="landing-section" style={{ background: "var(--gray-100)" }}>
        <div className="ls-container">
          <h2 className="section-title">No Confusion About What Comes Next Either.</h2>
          <p className="section-subtitle">Here is exactly what you can expect when you sign up today:</p>

          <div className="quotes-grid">
            <div className="quote-card" style={{ display: "flex", gap: 16 }}>
              <div style={{ fontSize: "24px", color: "var(--brand)", fontWeight: 800 }}>1</div>
              <div>
                <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>You'll get a personal message</h4>
                <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>from our team, a real human, not a bot.</p>
              </div>
            </div>
            <div className="quote-card" style={{ display: "flex", gap: 16 }}>
              <div style={{ fontSize: "24px", color: "var(--brand)", fontWeight: 800 }}>2</div>
              <div>
                <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>You'll know exactly what to expect</h4>
                <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>clear next steps and program updates.</p>
              </div>
            </div>
            <div className="quote-card" style={{ display: "flex", gap: 16 }}>
              <div style={{ fontSize: "24px", color: "var(--brand)", fontWeight: 800 }}>3</div>
              <div>
                <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>You'll join a community</h4>
                <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>of students on the same journey, not alone in a group chat.</p>
              </div>
            </div>
            <div className="quote-card" style={{ display: "flex", gap: 16 }}>
              <div style={{ fontSize: "24px", color: "var(--brand)", fontWeight: 800 }}>4</div>
              <div>
                <h4 style={{ color: "var(--gray-900)", fontSize: "15px", fontWeight: 700, marginBottom: 4 }}>You'll start your income journey</h4>
                <p style={{ fontSize: "13.5px", color: "var(--gray-500)", lineHeight: 1.5 }}>with structure, mentorship, and accountability, not just a video library.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="landing-section">
        <div className="ls-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Got questions? We've got answers.</p>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
                  <div className="faq-q">
                    <span>{faq.q}</span>
                    <span className="faq-q-icon" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      ▼
                    </span>
                  </div>
                  {isOpen && <div className="faq-a">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="landing-section" style={{ background: "var(--gray-100)", borderBottom: "none", textAlign: "center" }}>
        <div className="ls-container">
          <h2 className="section-title">You Don't Need Luck. You Need a System.</h2>
          <p className="section-subtitle">
            MeritUp gives you the map. You take the action.
          </p>
          <div className="hero-cta-group" style={{ marginTop: 12 }}>
            <button className="hero-btn" onClick={onContinue}>
              Secure My Spot: Cohort 1 (200 spots)
            </button>
            <span className="hero-microcopy">
              Free to join · No spam · Founded by Anwo Favour Oluwaseun
            </span>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)", padding: "30px 24px", textAlign: "center", fontSize: "13px", color: "var(--gray-400)" }}>
        <div className="ls-container">
          <p>© {new Date().getFullYear()} MeritUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
