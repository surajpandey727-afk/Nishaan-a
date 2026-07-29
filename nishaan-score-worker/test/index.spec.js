import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
} from "cloudflare:test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../src";

describe("Nishaan score worker", () => {
	const originalFetch = globalThis.fetch;

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it("calls the Groq endpoint with the submitted name", async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				choices: [{ message: { content: '{"name":"Nishaana"}' } }],
			}),
			text: async () => JSON.stringify({ choices: [{ message: { content: '{"name":"Nishaana"}' } }] }),
		});
		globalThis.fetch = fetchMock;

		const request = new Request("http://example.com", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "Nishaana" }),
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, { ...env, GROQ_API_KEY: "test-key" }, ctx);
		await waitOnExecutionContext(ctx);

		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining("api.groq.com/openai/v1/chat/completions"),
			expect.objectContaining({
				method: "POST",
				headers: expect.objectContaining({ "Content-Type": "application/json" }),
			}),
		);
		const body = JSON.parse(fetchMock.mock.calls[0][1].body);
		expect(body.model).toBe("llama-3.3-70b-versatile");
		expect(body.messages[1].content).toContain("Score this name: \"Nishaana\"");
		expect(await response.json()).toEqual({ name: "Nishaana" });
	});

	it("parses valid Groq JSON text into worker response", async () => {
		const responseBody = '{"name":"RRR","categories":[{"key":"sound","label":"Sound & Structure","weight":10,"raw_score":4.5,"rationale":"Short, bold, and rhythmically strong."}],"weighted_total":90.0,"verdict":{"band":"Very Strong","stars":4},"summary":"RRR is a crisp name with strong structural clarity and distinctive sound."}';
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				choices: [{ message: { content: responseBody } }],
			}),
			text: async () => JSON.stringify({ choices: [{ message: { content: responseBody } }] }),
		});
		globalThis.fetch = fetchMock;

		const request = new Request("http://example.com", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "RRR" }),
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, { ...env, GROQ_API_KEY: "test-key" }, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual(JSON.parse(responseBody));
	});
});
