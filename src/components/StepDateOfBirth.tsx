"use client";

import FormShell from "./FormShell";

interface Props {
  data: { inventory_tools: string[]; order_method: string[] };
  onChange: (field: string, value: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepDateOfBirth({ data, onChange, onBack, onNext }: Props) {
  const isValid = data.inventory_tools.length > 0 && data.order_method.length > 0;

  const toggle = (field: "inventory_tools" | "order_method", value: string) => {
    const arr = data[field];
    onChange(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const checkbox = (field: "inventory_tools" | "order_method", value: string, label: string) => {
    const checked = data[field].includes(value);
    return (
      <label key={value} className={`opt-label${checked ? " selected" : ""}`}>
        <input type="checkbox" value={value} checked={checked}
          onChange={() => toggle(field, value)} />
        {label}
      </label>
    );
  };

  return (
    <FormShell step={2} onBack={onBack} onNext={onNext} disabled={!isValid}>
      <p className="step-badge">How you work today &nbsp;·&nbsp; Step 2 of 5</p>
      <h1 className="page-title">How do you manage your business today?</h1>

      {/* Q4 */}
      <div className="q-block">
        <div className="q-num">Q4</div>
        <div className="q-label">How do you currently track your inventory and stock?</div>
        <div className="q-hint">Select all that apply.</div>
        <div className="options-grid">
          {checkbox("inventory_tools", "Excel/Spreadsheet", "Excel / Spreadsheet")}
          {checkbox("inventory_tools", "Physical notebook", "Physical notebook / ledger")}
          {checkbox("inventory_tools", "WhatsApp", "WhatsApp messages")}
          {checkbox("inventory_tools", "Accounting software", "Accounting software (Sage, QuickBooks)")}
          {checkbox("inventory_tools", "No system", "No system, I use memory")}
          {checkbox("inventory_tools", "Other software", "Other software")}
        </div>
      </div>

      {/* Q5 */}
      <div className="q-block">
        <div className="q-num">Q5</div>
        <div className="q-label">How do your buyers place orders with you today?</div>
        <div className="q-hint">Select all that apply.</div>
        <div className="options-grid">
          {checkbox("order_method", "WhatsApp", "WhatsApp message or call")}
          {checkbox("order_method", "Phone call", "Phone call only")}
          {checkbox("order_method", "Visits in person", "Visits in person")}
          {checkbox("order_method", "Email", "Email")}
          {checkbox("order_method", "Online platform", "Online platform / website")}
        </div>
      </div>
    </FormShell>
  );
}
