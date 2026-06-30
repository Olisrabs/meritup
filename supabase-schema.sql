-- ============================================================
--  MeritUp Waitlist: Supabase Schema
--  Run this in: Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- Create the base table if it doesn't exist
CREATE TABLE IF NOT EXISTS meritup_waitlist_responses (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at      timestamptz NOT NULL DEFAULT now(),

  -- Personal info
  name              text,
  phone             text,
  email             text,
  state             text,

  -- Referral system
  my_referral_code  text,
  referred_by       text
);

-- Add the new wizard columns if they don't exist
ALTER TABLE meritup_waitlist_responses
  ADD COLUMN IF NOT EXISTS university_level     text,
  ADD COLUMN IF NOT EXISTS skill_interest       text,
  ADD COLUMN IF NOT EXISTS current_status       text,
  ADD COLUMN IF NOT EXISTS hours_per_week       text,
  ADD COLUMN IF NOT EXISTS investment_readiness text,
  ADD COLUMN IF NOT EXISTS biggest_obstacle     text,
  ADD COLUMN IF NOT EXISTS desired_change       text;

-- ============================================================
--  MeritUp Partners (Publicans)
-- ============================================================
CREATE TABLE IF NOT EXISTS meritup_partners (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at        timestamptz NOT NULL DEFAULT now(),

  -- Section 1: Who You Are
  name                text,
  phone               text,
  email               text,
  handle              text,

  -- Section 2: Audience
  promotion_platform  text,
  audience_size       text,
  audience_makeup     text,
  promoted_before     text,

  -- Section 3: Payment
  bank_name           text,
  account_number      text,
  account_name        text,

  -- Referral
  referral_code       text UNIQUE
);

ALTER TABLE meritup_partners ENABLE ROW LEVEL SECURITY;

-- Idempotent policy creation for partners
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'meritup_partners' AND policyname = 'Allow anonymous inserts'
  ) THEN
    CREATE POLICY "Allow anonymous inserts"
      ON meritup_partners
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;

-- ── Uniqueness constraints ───────────────────────────────────
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'waitlist_unique_phone'
  ) THEN
    ALTER TABLE meritup_waitlist_responses
      ADD CONSTRAINT waitlist_unique_phone UNIQUE (phone);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx
  ON meritup_waitlist_responses (email)
  WHERE email IS NOT NULL AND email <> '';

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_referral_code_idx
  ON meritup_waitlist_responses (my_referral_code)
  WHERE my_referral_code IS NOT NULL;

-- ── Referral leaderboard view ────────────────────────────────
-- Returns each referrer code and how many people they've referred
CREATE OR REPLACE VIEW referral_leaderboard AS
SELECT
  referred_by                          AS referral_code,
  COUNT(*)                             AS referral_count,
  MAX(submitted_at)                    AS last_referral_at
FROM meritup_waitlist_responses
WHERE referred_by IS NOT NULL AND referred_by <> ''
GROUP BY referred_by
ORDER BY referral_count DESC;

-- ── Row-Level Security ───────────────────────────────────────
ALTER TABLE meritup_waitlist_responses ENABLE ROW LEVEL SECURITY;

-- Idempotent policy creation for waitlist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'meritup_waitlist_responses' AND policyname = 'Allow anonymous inserts'
  ) THEN
    CREATE POLICY "Allow anonymous inserts"
      ON meritup_waitlist_responses
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END $$;
