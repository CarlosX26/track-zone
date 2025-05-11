import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Filters } from "./index";
import { userEvent } from "@testing-library/user-event";
import { useFilter } from "@/contexts/filter";
import { toast } from "sonner";
import "@testing-library/jest-dom";

jest.mock("@/contexts/filter", () => ({
  useFilter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("Filters Component", () => {
  const handleSearchMock = jest.fn();
  const handleTypeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "",
        type: "tracked",
      },
      handleSearch: handleSearchMock,
      handleType: handleTypeMock,
    });
  });

  it("renders the filters component with correct elements", () => {
    render(<Filters />);

    expect(screen.getByText("Lista")).toBeInTheDocument();

    expect(screen.getByText("Rastreados")).toBeInTheDocument();
    expect(screen.getByText("Outros")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Buscar por placa ou frota")).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows search icon when no search is active", () => {
    render(<Filters />);

    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton.querySelector("svg")).toBeInTheDocument();
  });

  it("shows clear icon when search is active", () => {
    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "ABC123",
        type: "tracked",
      },
      handleSearch: handleSearchMock,
      handleType: handleTypeMock,
    });

    render(<Filters />);

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();
    expect(clearButton.querySelector("svg")).toBeInTheDocument();
  });

  it("calls handleType when toggle group value changes", async () => {
    render(<Filters />);

    const othersToggle = screen.getByText("Outros");
    await userEvent.click(othersToggle);

    expect(handleTypeMock).toHaveBeenCalledWith("others");
  });

  it("shows error toast when submitting with invalid search", async () => {
    render(<Filters />);

    const searchInput = screen.getByPlaceholderText("Buscar por placa ou frota");
    const searchButton = screen.getByRole("button");

    await userEvent.type(searchInput, "AB");

    await userEvent.click(searchButton);

    expect(toast.error).toHaveBeenCalledWith("Insira placa ou frota.");

    expect(handleSearchMock).not.toHaveBeenCalled();
  });

  it("calls handleSearch with search value when submitting valid search", async () => {
    render(<Filters />);

    const searchInput = screen.getByPlaceholderText("Buscar por placa ou frota");
    const searchButton = screen.getByRole("button");

    await userEvent.type(searchInput, "ABC123");

    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(handleSearchMock).toHaveBeenCalledWith("ABC123");
    });
  });

  it("clears search when clicking button with active search", async () => {
    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "ABC123",
        type: "tracked",
      },
      handleSearch: handleSearchMock,
      handleType: handleTypeMock,
    });

    render(<Filters />);

    const clearButton = screen.getByRole("button");

    await userEvent.click(clearButton);

    expect(handleSearchMock).toHaveBeenCalledWith("");
  });

  it("initializes form with search value from filter context", () => {
    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "ABC123",
        type: "tracked",
      },
      handleSearch: handleSearchMock,
      handleType: handleTypeMock,
    });

    render(<Filters />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por placa ou frota",
    ) as HTMLInputElement;

    expect(searchInput.value).toBe("ABC123");
  });

  it("has the correct styling classes", () => {
    render(<Filters />);

    const container = screen.getByText("Lista").closest("div")?.parentElement;
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("flex-col");
    expect(container).toHaveClass("border-b");

    const trackedToggle = screen.getByText("Rastreados").closest("button");
    expect(trackedToggle).toHaveClass("cursor-pointer");
    expect(trackedToggle).toHaveClass("p-4");

    const searchInput = screen.getByPlaceholderText("Buscar por placa ou frota");
    expect(searchInput).toHaveClass("w-full");
    expect(searchInput).toHaveClass("sm:w-64");
    expect(searchInput).toHaveClass("mr-4");
  });
});
