// Cloudflare Worker — proxies name-scoring requests to the Anthropic API.
// Deploy this on Cloudflare's free tier. It is the only place the API key
// and the scoring framework prompt live — never in the GitHub Pages site.
//
// Setup:
//   1. npm create cloudflare@latest nishaan-score-worker
//   2. Replace the generated worker's src/index.js with this file
//   3. wrangler secret put ANTHROPIC_API_KEY   (paste your key when prompted)
//   4. Edit ALLOWED_ORIGIN below to your live site's origin
//   5. wrangler deploy
//   6. Copy the resulting *.workers.dev URL into SCORE_ENDPOINT in the
//      website widget (nishaan_score_v2.html)

const ALLOWED_ORIGIN = "https://surajpandey727-afk.github.io"; // change if you move to nishaan-a.com

const SYSTEM_PROMPT = `You are the Nishaan Score Engine, nishaan-a's proprietary brand-naming diagnostic. You are a scoring instrument, not a conversational assistant. Apply nishaan-a's naming framework with strategist rigor and zero flattery.

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

For each category return raw_score (1-5, 0.5 steps) and a rationale (one sentence, max 25 words, specific to this name).

Compute weighted contribution using these fixed weights (sum to 100): sound:10, archetype:12, narrative:13, culture:12, meaning:15, engineering:13, visual:10, strategic:15.
weighted_contribution = round((raw_score / 5) * weight, 1)
weighted_total = round(sum of all weighted_contributions, 1)

Verdict bands on weighted_total: 95-100 "Exceptional" 5 stars; 85-94 "Very Strong" 4 stars; 75-84 "Strong but can improve" 3 stars; 60-74 "Average" 2 stars; below 60 "Weak" 1 star.

Write one summary: max 2 sentences, max 60 words, in the voice of a brand strategist. Direct. No hedging. No marketing fluff.

Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{"name":string,"categories":[{"key":"sound","label":"Sound & Structure","weight":10,"raw_score":number,"rationale":string},{"key":"archetype","label":"Archetype & Emotional Rooting","weight":12,"raw_score":number,"rationale":string},{"key":"narrative","label":"Narrative Power","weight":13,"raw_score":number,"rationale":string},{"key":"culture","label":"Cultural Resonance","weight":12,"raw_score":number,"rationale":string},{"key":"meaning","label":"Metaphor & Meaning","weight":15,"raw_score":number,"rationale":string},{"key":"engineering","label":"Engineered Strength","weight":13,"raw_score":number,"rationale":string},{"key":"visual","label":"Visual-Verbal Integration","weight":10,"raw_score":number,"rationale":string},{"key":"strategic","label":"Strategic Fit","weight":15,"raw_score":number,"rationale":string}],"weighted_total":number,"verdict":{"band":string,"stars":number},"summary":string}`;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

    const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Score this name: "${name}"` }],
      }),
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      return new Response(JSON.stringify({ error: "Scoring engine unavailable.", detail: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const data = await apiResponse.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    if (!textBlock) {
      return new Response(JSON.stringify({ error: "No response from scoring engine." }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    let parsed;
    try {
      const clean = textBlock.text.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
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
