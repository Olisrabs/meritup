"use client";

import FormShell from "./FormShell";

interface Props {
  data: { open_feedback: string; whatsapp: string };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

export default function StepDisclosure({
  data,
  onChange,
  onBack,
  onNext,
  submitting = false,
  submitError = null,
}: Props) {
  return (
    <FormShell
      step={5}
      onBack={onBack}
      onNext={onNext}
      disabled={submitting}
      continueLabel={submitting ? "Submitting…" : "Submit"}
    >
      <p className="step-badge">Stay in the loop&nbsp;·&nbsp; Step 5 of 5</p>
      <h1 className="page-title">Almost done — anything else to add?</h1>

      {/* Q12 */}
      <div className="q-block">
        <div className="q-num">Q12</div>
        <div className="q-label">Is there anything else you want us to know — or a question you wish we had asked?</div>
        <div className="q-hint">Optional but valuable. Speak freely.</div>
        <textarea className="form-input"
          placeholder="Anything at all..."
          value={data.open_feedback}
          onChange={(e) => onChange("open_feedback", e.target.value)}
        />
      </div>

      {/* Optional WhatsApp */}
      <div className="q-block">
        <div className="q-num">Optional</div>
        <div className="q-label">Can we follow up with you for a 10-minute call?</div>
        <div className="q-hint">Leave your WhatsApp number if you're open to a short conversation. No spam.</div>
        <input type="tel" className="form-input"
          placeholder="e.g. 08012345678"
          value={data.whatsapp}
          onChange={(e) => onChange("whatsapp", e.target.value)}
        />
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

      <p style={{ fontSize: 12, color: "var(--gray-400)", lineHeight: 1.6, marginTop: -8 }}>
        Your responses are confidential and used only for product research.
        Thank you — it genuinely helps.
      </p>
    </FormShell>
  );
}
