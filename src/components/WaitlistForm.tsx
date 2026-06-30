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
  "Affiliate Marketing",
  "Social Media Management",
  "Video Editing",
  "Graphic Design",
  "Web Development"
];

const statusOptions = [
  "Never tried before", 
  "Tried but it didn't work", 
  "Doing something but it's not paying off", 
  "Just need a system to scale what's working"
];

const hoursOptions = [
  "Less than 2", 
  "3–5", 
  "6–10", 
  "10+"
];

const investmentOptions = [
  "Yes, ready now", 
  "Yes, but need a few weeks to save", 
  "Not sure yet, want to know more first"
];

const obstacleOptions = [
  "No money", 
  "No time as a student", 
  "Got scammed/disappointed before", 
  "Didn't know which skill to pick", 
  "I start things but never finish"
];

const changeOptions = [
  "Stop depending on parents for money", 
  "Finally finish something I started", 
  "Have proof I can actually do this", 
  "Build real income before I graduate"
];

const OptionTiles = ({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            style={{
              width: "100%",
              padding: "14px 18px",
              textAlign: "left",
              background: isSelected ? "rgba(223, 171, 46, 0.08)" : "rgba(255, 255, 255, 0.02)",
              border: isSelected ? "1.5px solid var(--brand)" : "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "var(--radius)",
              color: isSelected ? "var(--gray-900)" : "var(--gray-700)",
              fontSize: "14px",
              fontWeight: isSelected ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span>{option}</span>
            {isSelected ? (
              <span style={{
                color: "#000000",
                background: "var(--gradient)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "bold",
                boxShadow: "0 0 8px rgba(223, 171, 46, 0.4)"
              }}>
                ✓
              </span>
            ) : (
              <span style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "inline-flex"
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
};

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
            <div className="q-label" style={{ marginBottom: "10px" }}>Which of these sounds most like you right now?</div>
            <OptionTiles
              options={statusOptions}
              selected={data.current_status || ""}
              onSelect={(val) => onChange("current_status", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>What's the ONE thing that has stopped you from succeeding online before?</div>
            <OptionTiles
              options={obstacleOptions}
              selected={data.biggest_obstacle || ""}
              onSelect={(val) => onChange("biggest_obstacle", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>If this works exactly as promised, what changes first for you?</div>
            <OptionTiles
              options={changeOptions}
              selected={data.desired_change || ""}
              onSelect={(val) => onChange("desired_change", val)}
            />
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1 className="page-title">Your Commitment</h1>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>Which skill pulls you in the most?</div>
            <OptionTiles
              options={skillOptions}
              selected={data.skill_interest || ""}
              onSelect={(val) => onChange("skill_interest", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>How many hours a week can you realistically give this?</div>
            <OptionTiles
              options={hoursOptions}
              selected={data.hours_per_week || ""}
              onSelect={(val) => onChange("hours_per_week", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>If the system is proven to work, would you be ready to invest in yourself?</div>
            <OptionTiles
              options={investmentOptions}
              selected={data.investment_readiness || ""}
              onSelect={(val) => onChange("investment_readiness", val)}
            />
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
