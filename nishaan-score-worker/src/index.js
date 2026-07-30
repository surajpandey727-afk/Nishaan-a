// Cloudflare Worker — proxies name-scoring requests to the Groq chat completion API.
// Deploy this on Cloudflare's free tier. It is the only place the API key
// and the scoring framework prompt live — never in the GitHub Pages site.
//
// Setup:
//   1. npm create cloudflare@latest nishaan-score-worker
//   2. Replace the generated worker's src/index.js with this file
//   3. wrangler secret put GROQ_API_KEY   (paste your key when prompted)
//   4. Edit ALLOWED_ORIGIN below to your live site's origin
//   5. wrangler deploy
//   6. Copy the resulting *.workers.dev URL into SCORE_ENDPOINT in the
//      website widget (nishaan_score_v2.html)

const ALLOWED_ORIGINS = new Set([
  "https://surajpandey727-afk.github.io",
  "https://nishaan-a.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://localhost:3000",
  "https://127.0.0.1:3000",
]);

function normalizeString(value) {
  return value ? String(value) : ''
}

function buildVisitorKey(request, cf) {
  return [
    normalizeString(request.headers.get('User-Agent')).slice(0, 200),
    normalizeString(request.headers.get('Accept-Language')),
    normalizeString(cf?.colo),
    normalizeString(cf?.asn),
    normalizeString(cf?.country),
    normalizeString(cf?.region),
    normalizeString(cf?.city),
    normalizeString(cf?.continent),
  ].join('|')
}

function makeUuidFromHex(hex) {
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

async function hashString(value) {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function getAnonymousIds(request, cf) {
  const visitorKey = buildVisitorKey(request, cf)
  const visitorHex = await hashString(visitorKey)
  const sessionHex = await hashString(`${visitorKey}|${new Date().toISOString().slice(0, 13)}`)

  return {
    visitor_id: makeUuidFromHex(visitorHex),
    session_id: makeUuidFromHex(sessionHex),
  }
}

function safeNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

async function recordSupabaseAnalytics(payload, env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return
  }

  const endpoint = `${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/analytics_ingest_score_event`
  const headers = {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  }

  const start = Date.now()
  try {
    await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ payload }),
    })
  } catch {
    // Fire-and-forget analytics must never affect scoring.
  } finally {
    payload.supabase_latency_ms = Date.now() - start
  }
}

const SYSTEM_PROMPT = `You are Nishaan-a™, a world-class AI Brand Strategist trained on psychology, semiotics, behavioural economics, archetypal branding, naming science, storytelling and linguistic analysis.

You do not merely score names.

You explain the strategic thinking behind every score exactly as a senior naming consultant charging thousands of pounds would.

Each explanation should be insightful, persuasive and specific to the submitted name.

Every category should read like a mini consulting report.

Avoid generic praise.
Avoid generic criticism.
Justify every score with branding logic.

Every scoring category must produce a thoughtful explanation of 40–80 words.
Never return one-line summaries.
Use the training data only as inspiration, not as text to copy.
Every category explanation must include observation, reasoning, and branding implication.
Write in a premium brand strategy tone similar to Interbrand, Landor, Pentagram, Wolff Olins, Claude Sonnet.
Avoid sounding robotic.
Never use bullet points inside explanations.
Never repeat phrases.
Every explanation must feel bespoke to the submitted name.
If the score is below 4/5, briefly explain the weakness and provide one improvement suggestion.
If the score is 4.5 or higher, highlight why it creates long-term brand equity.
Preserve exactly the existing JSON output structure. Do not rename fields or add or remove properties.

Score the given name across exactly 8 categories, each on a raw 1-5 scale (0.5 increments allowed). Ground every score in a specific reason tied to the actual sound, meaning, or structure of the name. Never give generic praise.

CATEGORIES:
1. sound - Sound & Structure: pronunciation, memorability, rhythm, length, spelling simplicity, premium feel.
2. archetype - Archetype & Emotional Rooting: which of the 12 Jungian brand archetypes (Creator, Sage, Explorer, Ruler, Magician, Innocent, Hero, Caregiver, Rebel, Lover, Everyman, Jester) the name evokes, and how believable vs forced that fit is.
3. narrative - Narrative Power: how easily an origin story, founder pitch, or campaign narrative can be built from the name.
4. culture - Cultural Resonance: global ease, Indian-market ease, any negative or offensive meanings, mispronunciation risk in either context.
5. meaning - Metaphor & Meaning: hidden meaning, symbolism, layered interpretation, emotional association.
6. engineering - Engineered Strength: how invented/constructed the name is, estimated distinctiveness and trademark ownability (do not check real registries, estimate only), searchability, domain-name probability.
7. visual - Visual-Verbal Integration: how well the name invites typography, logo, icon, motion, packaging design.
8. strategic - Strategic Fit: how well the name scales across industries (tech, luxury, fashion, food, SaaS, creative), supports geographic expansion, and flexes with future brand architecture.

For each category return raw_score (1-5, 0.5 steps) and a rationale of 40-80 words, specific to this name.

Compute weighted contribution using these fixed weights (sum to 100): sound:10, archetype:12, narrative:13, culture:12, meaning:15, engineering:13, visual:10, strategic:15.
weighted_contribution = round((raw_score / 5) * weight, 1)
weighted_total = round(sum of all weighted_contributions, 1)

Verdict bands on weighted_total: 95-100 "Exceptional" 5 stars; 85-94 "Very Strong" 4 stars; 75-84 "Strong but can improve" 3 stars; 60-74 "Average" 2 stars; below 60 "Weak" 1 star.

Write one summary: max 2 sentences, max 60 words, in the voice of a brand strategist. Direct. No hedging. No marketing fluff.

Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{"name":string,"categories":[{"key":"sound","label":"Sound & Structure","weight":10,"raw_score":number,"rationale":string},{"key":"archetype","label":"Archetype & Emotional Rooting","weight":12,"raw_score":number,"rationale":string},{"key":"narrative","label":"Narrative Power","weight":13,"raw_score":number,"rationale":string},{"key":"culture","label":"Cultural Resonance","weight":12,"raw_score":number,"rationale":string},{"key":"meaning","label":"Metaphor & Meaning","weight":15,"raw_score":number,"rationale":string},{"key":"engineering","label":"Engineered Strength","weight":13,"raw_score":number,"rationale":string},{"key":"visual","label":"Visual-Verbal Integration","weight":10,"raw_score":number,"rationale":string},{"key":"strategic","label":"Strategic Fit","weight":15,"raw_score":number,"rationale":string}],"weighted_total":number,"verdict":{"band":string,"stars":number},"summary":string}`;

function corsHeaders(origin) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://surajpandey727-afk.github.io";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) });
    }

    let name;
    try {
      const body = await request.json();
      name = (body.name || "").trim().slice(0, 80); // guard against absurd payloads
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    // Simple per-IP rate limit could be added here via Cloudflare KV if abuse becomes an issue.

    if (!env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "Scoring engine is not configured." }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let apiResponse;

    try {
      apiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an assistant that returns only valid JSON.",
            },
            {
              role: "user",
              content: `${SYSTEM_PROMPT}\n\nScore this name: "${name}"`,
            },
          ],
          temperature: 0.75,
          top_p: 0.9,
          max_tokens: 1800,
          response_format: { type: "json_object" },
        }),
      });
    } catch (error) {
      if (error.name === "AbortError") {
        return new Response(JSON.stringify({ error: "Scoring engine timeout." }), {
          status: 504,
          headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
        });
      }
      return new Response(JSON.stringify({ error: "Network failure contacting scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    } finally {
      clearTimeout(timeout);
    }

    const errText = await apiResponse.text();
    let responseJson;
    try {
      responseJson = JSON.parse(errText);
    } catch {
      return new Response(JSON.stringify({ error: "Malformed response from scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    if (!apiResponse.ok) {
      let detail = responseJson.error?.message || "Scoring engine unavailable.";
      if (apiResponse.status === 401 || apiResponse.status === 403) {
        detail = "Invalid API key for Groq.";
      } else if (apiResponse.status === 429) {
        detail = "Rate limit exceeded for Groq API.";
      }
      return new Response(JSON.stringify({ error: "Scoring engine unavailable.", detail }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const content = responseJson?.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      return new Response(JSON.stringify({ error: "Malformed response from scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(JSON.stringify({ error: "Malformed response from scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return new Response(JSON.stringify({ error: "Malformed response from scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
    });
  },
};
