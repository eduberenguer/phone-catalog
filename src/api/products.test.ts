import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts } from "./products";
import { ApiError } from "./client";
import { rawProducts } from "../test/mocks/products.mock";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.stubEnv("VITE_API_URL", "https://api.test");
  vi.stubEnv("VITE_API_KEY", "test-key");
  vi.stubGlobal("fetch", vi.fn());
});

describe("getProducts", () => {
  it("sends the api key header and the search query", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse([]));

    await getProducts({ search: "sam" });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.test/products?limit=20&search=sam",
      expect.objectContaining({
        headers: { "x-api-key": "test-key" },
      }),
    );
  });

  it("removes duplicate products by id", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(rawProducts));

    const result = await getProducts();

    expect(result).toHaveLength(2);
  });

  it("converts image URLs from http to https", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse(rawProducts));

    const result = await getProducts();

    expect(result.every((p) => p.imageUrl.startsWith("https://"))).toBe(true);
  });

  it("throws an ApiError with the response status on failure", async () => {
    vi.mocked(fetch).mockResolvedValue(jsonResponse({ message: "nope" }, 401));

    await expect(getProducts()).rejects.toMatchObject({
      status: 401,
    } satisfies Partial<ApiError>);
  });
});
