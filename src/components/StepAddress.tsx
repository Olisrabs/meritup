"use client";

import { useState } from "react";
import FormShell from "./FormShell";

interface Props {
  data: { solution_appeal: number; blockers: string[]; willingness_to_pay: string };
  onChange: (field: string, value: number | string | string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepAddress({ data, onChange, onBack, onNext }: Props) {
  const isValid = data.blockers.length > 0 && data.willingness_to_pay !== "";

  const toggle = (value: string) => {
    const arr = data.blockers;
    onChange("blockers", arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const checkbox = (value: string, label: string) => {
    const checked = data.blockers.includes(value);
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="checkbox" value={value} checked={checked} onChange={() => toggle(value)} />
        {label}
      </label>
    );
  };

  const radio = (value: string, label: string) => {
    const checked = data.willingness_to_pay === value;
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="radio" name="wtp" value={value} checked={checked}
          onChange={() => onChange("willingness_to_pay", value)} />
        {label}
      </label>
    );
  };

  return (
    <FormShell step={4} onBack={onBack} onNext={onNext} disabled={!isValid}>
      <p className="step-badge">Your honest reaction &nbsp;·&nbsp; Step 4 of 5</p>
      <h1 className="page-title">What do you think of a solution?</h1>

      {/* Q9: Range slider */}
      <div className="q-block">
        <div className="q-num">Q9</div>
        <div className="q-label">
          If there was a simple app that let you track stock, receive buyer orders, send invoices,
          and see what's selling, how useful would that be to you?
        </div>
        <div className="range-wrap">
          <input type="range" min={1} max={10} value={data.solution_appeal}
            onChange={(e) => onChange("solution_appeal", Number(e.target.value))} />
          <div className="range-labels">
            <span>Not useful at all</span>
            <span>Extremely useful</span>
          </div>
          <div className="range-val">{data.solution_appeal} / 10</div>
        </div>
      </div>

      {/* Q10 */}
      <div className="q-block">
        <div className="q-num">Q10</div>
        <div className="q-label">What would make you hesitate to use a new software for your business?</div>
        <div className="q-hint">Select all that apply, we need to know the real blockers.</div>
        <div className="options-grid">
          {checkbox("Cost", "Too expensive")}
          {checkbox("Complexity", "Too complicated to learn")}
          {checkbox("Internet", "Poor internet / data cost")}
          {checkbox("Staff adoption", "My staff won't use it")}
          {checkbox("Trust", "I don't trust new Nigerian tech products")}
          {checkbox("Current works", "My current system works fine")}
        </div>
      </div>

      {/* Q11 */}
      <div className="q-block">
        <div className="q-num">Q11</div>
        <div className="q-label">How much would you be willing to pay monthly for software that genuinely solved your biggest problem?</div>
        <div className="options-grid">
          {radio("Nothing, I won't pay", "Nothing, I won't pay for software")}
          {radio("₦5,000-₦10,000", "₦5,000 – ₦10,000 / month")}
          {radio("₦10,000-₦15,000", "₦10,000 – ₦15,000 / month")}
          {radio("₦15,000-₦30,000", "₦15,000 – ₦30,000 / month")}
          {radio("₦30,000+", "₦30,000+ / month if value is clear")}
        </div>
      </div>
    </FormShell>
  );
}
