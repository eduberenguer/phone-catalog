import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Cart } from "./Cart";
import { CartProvider } from "../../context/CartProvider";
import { useCart } from "../../context/useCart";
import type { CartItem } from "../../types/cart";
import { cartItems as items } from "../../test/mocks/cartItems.mock";

function Seed({ items }: { items: CartItem[] }) {
  const { addItem } = useCart();
  return (
    <button onClick={() => items.forEach((item) => addItem(item))}>seed</button>
  );
}

async function renderCartWithItems(seedItems: CartItem[]) {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/cart"]}>
      <CartProvider>
        <Routes>
          <Route
            path="/cart"
            element={
              <>
                <Seed items={seedItems} />
                <Cart />
              </>
            }
          />
          <Route path="/" element={<p>Home page</p>} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  );

  await user.click(screen.getByText("seed"));
  return user;
}

beforeEach(() => {
  localStorage.clear();
});

describe("Cart", () => {
  it("shows an empty cart with no total or pay button", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <CartProvider>
          <Cart />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
    expect(screen.queryByText("TOTAL")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "PAY" }),
    ).not.toBeInTheDocument();
  });

  it("renders a row per item and the correct total", async () => {
    await renderCartWithItems(items);

    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
    expect(screen.getByText("2548 EUR")).toBeInTheDocument();
  });

  it("removes an item and recalculates the total", async () => {
    const user = await renderCartWithItems(items);

    await user.click(
      screen.getByRole("button", { name: "Remove Galaxy S24 Ultra" }),
    );

    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
    expect(screen.queryByText("Galaxy S24 Ultra")).not.toBeInTheDocument();
    expect(screen.getAllByText("1219 EUR")).toHaveLength(2);
  });

  it("clears the cart and navigates home when paying", async () => {
    const user = await renderCartWithItems(items);

    await user.click(screen.getByRole("button", { name: "PAY" }));

    expect(await screen.findByText("Home page")).toBeInTheDocument();
  });

  it("navigates home when continue shopping is clicked", async () => {
    const user = await renderCartWithItems(items);

    await user.click(screen.getByRole("button", { name: "CONTINUE SHOPPING" }));

    expect(await screen.findByText("Home page")).toBeInTheDocument();
  });
});
