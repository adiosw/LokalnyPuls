-- ============================================================
-- LOKALNY PULS - SCHEMAT BAZY DANYCH (Supabase / PostgreSQL)
-- Wklej całość w Supabase Dashboard -> SQL Editor -> Run
-- ============================================================

-- Klienci (firmy korzystające z SaaS)
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) not null,
  name text not null,
  city text,
  industry text,
  google_place_id text,
  google_refresh_token text,          -- zaszyfrowany OAuth token do GBP API
  plan text default 'trial',          -- trial | start | standard | premium (wewnętrzne ID - nazwy wyświetlane: Widoczność/Wzrost/Dominacja)
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trialing', -- trialing | active | past_due | canceled
  trial_ends_at timestamp with time zone default (now() + interval '14 days'),
  onboarding_steps jsonb default '{"connected_google":false,"added_photos":false,"replied_first_review":false,"generated_first_post":false}'::jsonb,
  activity_streak_weeks int default 0,
  last_active_week date,
  created_at timestamp with time zone default now()
);

-- Opinie pobrane z Google
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  google_review_id text unique,
  author_name text,
  rating int not null check (rating between 1 and 5),
  comment text,
  reviewed_at timestamp with time zone,
  reply_text text,
  reply_status text default 'pending', -- pending | ai_suggested | published
  created_at timestamp with time zone default now()
);

-- Wygenerowane posty Google
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  content text not null,
  image_suggestion text,
  status text default 'draft', -- draft | published
  published_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Miesięczne raporty
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  period text not null, -- np. '2027-01'
  pdf_url text,
  metrics jsonb,
  created_at timestamp with time zone default now()
);

-- Monitoring / health-check wizytówki
create table if not exists profile_snapshots (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  photos_count int default 0,
  description_length int default 0,
  reviews_count int default 0,
  avg_rating numeric(2,1),
  completeness_score int, -- 0-100
  snapshot_date date default current_date
);

-- Powiadomienia
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  type text not null, -- new_review | rating_drop | inactive | insight
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- Codzienne wskazówki AI ("osobisty doradca")
create table if not exists ai_insights (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  message text not null,
  action_label text,      -- np. "Wygeneruj post"
  action_href text,        -- np. "/dashboard/posty"
  dismissed boolean default false,
  created_at timestamp with time zone default now()
);

-- Cel miesięczny (retencja - "gdzie jestem, dokąd zmierzam")
create table if not exists monthly_goals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  period text not null, -- '2027-01'
  target_rating numeric(2,1),
  starting_rating numeric(2,1),
  created_at timestamp with time zone default now()
);

-- ============================================================
-- ROW LEVEL SECURITY - każdy klient widzi TYLKO swoje dane
-- ============================================================

alter table businesses enable row level security;
alter table reviews enable row level security;
alter table posts enable row level security;
alter table reports enable row level security;
alter table profile_snapshots enable row level security;
alter table notifications enable row level security;

create policy "Właściciel widzi swoją firmę"
  on businesses for select
  using (auth.uid() = owner_id);

create policy "Właściciel edytuje swoją firmę"
  on businesses for update
  using (auth.uid() = owner_id);

create policy "Użytkownik może utworzyć własną firmę"
  on businesses for insert
  with check (auth.uid() = owner_id);

create policy "Właściciel widzi opinie swojej firmy"
  on reviews for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel widzi posty swojej firmy"
  on posts for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel tworzy posty swojej firmy"
  on posts for insert
  with check (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel widzi raporty swojej firmy"
  on reports for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel widzi snapshoty swojej firmy"
  on profile_snapshots for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel widzi powiadomienia swojej firmy"
  on notifications for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

alter table ai_insights enable row level security;
alter table monthly_goals enable row level security;

create policy "Właściciel widzi insighty swojej firmy"
  on ai_insights for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel odznacza insighty swojej firmy"
  on ai_insights for update
  using (business_id in (select id from businesses where owner_id = auth.uid()));

create policy "Właściciel widzi cele swojej firmy"
  on monthly_goals for select
  using (business_id in (select id from businesses where owner_id = auth.uid()));

-- Uwaga: operacje pisania z API (webhook Stripe, cron pobierający opinie z Google)
-- używają SUPABASE_SERVICE_ROLE_KEY, który omija RLS - to jest zamierzone
-- i bezpieczne, dopóki service_role key zostaje TYLKO po stronie serwera.

-- ============================================================
-- INDEKSY (wydajność przy skalowaniu)
-- ============================================================
create index if not exists idx_reviews_business_id on reviews(business_id);
create index if not exists idx_posts_business_id on posts(business_id);
create index if not exists idx_businesses_owner_id on businesses(owner_id);
create index if not exists idx_notifications_business_unread on notifications(business_id) where read = false;
create index if not exists idx_ai_insights_business_active on ai_insights(business_id) where dismissed = false;
