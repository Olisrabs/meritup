"use client";

import FormShell from "./FormShell";

interface Props {
  data: { biggest_pain: string; pain_areas: string[]; admin_time: string };
  onChange: (field: string, value: string | string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepSSN({ data, onChange, onBack, onNext }: Props) {
  const isValid = data.biggest_pain.trim() !== "" && data.pain_areas.length > 0 && data.admin_time !== "";

  const toggle = (value: string) => {
    const arr = data.pain_areas;
    onChange("pain_areas", arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const checkbox = (value: string, label: string) => {
    const checked = data.pain_areas.includes(value);
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="checkbox" value={value} checked={checked} onChange={() => toggle(value)} />
        {label}
      </label>
    );
  };

  const radio = (value: string, label: string) => {
    const checked = data.admin_time === value;
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="radio" name="admin_time" value={value} checked={checked}
          onChange={() => onChange("admin_time", value)} />
        {label}
      </label>
    );
  };

  return (
    <FormShell step={3} onBack={onBack} onNext={onNext} disabled={!isValid}>
      <p className="step-badge">Where things break &nbsp;·&nbsp; Step 3 of 5</p>
      <h1 className="page-title">What's holding your business back?</h1>

      {/* Q6 */}
      <div className="q-block">
        <div className="q-num">Q6</div>
        <div className="q-label">What is the single biggest problem in running your distribution business right now?</div>
        <div className="q-hint">Be as specific as possible. This is the most important question.</div>
        <textarea className="form-input"
          placeholder="e.g. I never know my real stock level until I physically count. By the time I realise something is out, I've already told a buyer I have it..."
          value={data.biggest_pain}
          onChange={(e) => onChange("biggest_pain", e.target.value)}
        />
      </div>

      {/* Q7 */}
      <div className="q-block">
        <div className="q-num">Q7</div>
        <div className="q-label">Which of these problems cost you money or time most often?</div>
        <div className="q-hint">Select all that apply.</div>
        <div className="options-grid">
          {checkbox("Stockouts", "Running out of stock unexpectedly")}
          {checkbox("Wrong orders", "Wrong or lost orders from buyers")}
          {checkbox("Unpaid debts", "Buyers owing money / bad debts")}
          {checkbox("Manual invoicing", "Creating invoices and receipts manually")}
          {checkbox("No visibility", "Not knowing what's selling vs what's slow")}
          {checkbox("Delivery issues", "Delivery errors and returns")}
          {checkbox("Staff errors", "Staff errors and theft")}
        </div>
      </div>

      {/* Q8 */}
      <div className="q-block">
        <div className="q-num">Q8</div>
        <div className="q-label">How much time per week do you spend on admin — invoices, tracking stock, chasing payments?</div>
        <div className="options-grid two-col">
          {radio("Less than 2 hrs", "Less than 2 hrs")}
          {radio("2-5 hrs", "2 – 5 hrs")}
          {radio("5-10 hrs", "5 – 10 hrs")}
          {radio("10+ hrs", "10+ hrs")}
        </div>
      </div>
    </FormShell>
  );
}
