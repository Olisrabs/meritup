"use client";

import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import WaitlistForm from "@/components/WaitlistForm";
import SuccessScreen from "@/components/SuccessScreen";
import { submitWaitlist } from "@/lib/submitSurvey";
import type { WaitlistData } from "@/lib/submitSurvey";

const initial: WaitlistData = {
  name: "",
  phone_number: "",
  email: "",
  state: "",
  referral_code: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<WaitlistData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [myReferralCode, setMyReferralCode] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        setFormData((prev) => ({ ...prev, referral_code: ref }));
      }
    }
  }, []);

  const update = (field: string, value: unknown) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setIsDuplicate(false);
    try {
      const result = await submitWaitlist(formData);
      setMyReferralCode(result.myReferralCode);
      next(); // advance to SuccessScreen
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "";
      if (errMsg === "ALREADY_JOINED" || errMsg.toLowerCase().includes("already registered")) {
        setIsDuplicate(true);
        next(); // Also advance to success screen
      } else {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {step === 0 && <WelcomeScreen onContinue={() => setStep(1)} />}

      {step === 1 && (
        <WaitlistForm
          data={formData}
          onChange={update}
          onBack={back}
          submitting={submitting}
          submitError={submitError}
          onNext={handleSubmit}
        />
      )}

      {step === 2 && (
        <SuccessScreen
          name={formData.name}
          isDuplicate={isDuplicate}
          referralCode={myReferralCode || formData.phone_number}
          onRestart={() => {
            setFormData(initial);
            setIsDuplicate(false);
            setMyReferralCode("");
            setStep(0);
          }}
        />
      )}
    </>
  );
}
