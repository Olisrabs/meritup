"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import type { PartnerData } from "@/lib/submitSurvey";

interface Props {
  data: PartnerData;
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

const platformOptions = [
  "Instagram", "TikTok", "WhatsApp groups", "Facebook", "Twitter(X)", "YouTube", "Other"
];

const sizeOptions = [
  "Under 500", "500–2,000", "2,000–10,000", "10,000+"
];

const audienceOptions = [
  "Nigerian university students", "Nigerian youth (general)", "Mixed/international", "Not sure"
];

const promotedOptions = [
  "Yes", "No"
];

export default function PartnerForm({
  data,
  onChange,
  onBack,
  onNext,
  submitting = false,
  submitError = null,
}: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

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
    isValid = data.name.trim() !== "" && data.phone.trim() !== "" && data.email.trim() !== "" && data.handle.trim() !== "";
  } else if (currentStep === 2) {
    isValid = !!data.promotion_platform && !!data.audience_size && !!data.audience_makeup && !!data.promoted_before;
  } else if (currentStep === 3) {
    isValid = data.bank_name.trim() !== "" && data.account_number.trim() !== "" && data.account_name.trim() !== "";
  }

  return (
    <FormShell
      step={currentStep}
      totalSteps={totalSteps}
      onBack={handleBack}
      onNext={handleNext}
      disabled={!isValid || submitting}
      continueLabel={submitting ? "Applying…" : currentStep === totalSteps ? "Apply Now" : "Continue"}
    >
      <p className="step-badge">Partner Application · Step {currentStep} of {totalSteps}</p>
      
      {currentStep === 1 && (
        <>
          <h1 className="page-title">Who You Are</h1>
          <div className="q-block">
            <div className="q-label">Full Name</div>
            <input type="text" className="form-input"
              placeholder="e.g. Chukwuemeka Okoro"
              value={data.name} onChange={(e) => onChange("name", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">WhatsApp Number</div>
            <input type="tel" className="form-input"
              placeholder="e.g. 08012345678"
              value={data.phone} onChange={(e) => onChange("phone", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Email Address</div>
            <input type="email" className="form-input"
              placeholder="e.g. emeka@example.com"
              value={data.email} onChange={(e) => onChange("email", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Instagram / TikTok / other handle</div>
            <div className="q-hint">Main platform you'll promote on</div>
            <input type="text" className="form-input"
              placeholder="e.g. @tech_bro_emeka"
              value={data.handle} onChange={(e) => onChange("handle", e.target.value)} />
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1 className="page-title">Your Audience</h1>
          <div className="q-block">
            <div className="q-label">Where do you mostly promote?</div>
            <select className="form-input" value={data.promotion_platform || ""} onChange={(e) => onChange("promotion_platform", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {platformOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">Roughly how many people see your content/posts?</div>
            <select className="form-input" value={data.audience_size || ""} onChange={(e) => onChange("audience_size", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {sizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">Who makes up most of your audience?</div>
            <select className="form-input" value={data.audience_makeup || ""} onChange={(e) => onChange("audience_makeup", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {audienceOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="q-block">
            <div className="q-label">Have you promoted a paid program or product for commission before?</div>
            <select className="form-input" value={data.promoted_before || ""} onChange={(e) => onChange("promoted_before", e.target.value)}>
              <option value="" disabled>Select an option...</option>
              {promotedOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1 className="page-title">Payment Details</h1>
          <div className="q-block">
            <div className="q-label">Bank Name</div>
            <input type="text" className="form-input"
              placeholder="e.g. GTBank"
              value={data.bank_name} onChange={(e) => onChange("bank_name", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Account Number</div>
            <input type="text" className="form-input"
              placeholder="e.g. 0123456789"
              value={data.account_number} onChange={(e) => onChange("account_number", e.target.value)} />
          </div>
          <div className="q-block">
            <div className="q-label">Account Name</div>
            <div className="q-hint">Must match the Full Name above. Will be flagged for manual review if it doesn't.</div>
            <input type="text" className="form-input"
              placeholder="e.g. Chukwuemeka Okoro"
              value={data.account_name} onChange={(e) => onChange("account_name", e.target.value)} />
          </div>

          {data.name.trim() !== "" && data.account_name.trim() !== "" && data.name.toLowerCase() !== data.account_name.toLowerCase() && (
            <p style={{ color: "#f59e0b", fontSize: "12px", marginTop: "6px", fontWeight: 500 }}>
              ⚠️ Account name differs from your full name. This will be flagged for manual review.
            </p>
          )}

          {submitError && (
            <p style={{
              fontSize: 13,
              color: "#e53e3e",
              background: "rgba(229,62,62,0.08)",
              border: "1px solid rgba(229,62,62,0.25)",
              borderRadius: 8,
              padding: "10px 14px",
              marginTop: 16,
              lineHeight: 1.5,
            }}>
              ⚠️ {submitError}
            </p>
          )}
        </>
      )}
    </FormShell>
  );
}
