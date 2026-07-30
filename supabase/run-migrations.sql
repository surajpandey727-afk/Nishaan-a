-- ============================================================
-- Run this entire script in the Supabase Dashboard SQL Editor
-- Go to: https://supabase.com/dashboard/project/azusdzavsukgaxxmvlaw/sql/new
-- ============================================================

-- Migration 0001: Create analytics tables and functions
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  visit_count int not null default 1,
  city text,
  country text,
  region text,
  continent text,
  timezone text,
  language text,
  browser text,
  operating_system text,
  device_type text,
  screen_resolution text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  start_time timestamptz not null default now(),
  end_time timestamptz not null default now(),
  duration_ms int not null default 0,
  pages_viewed int not null default 0,
  analysis_count int not null default 0
);

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  session_id uuid not null references public.sessions(id) on delete cascade,
  timestamp timestamptz not null default now(),
  page text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  language text,
  browser text,
  operating_system text,
  device_type text,
  screen_resolution text,
  country text,
  region text,
  city text,
  continent text
);

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references public.visitors(id) on delete cascade,
  session_id uuid not null references public.sessions(id) on delete cascade,
  timestamp timestamptz not null default now(),
  submitted_name text not null,
  final_score numeric(5,1) not null,
  processing_time_ms int not null,
  success boolean not null default true,
  failure_reason text
);

create table if not exists public.groq_usage (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references public.analyses(id) on delete cascade,
  model text not null,
  prompt_tokens int not null default 0,
  completion_tokens int not null default 0,
  total_tokens int not null default 0,
  latency_ms int not null,
  http_status int not null,
  estimated_cost numeric(12,6) not null default 0,
  request_timestamp timestamptz not null default now()
);

create table if not exists public.system_health (
  id uuid primary key default gen_random_uuid(),
  recorded_at timestamptz not null default now(),
  worker_latency_ms int not null,
  worker_status text not null,
  groq_status text not null,
  supabase_latency_ms int not null,
  api_errors int not null default 0
);

-- Indexes
create index if not exists visitors_last_seen_idx on public.visitors (last_seen);
create index if not exists visitors_country_idx on public.visitors (country);
create index if not exists visitors_city_idx on public.visitors (city);
create index if not exists visitors_continent_idx on public.visitors (continent);
create index if not exists sessions_start_time_idx on public.sessions (start_time);
create index if not exists sessions_end_time_idx on public.sessions (end_time);
create index if not exists page_views_timestamp_idx on public.page_views (timestamp);
create index if not exists analyses_timestamp_idx on public.analyses (timestamp);
create index if not exists groq_usage_request_timestamp_idx on public.groq_usage (request_timestamp);
create index if not exists system_health_recorded_at_idx on public.system_health (recorded_at);

-- Ingest function
create or replace function public.analytics_ingest_score_event(payload jsonb)
returns void language plpgsql security definer as $$
declare
  v_visitor_id uuid := (payload ->> 'visitor_id')::uuid;
  v_session_id uuid := (payload ->> 'session_id')::uuid;
  v_analysis_id uuid;
  v_pages_viewed int := coalesce((payload ->> 'pages_viewed')::int, 0);
  v_processing_time_ms int := coalesce((payload ->> 'processing_time_ms')::int, 0);
  v_groq_latency_ms int := coalesce((payload ->> 'groq_latency_ms')::int, 0);
  v_worker_latency_ms int := coalesce((payload ->> 'worker_latency_ms')::int, 0);
  v_api_errors int := coalesce((payload ->> 'api_errors')::int, 0);
begin
  insert into public.visitors (
    id, first_seen, last_seen, visit_count, city, country, region, continent, timezone,
    language, browser, operating_system, device_type, screen_resolution, utm_source,
    utm_medium, utm_campaign, referrer
  ) values (
    v_visitor_id, now(), now(), 1, payload ->> 'city', payload ->> 'country', payload ->> 'region',
    payload ->> 'continent', payload ->> 'timezone', payload ->> 'language', payload ->> 'browser',
    payload ->> 'operating_system', payload ->> 'device_type', payload ->> 'screen_resolution',
    payload ->> 'utm_source', payload ->> 'utm_medium', payload ->> 'utm_campaign', payload ->> 'referrer'
  ) on conflict (id) do update set
    last_seen = now(),
    visit_count = public.visitors.visit_count + 1,
    city = coalesce(nullif(payload ->> 'city',''), public.visitors.city),
    country = coalesce(nullif(payload ->> 'country',''), public.visitors.country),
    region = coalesce(nullif(payload ->> 'region',''), public.visitors.region),
    continent = coalesce(nullif(payload ->> 'continent',''), public.visitors.continent),
    timezone = coalesce(nullif(payload ->> 'timezone',''), public.visitors.timezone),
    language = coalesce(nullif(payload ->> 'language',''), public.visitors.language),
    browser = coalesce(nullif(payload ->> 'browser',''), public.visitors.browser),
    operating_system = coalesce(nullif(payload ->> 'operating_system',''), public.visitors.operating_system),
    device_type = coalesce(nullif(payload ->> 'device_type',''), public.visitors.device_type),
    screen_resolution = coalesce(nullif(payload ->> 'screen_resolution',''), public.visitors.screen_resolution),
    utm_source = coalesce(nullif(payload ->> 'utm_source',''), public.visitors.utm_source),
    utm_medium = coalesce(nullif(payload ->> 'utm_medium',''), public.visitors.utm_medium),
    utm_campaign = coalesce(nullif(payload ->> 'utm_campaign',''), public.visitors.utm_campaign),
    referrer = coalesce(nullif(payload ->> 'referrer',''), public.visitors.referrer);

  insert into public.sessions (
    id, visitor_id, start_time, end_time, duration_ms, pages_viewed, analysis_count
  ) values (
    v_session_id, v_visitor_id, now(), now(), v_processing_time_ms, v_pages_viewed, 1
  ) on conflict (id) do update set
    end_time = now(),
    duration_ms = greatest(public.sessions.duration_ms, v_processing_time_ms),
    pages_viewed = public.sessions.pages_viewed + v_pages_viewed,
    analysis_count = public.sessions.analysis_count + 1;

  insert into public.analyses (
    visitor_id, session_id, timestamp, submitted_name, final_score, processing_time_ms, success, failure_reason
  ) values (
    v_visitor_id, v_session_id, now(), payload ->> 'submitted_name', (payload ->> 'final_score')::numeric, v_processing_time_ms,
    (payload ->> 'success')::boolean, payload ->> 'failure_reason'
  ) returning id into v_analysis_id;

  insert into public.groq_usage (
    analysis_id, model, prompt_tokens, completion_tokens, total_tokens, latency_ms, http_status, estimated_cost, request_timestamp
  ) values (
    v_analysis_id, payload ->> 'model', (payload ->> 'prompt_tokens')::int, (payload ->> 'completion_tokens')::int,
    (payload ->> 'total_tokens')::int, v_groq_latency_ms, (payload ->> 'http_status')::int,
    coalesce((payload ->> 'estimated_cost')::numeric, 0), now()
  );

  insert into public.system_health (
    worker_latency_ms, worker_status, groq_status, supabase_latency_ms, api_errors
  ) values (
    v_worker_latency_ms, payload ->> 'worker_status', payload ->> 'groq_status', (payload ->> 'supabase_latency_ms')::int, v_api_errors
  );
end;
$$;

-- Page view function
create or replace function public.analytics_record_page_view(payload jsonb)
returns void language plpgsql security definer as $$
declare
  v_visitor_id uuid := (payload ->> 'visitor_id')::uuid;
  v_session_id uuid := (payload ->> 'session_id')::uuid;
  v_pages_viewed int := 1;
begin
  insert into public.visitors (id, first_seen, last_seen, visit_count, city, country, region, continent, timezone, language, browser, operating_system, device_type, screen_resolution, utm_source, utm_medium, utm_campaign, referrer)
  values (
    v_visitor_id, now(), now(), 1, payload ->> 'city', payload ->> 'country', payload ->> 'region', payload ->> 'continent', payload ->> 'timezone', payload ->> 'language', payload ->> 'browser', payload ->> 'operating_system', payload ->> 'device_type', payload ->> 'screen_resolution', payload ->> 'utm_source', payload ->> 'utm_medium', payload ->> 'utm_campaign', payload ->> 'referrer'
  ) on conflict (id) do update set
    last_seen = now(),
    visit_count = public.visitors.visit_count + 1,
    city = coalesce(nullif(payload ->> 'city',''), public.visitors.city),
    country = coalesce(nullif(payload ->> 'country',''), public.visitors.country),
    region = coalesce(nullif(payload ->> 'region',''), public.visitors.region),
    continent = coalesce(nullif(payload ->> 'continent',''), public.visitors.continent),
    timezone = coalesce(nullif(payload ->> 'timezone',''), public.visitors.timezone),
    language = coalesce(nullif(payload ->> 'language',''), public.visitors.language),
    browser = coalesce(nullif(payload ->> 'browser',''), public.visitors.browser),
    operating_system = coalesce(nullif(payload ->> 'operating_system',''), public.visitors.operating_system),
    device_type = coalesce(nullif(payload ->> 'device_type',''), public.visitors.device_type),
    screen_resolution = coalesce(nullif(payload ->> 'screen_resolution',''), public.visitors.screen_resolution),
    utm_source = coalesce(nullif(payload ->> 'utm_source',''), public.visitors.utm_source),
    utm_medium = coalesce(nullif(payload ->> 'utm_medium',''), public.visitors.utm_medium),
    utm_campaign = coalesce(nullif(payload ->> 'utm_campaign',''), public.visitors.utm_campaign),
    referrer = coalesce(nullif(payload ->> 'referrer',''), public.visitors.referrer);

  insert into public.sessions (id, visitor_id, start_time, end_time, duration_ms, pages_viewed, analysis_count)
  values (v_session_id, v_visitor_id, now(), now(), 0, v_pages_viewed, 0)
  on conflict (id) do update set
    end_time = now(),
    pages_viewed = public.sessions.pages_viewed + 1;

  insert into public.page_views (
    visitor_id, session_id, timestamp, page, referrer, utm_source, utm_medium, utm_campaign,
    language, browser, operating_system, device_type, screen_resolution, country, region, city, continent
  ) values (
    v_visitor_id, v_session_id, now(), payload ->> 'page', payload ->> 'referrer', payload ->> 'utm_source', payload ->> 'utm_medium', payload ->> 'utm_campaign',
    payload ->> 'language', payload ->> 'browser', payload ->> 'operating_system', payload ->> 'device_type', payload ->> 'screen_resolution',
    payload ->> 'country', payload ->> 'region', payload ->> 'city', payload ->> 'continent'
  );
end;
$$;

-- RLS
alter table public.visitors enable row level security;
alter table public.sessions enable row level security;
alter table public.page_views enable row level security;
alter table public.analyses enable row level security;
alter table public.groq_usage enable row level security;
alter table public.system_health enable row level security;

create policy "Allow authenticated select" on public.visitors for select using (auth.role() = 'authenticated');
create policy "Allow authenticated select" on public.sessions for select using (auth.role() = 'authenticated');
create policy "Allow authenticated select" on public.page_views for select using (auth.role() = 'authenticated');
create policy "Allow authenticated select" on public.analyses for select using (auth.role() = 'authenticated');
create policy "Allow authenticated select" on public.groq_usage for select using (auth.role() = 'authenticated');
create policy "Allow authenticated select" on public.system_health for select using (auth.role() = 'authenticated');

-- Summary function
create or replace function public.analytics_summary()
returns table (
  visitors_total bigint,
  sessions_total bigint,
  page_views_total bigint,
  analyses_total bigint,
  average_score numeric,
  last_activity timestamptz
) language sql stable as $$
select
  (select count(*) from public.visitors) as visitors_total,
  (select count(*) from public.sessions) as sessions_total,
  (select count(*) from public.page_views) as page_views_total,
  (select count(*) from public.analyses) as analyses_total,
  (select avg(final_score) from public.analyses) as average_score,
  (select max(timestamp) from public.analyses) as last_activity;
$$;

-- ============================================================
-- Migration 0002: Dashboard functions and Cloudflare metadata
-- ============================================================

alter table public.visitors add column if not exists cloudflare_colo text;
alter table public.visitors add column if not exists cloudflare_asn int;
alter table public.visitors add column if not exists cloudflare_postal_code text;
alter table public.visitors add column if not exists accept_language text;

create or replace function public.analytics_dashboard_summary()
returns table (
  visitors_total bigint,
  sessions_total bigint,
  page_views_total bigint,
  analyses_total bigint,
  groq_requests_total bigint,
  total_prompt_tokens bigint,
  total_completion_tokens bigint,
  total_tokens bigint,
  average_score numeric,
  analyses_last_24h bigint,
  active_countries bigint,
  active_cities bigint,
  last_health_recorded_at timestamptz
) language sql stable as $$
select
  (select count(*) from public.visitors),
  (select count(*) from public.sessions),
  (select count(*) from public.page_views),
  (select count(*) from public.analyses),
  (select count(*) from public.groq_usage),
  (select coalesce(sum(prompt_tokens), 0) from public.groq_usage),
  (select coalesce(sum(completion_tokens), 0) from public.groq_usage),
  (select coalesce(sum(total_tokens), 0) from public.groq_usage),
  (select avg(final_score) from public.analyses),
  (select count(*) from public.analyses where timestamp > now() - interval '24 hours'),
  (select count(distinct country) from public.visitors where country is not null and country <> ''),
  (select count(distinct city) from public.visitors where city is not null and city <> ''),
  (select max(recorded_at) from public.system_health)
$$;

create or replace function public.analytics_top_countries(max_count int default 10)
returns table (country text, analyses bigint) language sql stable as $$
select v.country, count(a.*) as analyses
from public.analyses a
join public.visitors v on v.id = a.visitor_id
where v.country is not null and v.country <> ''
group by v.country
order by analyses desc
limit max_count
$$;

create or replace function public.analytics_top_cities(max_count int default 10)
returns table (city text, analyses bigint) language sql stable as $$
select v.city, count(a.*) as analyses
from public.analyses a
join public.visitors v on v.id = a.visitor_id
where v.city is not null and v.city <> ''
group by v.city
order by analyses desc
limit max_count
$$;

create or replace function public.analytics_top_names(max_count int default 10)
returns table (submitted_name text, final_score numeric, analysis_timestamp timestamptz, success boolean) language sql stable as $$
select submitted_name, final_score, timestamp, success
from public.analyses
order by timestamp desc
limit max_count
$$;

create or replace function public.analytics_recent_analyses(max_count int default 10)
returns table (
  id uuid,
  submitted_name text,
  final_score numeric,
  analysis_timestamp timestamptz,
  success boolean,
  country text,
  city text,
  model text,
  prompt_tokens int,
  completion_tokens int,
  total_tokens int
) language sql stable as $$
select
  a.id,
  a.submitted_name,
  a.final_score,
  a.timestamp,
  a.success,
  v.country,
  v.city,
  g.model,
  g.prompt_tokens,
  g.completion_tokens,
  g.total_tokens
from public.analyses a
left join public.visitors v on v.id = a.visitor_id
left join public.groq_usage g on g.analysis_id = a.id
order by a.timestamp desc
limit max_count
$$;

create or replace function public.analytics_groq_token_trends(days int default 30)
returns table (
  day date,
  requests bigint,
  prompt_tokens bigint,
  completion_tokens bigint,
  total_tokens bigint,
  average_total_tokens numeric
) language sql stable as $$
select
  date_trunc('day', request_timestamp)::date as day,
  count(*) as requests,
  sum(prompt_tokens) as prompt_tokens,
  sum(completion_tokens) as completion_tokens,
  sum(total_tokens) as total_tokens,
  avg(total_tokens) as average_total_tokens
from public.groq_usage
where request_timestamp > now() - ($1 || ' days')::interval
group by day
order by day asc
$$;

create or replace function public.analytics_system_health_recent(max_count int default 5)
returns table (
  recorded_at timestamptz,
  worker_latency_ms int,
  worker_status text,
  groq_status text,
  supabase_latency_ms int,
  api_errors int
) language sql stable as $$
select recorded_at, worker_latency_ms, worker_status, groq_status, supabase_latency_ms, api_errors
from public.system_health
order by recorded_at desc
limit max_count
$$;

create or replace function public.analytics_top_models(max_count int default 10)
returns table (model text, requests bigint, total_tokens bigint, average_latency_ms numeric) language sql stable as $$
select
  model,
  count(*) as requests,
  sum(total_tokens) as total_tokens,
  avg(latency_ms) as average_latency_ms
from public.groq_usage
group by model
order by requests desc
limit max_count
$$;