import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { PhoneList } from "./PhoneList";
import { useProducts } from "../../hooks/useProducts";
import { products } from "../../test/mocks/productList.mock";

vi.mock("../../hooks/useProducts");

function renderPhoneList(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <PhoneList />
    </MemoryRouter>,
  );
}

describe("PhoneList", () => {
  it("renders the results count and a card per product", () => {
    vi.mocked(useProducts).mockReturnValue({
      products,
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    renderPhoneList();

    expect(screen.getByText("2 results")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24 Ultra")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
  });

  it("shows a skeleton grid while loading with no products yet", () => {
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      retry: vi.fn(),
    });

    renderPhoneList();

    expect(screen.queryByText("Galaxy S24 Ultra")).not.toBeInTheDocument();
    expect(screen.getByText("0 results")).toBeInTheDocument();
  });

  it("shows an error state with a retry button", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    vi.mocked(useProducts).mockReturnValue({
      products: [],
      isLoading: false,
      error: new Error("Network error"),
      retry,
    });

    renderPhoneList();
    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("shows a purchase completed message when navigated with that state", () => {
    vi.mocked(useProducts).mockReturnValue({
      products,
      isLoading: false,
      error: null,
      retry: vi.fn(),
    });

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { purchaseCompleted: true } }]}
      >
        <PhoneList />
      </MemoryRouter>,
    );

    expect(screen.getByText("Purchase completed")).toBeInTheDocument();
  });
});
