import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useVehicles } from "@/hooks/data/useVehicles";
import { useFilter } from "@/contexts/filter";
import { VehicleTable } from ".";

jest.mock("@/hooks/data/useVehicles", () => ({
  useVehicles: jest.fn(),
}));

jest.mock("@/contexts/filter", () => ({
  useFilter: jest.fn(),
}));

jest.mock("../infiniteScrollContainer", () => ({
  InfiniteScrollContainer: ({
    children,
    onBottomReached,
    className,
  }: {
    children: React.ReactNode;
    onBottomReached: () => void;
    className?: string;
  }) => (
    <div data-testid="infinite-scroll-container" onClick={onBottomReached} className={className}>
      {children}
    </div>
  ),
}));

describe("VehicleTable Component", () => {
  const mockVehicles = [
    { plate: "ABC123", fleet: "Fleet1", type: "Car", model: "Model1", status: "Active" },
    { plate: "DEF456", fleet: "Fleet2", type: "Truck", model: "Model2", status: "Inactive" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "",
        type: "tracked",
      },
    });
  });

  it("renders loading state when data is pending", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    expect(screen.getByTestId("loader-icon")).toHaveClass("animate-spin");
  });

  it("renders error message when there is an error", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
      error: { message: "Failed to fetch" },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    expect(screen.getByText("Erro ao carregar veículos: Failed to fetch")).toBeInTheDocument();
  });

  it("renders empty state when no vehicles are found", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: [] }] },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    expect(screen.getByText("Nenhum veículo encontrado.")).toBeInTheDocument();
  });

  it("renders vehicle data correctly", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    expect(screen.getByText("Placa")).toBeInTheDocument();
    expect(screen.getByText("Frota")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Modelo")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getByText("Fleet1")).toBeInTheDocument();
    expect(screen.getByText("Car")).toBeInTheDocument();
    expect(screen.getByText("Model1")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("DEF456")).toBeInTheDocument();
    expect(screen.getByText("Fleet2")).toBeInTheDocument();
    expect(screen.getByText("Truck")).toBeInTheDocument();
    expect(screen.getByText("Model2")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("shows loading indicator when fetching next page", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetching: false,
      isFetchingNextPage: true,
    });

    render(<VehicleTable />);

    const loadingIndicators = screen.getAllByTestId("loader-icon-next-page");
    expect(loadingIndicators.length).toBe(1);
    expect(loadingIndicators[0]).toHaveClass("animate-spin");
  });

  it("calls fetchNextPage when scrolling to bottom", async () => {
    const fetchNextPageMock = jest.fn();

    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    const scrollContainer = screen.getByTestId("infinite-scroll-container");
    await userEvent.click(scrollContainer);

    expect(fetchNextPageMock).toHaveBeenCalled();
  });

  it("does not call fetchNextPage when no more pages", async () => {
    const fetchNextPageMock = jest.fn();

    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    const scrollContainer = screen.getByTestId("infinite-scroll-container");
    await userEvent.click(scrollContainer);

    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });

  it("does not call fetchNextPage when already fetching", async () => {
    const fetchNextPageMock = jest.fn();

    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
      isFetching: true,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    const scrollContainer = screen.getByTestId("infinite-scroll-container");
    await userEvent.click(scrollContainer);

    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });

  it("passes filter values to useVehicles hook", () => {
    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "ABC123",
        type: "others",
      },
    });

    (useVehicles as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: { pages: [{ vehicles: mockVehicles }] },
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetching: false,
      isFetchingNextPage: false,
    });

    render(<VehicleTable />);

    expect(useVehicles).toHaveBeenCalledWith({
      filter: "ABC123",
      type: "others",
    });
  });
});
