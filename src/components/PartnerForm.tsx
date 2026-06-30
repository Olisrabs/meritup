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
  "Students", "Youth (general)", "Mixed/international", "Not sure"
];

const promotedOptions = [
  "Yes", "No"
];

const OptionTiles = ({
  options,
  selected,
  onSelect,
  name,
}: {
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  name?: string;
}) => {
  const hasSelection = selected.trim() !== "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        const isDeactivated = hasSelection && !isSelected;

        return (
          <label
            key={option}
            style={{
              width: "100%",
              padding: "14px 18px",
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
              opacity: isDeactivated ? 0.4 : 1,
            }}
          >
            <span>{option}</span>
            <input 
              type="radio" 
              name={name || "partner-radio"} 
              value={option} 
              checked={isSelected} 
              onChange={() => onSelect(option)}
              style={{ width: "18px", height: "18px", accentColor: "var(--brand)", cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
};

const CheckboxTiles = ({
  options,
  selectedValues,
  onSelect,
}: {
  options: string[];
  selectedValues: string;
  onSelect: (val: string) => void;
}) => {
  const currentSet = new Set(selectedValues ? selectedValues.split(', ') : []);
  
  const toggle = (val: string) => {
    if (currentSet.has(val)) {
      currentSet.delete(val);
    } else {
      currentSet.add(val);
    }
    onSelect(Array.from(currentSet).join(', '));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
      {options.map((option) => {
        const isSelected = currentSet.has(option);
        return (
          <label
            key={option}
            style={{
              width: "100%",
              padding: "14px 18px",
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
            <input 
              type="checkbox" 
              checked={isSelected} 
              onChange={() => toggle(option)}
              style={{ width: "18px", height: "18px", accentColor: "var(--brand)", cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
};

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
            <div className="q-label" style={{ marginBottom: "10px" }}>Where do you mostly promote? (Select multiple)</div>
            <CheckboxTiles
              options={platformOptions}
              selectedValues={data.promotion_platform || ""}
              onSelect={(val) => onChange("promotion_platform", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>Roughly how many people see your content/posts?</div>
            <OptionTiles
              name="audience_size"
              options={sizeOptions}
              selected={data.audience_size || ""}
              onSelect={(val) => onChange("audience_size", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>Who makes up most of your audience?</div>
            <OptionTiles
              name="audience_makeup"
              options={audienceOptions}
              selected={data.audience_makeup || ""}
              onSelect={(val) => onChange("audience_makeup", val)}
            />
          </div>
          <div className="q-block">
            <div className="q-label" style={{ marginBottom: "10px" }}>Have you promoted a paid program or product for commission before?</div>
            <OptionTiles
              name="promoted_before"
              options={promotedOptions}
              selected={data.promoted_before || ""}
              onSelect={(val) => onChange("promoted_before", val)}
            />
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
