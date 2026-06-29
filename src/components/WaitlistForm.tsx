"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import type { WaitlistData } from "@/lib/submitSurvey";

interface Props {
  data: WaitlistData;
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna",
  "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const skillOptions = [
  "Copywriting", "Design", "Video Editing", "Social Media Management"
];

const statusOptions = [
  "Never tried before", "Tried but it didn't work", "Doing something but it's not paying off", "Just need a system to scale what's working"
];

const hoursOptions = [
  "Less than 2", "3–5", "6–10", "10+"
];

const investmentOptions = [
  "Yes, ready now", "Yes, but need a few weeks to save", "Not sure yet, want to know more first"
];

const obstacleOptions = [
  "No money", "No time as a student", "Got scammed/disappointed before", "Didn't know which skill to pick", "I start things but never finish"
];

const changeOptions = [
  "Stop depending on parents for money", "Finally finish something I started", "Have proof I can actually do this", "Build real income before I graduate"
];

export default function WaitlistForm({
  data,
  onChange,
  onBack,
  onNext,
  submitting = false,
  submitError = null,
}: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  let isValid = false;
  if (currentStep === 1) {
    isValid = data.name.trim() !== "" && data.phone_number.trim() !== "" && data.state !== "" && (data.university_level?.trim() || "") !== "";
  } else if (currentStep === 2) {
    isValid = !!data.current_status && !!data.biggest_obstacle && !!data.desired_change;
  } else if (currentStep === 3) {
    isValid = !!data.skill_interest && !!data.hours_per_week && !!data.investment_readiness;
  } else if (currentStep === 4) {
    const isSelfReferral = data.referral_code?.trim() !== "" && data.referral_code?.trim() === data.phone_number.trim();
    isValid = !isSelfReferral;
  }

  return (
    <FormShell
      step={currentStep}
      totalSteps={totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      disabled={!isValid || submitting}
      continueLabel={submitting ? "Securing your spot…" : currentStep === totalSteps ? "Count Me In" : "Continue"}
    >
      <p className="step-badge">MeritUp Early Access · Step {currentStep} of {totalSteps}</p>
      
      {currentStep === 1 && (
        <>
          <h1 className="page-title">Personal Details</h1>
          <div className="q-block">
            <div className="q-label">What is your full name?</div>
            <input id="name" type="text" className="form-input"
              placeholder="e.g. Chukwuemeka Okoro"
              value={data.name} onChange={(e) => onChange("name", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Your WhatsApp number</div>
            <input type="tel" className="form-input"
              placeholder="e.g. 08012345678"
              value={data.phone_number} onChange={(e) => onChange("phone_number", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Your email address</div>
            <input type="email" className="form-input"
              placeholder="e.g. emeka@example.com"
              value={data.email || ""} onChange={(e) => onChange("email", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Which state are you in?</div>
            <select className="form-input" value={data.state} onChange={(e) => onChange("state", e.target.value)}>
              <option value="" disabled>Select your state...</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">University & Level</div>
            <input type="text" className="form-input"
              placeholder='e.g. "FUTA, 200L"'
              value={data.university_level || ""} onChange={(e) => onChange("university_level", e.target.value)} />
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1 className="page-title">Your Situation</h1>
          <div className="q-block">
            <div className="q-label">Which of these sounds most like you right now?</div>
            <select className="form-input" value={data.current_status || ""} onChange={(e) => onChange("current_status", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {statusOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">What's the ONE thing that has stopped you from succeeding online before?</div>
            <select className="form-input" value={data.biggest_obstacle || ""} onChange={(e) => onChange("biggest_obstacle", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {obstacleOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">If this works exactly as promised, what changes first for you?</div>
            <select className="form-input" value={data.desired_change || ""} onChange={(e) => onChange("desired_change", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {changeOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1 className="page-title">Your Commitment</h1>
          <div className="q-block">
            <div className="q-label">Which skill pulls you in the most?</div>
            <select className="form-input" value={data.skill_interest || ""} onChange={(e) => onChange("skill_interest", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {skillOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">How many hours a week can you realistically give this?</div>
            <select className="form-input" value={data.hours_per_week || ""} onChange={(e) => onChange("hours_per_week", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {hoursOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">If the system is proven to work, would you be ready to invest in yourself?</div>
            <select className="form-input" value={data.investment_readiness || ""} onChange={(e) => onChange("investment_readiness", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {investmentOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </>
      )}

      {currentStep === 4 && (
        <>
          <h1 className="page-title">Almost Done!</h1>
          <div className="referral-box" style={{ marginTop: 24 }}>
            <div className="referral-box-text">
              <div className="referral-box-label">Referred by a friend or partner?</div>
              <div className="referral-box-desc">Enter their referral code (or phone number) to give them credit.</div>
            </div>
          </div>
          <div className="q-block" style={{ marginTop: -8 }}>
            <input type="text" className="form-input"
              placeholder="e.g. 08012345678 or EMEKA1234"
              value={data.referral_code || ""}
              onChange={(e) => onChange("referral_code", e.target.value)}
            />
            {data.referral_code?.trim() && data.referral_code.trim() === data.phone_number.trim() && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "6px", fontWeight: 500 }}>
                ⚠️ You cannot use your own phone number as a referral code.
              </p>
            )}
          </div>

          {submitError && (
            <p style={{
              fontSize: 13,
              color: "#e53e3e",
              background: "rgba(229,62,62,0.08)",
              border: "1px solid rgba(229,62,62,0.25)",
              borderRadius: 8,
              padding: "10px 14px",
              marginTop: 4,
              lineHeight: 1.5,
            }}>
              ⚠️ {submitError}
            </p>
          )}

          <p style={{ fontSize: 12, color: "var(--gray-400)", lineHeight: 1.6, marginTop: 16 }}>
            Your information is private and will only be used to notify you about MeritUp's launch.
          </p>
        </>
      )}
    </FormShell>
  );
}
