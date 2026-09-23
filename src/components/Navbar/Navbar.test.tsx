import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";
import { CartProvider } from "../../context/CartProvider";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  it("links the logo to home and the cart icon to /cart", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: "MBST, go to home" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Cart, 0 items" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("shows 0 items when the cart is empty", () => {
    renderNavbar();

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
