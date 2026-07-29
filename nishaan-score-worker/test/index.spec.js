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

	it("calls the Gemini endpoint with the submitted name", async () => {
		const fetchMock = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				candidates: [{ content: { parts: [{ text: '{"name":"Nishaana"}' }] } }],
			}),
			text: async () => "",
		});
		globalThis.fetch = fetchMock;

		const request = new Request("http://example.com", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "Nishaana" }),
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, { ...env, GEMINI_API_KEY: "test-key" }, ctx);
		await waitOnExecutionContext(ctx);

		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining("generativelanguage.googleapis.com"),
			expect.objectContaining({
				method: "POST",
				headers: expect.objectContaining({ "Content-Type": "application/json" }),
			}),
		);
		expect(fetchMock.mock.calls[0][1].body).toContain("Nishaana");
		expect(await response.json()).toEqual({ name: "Nishaana" });
	});
});
