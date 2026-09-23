import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("calls onChange with the typed value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Search for a smartphone"), "sam");

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith("m");
  });

  it("does not show a clear button when the input is empty", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("shows a clear button when there is a value", () => {
    render(<SearchBar value="sam" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("clears the value when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="sam" onChange={onChange} />);
    await user.click(screen.getByLabelText("Clear search"));

    expect(onChange).toHaveBeenCalledWith("");
  });
});
