"use client";

import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import StepFullName from "@/components/StepFullName";
import StepDateOfBirth from "@/components/StepDateOfBirth";
import StepSSN from "@/components/StepSSN";
import StepAddress from "@/components/StepAddress";
import StepDisclosure from "@/components/StepDisclosure";
import SuccessScreen from "@/components/SuccessScreen";
import { submitSurvey } from "@/lib/submitSurvey";

type FormData = {
  // Step 1: About Business
  name: string;
  biz_type: string;
  buyers: string;
  // Step 2: Operations
  inventory_tools: string[];
  order_method: string[];
  // Step 3: Pain Points
  biggest_pain: string;
  pain_areas: string[];
  admin_time: string;
  // Step 4: Reaction
  solution_appeal: number;
  blockers: string[];
  willingness_to_pay: string;
  // Step 5: Contact
  open_feedback: string;
  whatsapp: string;
};

const initial: FormData = {
  name: "", biz_type: "", buyers: "",
  inventory_tools: [], order_method: [],
  biggest_pain: "", pain_areas: [], admin_time: "",
  solution_appeal: 5, blockers: [], willingness_to_pay: "",
  open_feedback: "", whatsapp: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitSurvey(formData);
      next(); // advance to SuccessScreen
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {step === 0 && <WelcomeScreen onContinue={() => setStep(1)} />}

      {step === 1 && (
        <StepFullName
          data={{ name: formData.name, biz_type: formData.biz_type, buyers: formData.buyers }}
          onChange={update}
          onBack={back}
          onNext={next}
        />
      )}

      {step === 2 && (
        <StepDateOfBirth
          data={{ inventory_tools: formData.inventory_tools, order_method: formData.order_method }}
          onChange={(field, value) => update(field, value)}
          onBack={back}
          onNext={next}
        />
      )}

      {step === 3 && (
        <StepSSN
          data={{ biggest_pain: formData.biggest_pain, pain_areas: formData.pain_areas, admin_time: formData.admin_time }}
          onChange={(field, value) => update(field, value)}
          onBack={back}
          onNext={next}
        />
      )}

      {step === 4 && (
        <StepAddress
          data={{ solution_appeal: formData.solution_appeal, blockers: formData.blockers, willingness_to_pay: formData.willingness_to_pay }}
          onChange={(field, value) => update(field, value)}
          onBack={back}
          onNext={next}
        />
      )}

      {step === 5 && (
        <StepDisclosure
          data={{ open_feedback: formData.open_feedback, whatsapp: formData.whatsapp }}
          onChange={update}
          onBack={back}
          submitting={submitting}
          submitError={submitError}
          onNext={handleSubmit}
        />
      )}

      {step === 6 && (
        <SuccessScreen
          name={formData.name}
          onRestart={() => { setFormData(initial); setStep(0); }}
        />
      )}
    </>
  );
}
