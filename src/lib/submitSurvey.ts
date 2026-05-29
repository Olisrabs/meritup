import { supabase } from "./supabase";

export interface SurveyData {
  name: string;
  biz_type: string;
  buyers: string;
  inventory_tools: string[];
  order_method: string[];
  biggest_pain: string;
  pain_areas: string[];
  admin_time: string;
  solution_appeal: number;
  blockers: string[];
  willingness_to_pay: string;
  open_feedback: string;
  whatsapp: string;
}

export async function submitSurvey(data: SurveyData): Promise<void> {
  const submitted_at = new Date().toISOString();

  // 1. Save to Supabase (this is the critical step — must succeed)
  const { error } = await supabase.from("survey_responses").insert([
    { ...data, submitted_at },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  // 2. Trigger the Edge Function notification (non-fatal — data is already saved)
  try {
    const { error: fnError } = await supabase.functions.invoke(
      "notify-submission",
      { body: { ...data, submitted_at } }
    );
    if (fnError) console.warn("Edge function error (non-fatal):", fnError);
  } catch (err) {
    console.warn("Edge function call failed (non-fatal):", err);
  }
}

