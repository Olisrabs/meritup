import { supabase } from "./supabase";

export interface WaitlistData {
  name: string;
  phone_number: string;
  email?: string;
  state: string;
  university_level?: string;
  skill_interest?: string;
  current_status?: string;
  hours_per_week?: string;
  investment_readiness?: string;
  biggest_obstacle?: string;
  desired_change?: string;
  referral_code?: string; // code the user entered (who referred them)
}

export interface WaitlistResult {
  myReferralCode: string; // the unique code generated for this user
}

export interface PartnerData {
  name: string;
  phone: string;
  email: string;
  handle: string;
  promotion_platform: string;
  audience_size: string;
  audience_makeup: string;
  promoted_before: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

export interface PartnerResult {
  myReferralCode: string;
}

export async function submitWaitlist(data: WaitlistData): Promise<WaitlistResult> {
  const submitted_at = new Date().toISOString();
  
  const userPhone = data.phone_number.trim();
  const referrerPhone = data.referral_code?.trim() || null;

  if (referrerPhone && referrerPhone === userPhone) {
    throw new Error("You cannot use your own phone number as a referral code.");
  }

  const myReferralCode = userPhone;

  if (!supabase) {
    throw new Error("Supabase is not initialized. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file, then restart your development server.");
  }

  // 1. Check if phone number is already registered
  const { data: phoneCheck } = await supabase
    .from("meritup_waitlist_responses")
    .select("phone")
    .eq("phone", userPhone)
    .maybeSingle();

  if (phoneCheck) {
    throw new Error("This phone number is already registered on the waitlist.");
  }

  // 2. Check if email is already registered (if provided)
  if (data.email?.trim()) {
    const userEmail = data.email.trim();
    const { data: emailCheck } = await supabase
      .from("meritup_waitlist_responses")
      .select("email")
      .eq("email", userEmail)
      .maybeSingle();

    if (emailCheck) {
      throw new Error("This email address is already registered on the waitlist.");
    }
  }

  // 3. Save to Supabase
  const { error } = await supabase.from("meritup_waitlist_responses").insert([
    {
      name: data.name,
      phone: userPhone,
      email: data.email?.trim() || null,
      state: data.state,
      university_level: data.university_level,
      skill_interest: data.skill_interest,
      current_status: data.current_status,
      hours_per_week: data.hours_per_week,
      investment_readiness: data.investment_readiness,
      biggest_obstacle: data.biggest_obstacle,
      desired_change: data.desired_change,
      referred_by: referrerPhone,
      my_referral_code: myReferralCode,
      submitted_at,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    if (error.code === "23505") {
      const msg = error.message.toLowerCase();
      if (msg.includes("phone")) {
        throw new Error("This phone number is already registered on the waitlist.");
      }
      if (msg.includes("email")) {
        throw new Error("This email address is already registered on the waitlist.");
      }
      throw new Error("This phone number or email is already registered on the waitlist.");
    }
    throw new Error(error.message);
  }

  // 2. Trigger the Edge Function notification (non-fatal)
  try {
    const { error: fnError } = await supabase.functions.invoke(
      "notify-submission",
      { body: { ...data, submitted_at, my_referral_code: myReferralCode } }
    );
    if (fnError) console.warn("Edge function error (non-fatal):", fnError);
  } catch (err) {
    console.warn("Edge function call failed (non-fatal):", err);
  }

  return { myReferralCode };
}

// Keep legacy export for backward compat (if anything imports it)
export type SurveyData = WaitlistData;
export async function submitSurvey(data: WaitlistData): Promise<WaitlistResult> {
  return submitWaitlist(data);
}

export async function submitPartner(data: PartnerData): Promise<PartnerResult> {
  if (!supabase) {
    throw new Error("Supabase is not initialized.");
  }

  const submitted_at = new Date().toISOString();
  // Using phone as fallback referral code, but they can get a custom one later or maybe use their first name. 
  // Let's use their first name + last 4 digits of phone as their referral code
  const firstName = data.name.split(" ")[0].toUpperCase();
  const phoneSuffix = data.phone.trim().slice(-4);
  const myReferralCode = `${firstName}${phoneSuffix}`;

  // Check if phone or email is already registered in partners
  const { data: existingUser } = await supabase
    .from("meritup_partners")
    .select("phone, email")
    .or(`phone.eq.${data.phone.trim()},email.eq.${data.email.trim()}`)
    .maybeSingle();

  if (existingUser) {
    throw new Error("A partner with this phone number or email is already registered.");
  }

  const { error } = await supabase.from("meritup_partners").insert([
    {
      name: data.name,
      phone: data.phone.trim(),
      email: data.email.trim(),
      handle: data.handle,
      promotion_platform: data.promotion_platform,
      audience_size: data.audience_size,
      audience_makeup: data.audience_makeup,
      promoted_before: data.promoted_before,
      bank_name: data.bank_name,
      account_number: data.account_number,
      account_name: data.account_name,
      referral_code: myReferralCode,
      submitted_at,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { myReferralCode };
}
