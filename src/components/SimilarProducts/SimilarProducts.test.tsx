import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SimilarProducts } from "./SimilarProducts";
import { products } from "../../test/mocks/productList.mock";

describe("SimilarProducts", () => {
  it("renders nothing when there are no similar products", () => {
    const { container } = render(
      <MemoryRouter>
        <SimilarProducts products={[]} />
      </MemoryRouter>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders a heading and a card per product", () => {
    render(
      <MemoryRouter>
        <SimilarProducts products={products} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Similar items")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
  });
});
