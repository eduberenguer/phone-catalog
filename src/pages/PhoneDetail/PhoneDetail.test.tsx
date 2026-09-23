import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PhoneDetail } from "./PhoneDetail";
import { useProductDetail } from "../../hooks/useProductDetail";
import { CartProvider } from "../../context/CartProvider";
import { product } from "../../test/mocks/productDetail.mock";

vi.mock("../../hooks/useProductDetail");

function renderDetail() {
  return render(
    <MemoryRouter initialEntries={["/phone/SMG-S24U"]}>
      <CartProvider>
        <Routes>
          <Route path="/phone/:id" element={<PhoneDetail />} />
          <Route path="/cart" element={<p>Cart page</p>} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.mocked(useProductDetail).mockReturnValue({
    product,
    isLoading: false,
    error: null,
    isNotFound: false,
  });
});

describe("PhoneDetail", () => {
  it("shows the price range until a storage option is selected", () => {
    renderDetail();
    expect(screen.getByText("From 1329 EUR")).toBeInTheDocument();
  });

  it("disables the add to cart button until storage and color are selected", async () => {
    const user = userEvent.setup();
    renderDetail();

    const addButton = screen.getByRole("button", { name: "Add to cart" });
    expect(addButton).toBeDisabled();

    await user.click(screen.getByText("256 GB"));
    expect(addButton).toBeDisabled();

    await user.click(screen.getByLabelText("Titanium Black"));
    expect(addButton).toBeEnabled();
  });

  it("shows the variant price once a storage option is selected", async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByText("512 GB"));

    expect(screen.getByText("1429 EUR")).toBeInTheDocument();
  });

  it("changes the displayed image when a color is selected", async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByLabelText("Titanium Violet"));

    expect(screen.getByAltText("Galaxy S24 Ultra")).toHaveAttribute(
      "src",
      "https://api.test/violet.webp",
    );
  });

  it("adds the selected variant to the cart and navigates to /cart", async () => {
    const user = userEvent.setup();
    renderDetail();

    await user.click(screen.getByText("256 GB"));
    await user.click(screen.getByLabelText("Titanium Black"));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(await screen.findByText("Cart page")).toBeInTheDocument();
  });
});
