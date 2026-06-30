"use client";

import FormShell from "./FormShell";

interface Props {
  data: { name: string; biz_type: string; buyers: string };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepFullName({ data, onChange, onBack, onNext }: Props) {
  const isValid = data.name.trim() !== "" && data.biz_type !== "" && data.buyers !== "";

  const radio = (field: string, value: string, label: string) => {
    const checked = data[field as keyof typeof data] === value;
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="radio" name={field} value={value} checked={checked}
          onChange={() => onChange(field, value)} />
        {label}
      </label>
    );
  };

  return (
    <FormShell step={1} onBack={onBack} onNext={onNext} disabled={!isValid}>
      <p className="step-badge">About your business &nbsp;·&nbsp; Step 1 of 5</p>
      <h1 className="page-title">Tell us about you and your business</h1>

      {/* Q1 */}
      <div className="q-block">
        <div className="q-num">Q1</div>
        <div className="q-label">What is your name and business name?</div>
        <div className="q-hint">First name is fine. We won't share this anywhere.</div>
        <input id="name" type="text" className="form-input"
          placeholder="e.g. Emeka - Emeka Foods Ltd"
          value={data.name} onChange={(e) => onChange("name", e.target.value)} />
      </div>

      {/* Q2 */}
      <div className="q-block">
        <div className="q-num">Q2</div>
        <div className="q-label">What type of business do you run?</div>
        <div className="q-hint">Pick the one that fits best.</div>
        <div className="options-grid">
          {radio("biz_type", "Distributor", "Distributor")}
          {radio("biz_type", "Wholesaler", "Wholesaler")}
          {radio("biz_type", "Both", "Both")}
          {radio("biz_type", "Other", "Other")}
        </div>
      </div>

      {/* Q3 */}
      <div className="q-block">
        <div className="q-num">Q3</div>
        <div className="q-label">How many buyers/customers do you supply regularly?</div>
        <div className="options-grid two-col">
          {radio("buyers", "1-10", "1 – 10")}
          {radio("buyers", "11-50", "11 – 50")}
          {radio("buyers", "51-200", "51 – 200")}
          {radio("buyers", "200+", "200+")}
        </div>
      </div>
    </FormShell>
  );
}
