// supabase/functions/notify-submission/index.ts
// Deno runtime — deployed as a Supabase Edge Function
// Sends an email notification via Resend whenever a survey is submitted.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ─── CORS headers (required for browser → edge function calls) ──────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Main handler ────────────────────────────────────────────────────────────
serve(async (req: Request) => {
  // Handle pre-flight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL");

    if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
      throw new Error(
        "Missing RESEND_API_KEY or NOTIFY_EMAIL environment secrets."
      );
    }

    const data = await req.json();

    // ── Build a readable HTML email ──────────────────────────────────────────
    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#374151;background:#f9fafb;border-bottom:1px solid #e5e7eb;width:220px;vertical-align:top">${label}</td>
        <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb;vertical-align:top">${value || "—"}</td>
      </tr>`;

    const arr = (v: string[] | undefined) =>
      Array.isArray(v) && v.length ? v.join(", ") : "—";

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Tenvore Survey Response</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:640px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%);padding:32px 40px">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px">📋 New Survey Response</h1>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:14px">Tenvore Business Survey · ${new Date(data.submitted_at).toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</p>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:14px">
        <tbody>
          ${row("Respondent name", data.name)}
          ${row("Business type", data.biz_type)}
          ${row("Primary buyers", data.buyers)}
          ${row("Inventory tools", arr(data.inventory_tools))}
          ${row("Order methods", arr(data.order_method))}
          ${row("Biggest pain", data.biggest_pain)}
          ${row("Pain areas", arr(data.pain_areas))}
          ${row("Admin time / week", data.admin_time)}
          ${row("Solution appeal (1–10)", String(data.solution_appeal))}
          ${row("Blockers", arr(data.blockers))}
          ${row("Willingness to pay", data.willingness_to_pay)}
          ${row("Open feedback", data.open_feedback || "—")}
          ${row("WhatsApp", data.whatsapp || "Not provided")}
        </tbody>
      </table>

      <p style="margin-top:24px;font-size:13px;color:#6b7280;line-height:1.6">
        This submission has been saved to your Supabase <code>survey_responses</code> table.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;color:#9ca3af">Tenvore · Automated survey notification</p>
    </div>
  </div>
</body>
</html>`;

    // ── Send via Resend ──────────────────────────────────────────────────────
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tenvore Survey <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `📋 New Tenvore Response — ${data.name || "Anonymous"} · ${new Date(data.submitted_at).toLocaleDateString("en-GB")}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      throw new Error(`Resend API error ${resendRes.status}: ${detail}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("notify-submission error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
