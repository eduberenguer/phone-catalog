import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { CartProvider } from "./CartProvider";
import { useCart } from "./useCart";
import { item } from "../test/mocks/cartItem.mock";

const STORAGE_KEY = "phone-catalog:cart";

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

beforeEach(() => {
  localStorage.clear();
});

describe("CartProvider", () => {
  it("starts empty when there is nothing stored", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("adds an item and updates totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(1329);
  });

  it("removes an item by lineId", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(item);
    });
    const [added] = result.current.items;

    act(() => {
      result.current.removeItem(added.lineId);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it("empties the cart on clearCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
  });

  it("persists items to localStorage", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(item);
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0]).toMatchObject({ productId: "SMG-S24U" });
  });
});
