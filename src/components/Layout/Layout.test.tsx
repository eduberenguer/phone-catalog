import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { CartProvider } from "../../context/CartProvider";

describe("Layout", () => {
  it("renders the navbar and the matched route's content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<p>Page content</p>} />
            </Route>
          </Routes>
        </CartProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("link", { name: "MBST, go to home" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
