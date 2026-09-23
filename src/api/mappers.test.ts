import { describe, it, expect } from "vitest";
import {
  toHttps,
  dedupeById,
  normalizeCapacity,
  mapProduct,
  mapProductDetail,
} from "./mappers";
import { rawProducts } from "../test/mocks/products.mock";
import { rawProductDetail } from "../test/mocks/rawProductDetail.mock";

describe("toHttps", () => {
  it("converts an http URL to https", () => {
    expect(toHttps("http://api.test/image.webp")).toBe(
      "https://api.test/image.webp",
    );
  });

  it("leaves an https URL unchanged", () => {
    expect(toHttps("https://api.test/image.webp")).toBe(
      "https://api.test/image.webp",
    );
  });
});

describe("dedupeById", () => {
  it("removes the real duplicate product returned by the API", () => {
    const result = dedupeById(rawProducts);

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id)).toEqual(["SMG-S24U", "XMI-RN13P5G"]);
  });
});

describe("normalizeCapacity", () => {
  it("adds a space between the number and the unit", () => {
    expect(normalizeCapacity("128GB")).toBe("128 GB");
  });

  it("uppercases a lowercase unit", () => {
    expect(normalizeCapacity("1tb")).toBe("1 TB");
  });

  it("leaves an already normalized value unchanged", () => {
    expect(normalizeCapacity("256 GB")).toBe("256 GB");
  });
});

describe("mapProduct", () => {
  it("converts the image URL to https", () => {
    const result = mapProduct(rawProducts[0]);
    expect(result.imageUrl.startsWith("https://")).toBe(true);
  });
});

describe("mapProductDetail", () => {
  it("uses the first color option's image as the main image", () => {
    const result = mapProductDetail(rawProductDetail);
    expect(result.imageUrl).toBe("https://api.test/black.webp");
  });

  it("converts every color option's image to https", () => {
    const result = mapProductDetail(rawProductDetail);
    expect(
      result.colorOptions.every((c) => c.imageUrl.startsWith("https://")),
    ).toBe(true);
  });

  it("normalizes every storage option's capacity", () => {
    const result = mapProductDetail(rawProductDetail);
    expect(result.storageOptions.map((o) => o.capacity)).toEqual([
      "256 GB",
      "512 GB",
    ]);
  });

  it("deduplicates similar products", () => {
    const result = mapProductDetail(rawProductDetail);
    expect(result.similarProducts).toHaveLength(2);
  });
});
