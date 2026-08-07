-- ============================================================
-- Run this in Supabase Dashboard SQL Editor to insert sample
-- analytics data so the dashboard shows results immediately.
-- Go to: https://supabase.com/dashboard/project/azusdzavsukgaxxmvlaw/sql/new
-- ============================================================

-- Insert sample visitors
INSERT INTO public.visitors (id, first_seen, last_seen, visit_count, country, city, continent, browser, device_type)
VALUES
  ('a0000000-0000-0000-0000-000000000001', now() - interval '5 days', now() - interval '1 hour', 12, 'United Kingdom', 'London', 'Europe', 'Chrome 122.0', 'desktop'),
  ('a0000000-0000-0000-0000-000000000002', now() - interval '4 days', now() - interval '2 hours', 8, 'United States', 'New York', 'North America', 'Safari 17.3', 'mobile'),
  ('a0000000-0000-0000-0000-000000000003', now() - interval '3 days', now() - interval '3 hours', 5, 'India', 'Mumbai', 'Asia', 'Chrome 121.0', 'desktop'),
  ('a0000000-0000-0000-0000-000000000004', now() - interval '2 days', now() - interval '4 hours', 3, 'United Arab Emirates', 'Dubai', 'Asia', 'Firefox 123.0', 'desktop'),
  ('a0000000-0000-0000-0000-000000000005', now() - interval '1 day', now() - interval '5 hours', 1, 'Germany', 'Berlin', 'Europe', 'Edge 122.0', 'mobile'),
  ('a0000000-0000-0000-0000-000000000006', now() - interval '6 days', now() - interval '6 hours', 15, 'Australia', 'Sydney', 'Oceania', 'Chrome 120.0', 'desktop'),
  ('a0000000-0000-0000-0000-000000000007', now() - interval '7 days', now() - interval '7 hours', 7, 'Canada', 'Toronto', 'North America', 'Safari 17.2', 'mobile'),
  ('a0000000-0000-0000-0000-000000000008', now() - interval '5 days', now() - interval '8 hours', 4, 'Singapore', 'Singapore', 'Asia', 'Chrome 122.0', 'desktop');

-- Insert sample sessions
INSERT INTO public.sessions (id, visitor_id, start_time, end_time, duration_ms, pages_viewed, analysis_count)
SELECT
  gen_random_uuid(),
  id,
  first_seen,
  last_seen,
  floor(random() * 120000 + 30000)::int,
  floor(random() * 5 + 1)::int,
  floor(random() * 3 + 1)::int
FROM public.visitors;

-- Insert sample analyses
INSERT INTO public.analyses (id, visitor_id, session_id, timestamp, submitted_name, final_score, processing_time_ms, success)
VALUES
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000001' LIMIT 1), now() - interval '5 days', 'Tesla', 85.0, 3200, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000001' LIMIT 1), now() - interval '4 days', 'Starbucks', 72.0, 2800, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000002', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000002' LIMIT 1), now() - interval '4 days', 'Nike', 91.0, 3100, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000002', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000002' LIMIT 1), now() - interval '3 days', 'Boots', 68.0, 2900, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000003', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000003' LIMIT 1), now() - interval '3 days', 'Amazon', 88.0, 3400, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000003', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000003' LIMIT 1), now() - interval '2 days', 'Google', 94.0, 2700, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000004', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000004' LIMIT 1), now() - interval '2 days', 'Apple', 96.0, 2600, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000005', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000005' LIMIT 1), now() - interval '1 day', 'Coca-Cola', 82.0, 3300, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000006', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000006' LIMIT 1), now() - interval '6 days', 'Sony', 79.0, 3000, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000007', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000007' LIMIT 1), now() - interval '7 days', 'Disney', 90.0, 2900, true),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000008', (SELECT id FROM public.sessions WHERE visitor_id = 'a0000000-0000-0000-0000-000000000008' LIMIT 1), now() - interval '5 days', 'Microsoft', 87.0, 3100, true);

-- Insert sample Groq usage data
INSERT INTO public.groq_usage (analysis_id, model, prompt_tokens, completion_tokens, total_tokens, latency_ms, http_status, estimated_cost, request_timestamp)
SELECT
  a.id,
  'llama-3.3-70b-versatile',
  floor(random() * 800 + 400)::int,
  floor(random() * 300 + 150)::int,
  floor(random() * 1100 + 550)::int,
  floor(random() * 3000 + 1000)::int,
  200,
  round((floor(random() * 800 + 400)::int + floor(random() * 300 + 150)::int) * 0.00000015::numeric, 6),
  a.timestamp
FROM public.analyses a;

-- Insert sample system health
INSERT INTO public.system_health (worker_latency_ms, worker_status, groq_status, supabase_latency_ms, api_errors)
VALUES
  (120, 'ok', 'ok', 45, 0),
  (95, 'ok', 'ok', 52, 0),
  (150, 'ok', 'ok', 38, 1),
  (80, 'ok', 'ok', 41, 0),
  (200, 'degraded', 'ok', 55, 2);