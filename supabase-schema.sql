-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → paste → Run

create table if not exists survey_responses (
  id                uuid primary key default gen_random_uuid(),
  submitted_at      timestamptz not null default now(),

  -- Step 1: About the business
  name              text,
  biz_type          text,
  buyers            text,

  -- Step 2: Operations
  inventory_tools   text[],
  order_method      text[],

  -- Step 3: Pain points
  biggest_pain      text,
  pain_areas        text[],
  admin_time        text,

  -- Step 4: Reaction
  solution_appeal   int,
  blockers          text[],
  willingness_to_pay text,

  -- Step 5: Contact / Open feedback
  open_feedback     text,
  whatsapp          text
);

-- Optional: restrict public inserts only (no reads/updates/deletes from the browser)
alter table survey_responses enable row level security;

create policy "Allow anonymous inserts"
  on survey_responses
  for insert
  to anon
  with check (true);
