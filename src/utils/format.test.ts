import { describe, it, expect } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats whole numbers without decimals", () => {
    expect(formatPrice(1219)).toBe("1219 EUR");
  });

  it("keeps existing decimals with a dot separator", () => {
    expect(formatPrice(553.31)).toBe("553.31 EUR");
  });

  it("does not add thousands separators", () => {
    expect(formatPrice(1329)).toBe("1329 EUR");
  });
});
