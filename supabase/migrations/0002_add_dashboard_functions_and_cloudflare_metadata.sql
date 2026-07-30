-- Supabase analytics migration: add Cloudflare metadata and dashboard functions

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

create or replace function public.analytics_top_countries(limit int default 10)
returns table (country text, analyses bigint) language sql stable as $$
select v.country, count(a.*) as analyses
from public.analyses a
join public.visitors v on v.id = a.visitor_id
where v.country is not null and v.country <> ''
group by v.country
order by analyses desc
limit $1
$$;

create or replace function public.analytics_top_cities(limit int default 10)
returns table (city text, analyses bigint) language sql stable as $$
select v.city, count(a.*) as analyses
from public.analyses a
join public.visitors v on v.id = a.visitor_id
where v.city is not null and v.city <> ''
group by v.city
order by analyses desc
limit $1
$$;

create or replace function public.analytics_top_names(limit int default 10)
returns table (submitted_name text, final_score numeric, timestamp timestamptz, success boolean) language sql stable as $$
select submitted_name, final_score, timestamp, success
from public.analyses
order by timestamp desc
limit $1
$$;

create or replace function public.analytics_recent_analyses(limit int default 10)
returns table (
  id uuid,
  submitted_name text,
  final_score numeric,
  timestamp timestamptz,
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
limit $1
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

create or replace function public.analytics_system_health_recent(limit int default 5)
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
limit $1
$$;

create or replace function public.analytics_top_models(limit int default 10)
returns table (model text, requests bigint, total_tokens bigint, average_latency_ms numeric) language sql stable as $$
select
  model,
  count(*) as requests,
  sum(total_tokens) as total_tokens,
  avg(latency_ms) as average_latency_ms
from public.groq_usage
group by model
order by requests desc
limit $1
$$;
