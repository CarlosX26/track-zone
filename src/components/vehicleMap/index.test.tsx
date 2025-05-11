import React from "react";
import { render, screen } from "@testing-library/react";
import { VehicleMap } from "./index";
import { useFilter } from "@/contexts/filter";
import { useVehicles } from "@/hooks/data/useVehicles";
import { useMap } from "@vis.gl/react-google-maps";
import "@testing-library/jest-dom";

jest.mock("@/contexts/filter", () => ({
  useFilter: jest.fn(),
}));

jest.mock("@/hooks/data/useVehicles", () => ({
  useVehicles: jest.fn(),
}));

jest.mock("@vis.gl/react-google-maps", () => ({
  Map: ({
    children,
    mapId,
    defaultCenter,
    defaultZoom,
    gestureHandling,
    disableDefaultUI,
    fullscreenControl,
    zoomControl,
    style,
    ...otherProps
  }: React.PropsWithChildren<any>) => (
    <div
      data-testid="google-map"
      data-mapid={mapId}
      data-gesture-handling={gestureHandling}
      data-disable-default-ui={disableDefaultUI ? "true" : "false"}
      data-fullscreen-control={fullscreenControl ? "true" : "false"}
      data-zoom-control={zoomControl ? "true" : "false"}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  ),
  useMap: jest.fn(),
}));

jest.mock("../vehicleMarker", () => ({
  VehicleMarker: ({ vehicle }: { vehicle: any }) => (
    <div data-testid="vehicle-marker" data-vehicle={JSON.stringify(vehicle)}></div>
  ),
}));

global.google = {
  maps: {
    LatLngBounds: class LatLngBounds {
      extend = jest.fn().mockReturnThis();
    },
  },
} as any;

describe("VehicleMap Component", () => {
  const mockVehiclesWithLocation = [
    { id: "1", plate: "ABC123", lat: 10, lng: 20, direction: 90 },
    { id: "2", plate: "DEF456", lat: 30, lng: 40, direction: 180 },
  ];

  const mockFitBounds = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "",
        type: "tracked",
      },
    });

    (useVehicles as jest.Mock).mockReturnValue({
      data: {
        pages: [{ locationVehicles: mockVehiclesWithLocation }],
      },
    });

    (useMap as jest.Mock).mockReturnValue({
      fitBounds: mockFitBounds,
    });
  });

  it("renders the map component with title", () => {
    render(<VehicleMap />);

    expect(screen.getByText("Mapa rastreador")).toBeInTheDocument();
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
  });

  it("renders vehicle markers for each vehicle with location", () => {
    render(<VehicleMap />);

    const markers = screen.getAllByTestId("vehicle-marker");
    expect(markers).toHaveLength(2);

    expect(JSON.parse(markers[0].dataset.vehicle as string)).toEqual(mockVehiclesWithLocation[0]);
    expect(JSON.parse(markers[1].dataset.vehicle as string)).toEqual(mockVehiclesWithLocation[1]);
  });

  it("fits map bounds to include all vehicles when map and vehicles are available", () => {
    render(<VehicleMap />);

    expect(mockFitBounds).toHaveBeenCalled();
  });

  it("does not fit bounds when map is not available", () => {
    (useMap as jest.Mock).mockReturnValue(null);

    render(<VehicleMap />);

    expect(mockFitBounds).not.toHaveBeenCalled();
  });

  it("does not fit bounds when no vehicles with location are available", () => {
    (useVehicles as jest.Mock).mockReturnValue({
      data: {
        pages: [{ locationVehicles: [] }],
      },
    });

    render(<VehicleMap />);

    expect(mockFitBounds).not.toHaveBeenCalled();
  });

  it("passes filter values to useVehicles hook", () => {
    (useFilter as jest.Mock).mockReturnValue({
      filter: {
        search: "ABC123",
        type: "others",
      },
    });

    render(<VehicleMap />);

    expect(useVehicles).toHaveBeenCalledWith({
      filter: "ABC123",
      type: "others",
    });
  });

  it("renders map with correct props", () => {
    render(<VehicleMap />);

    const map = screen.getByTestId("google-map");

    expect(map).toHaveAttribute("data-mapid", "bf51a910020fa25a");
    expect(map).toHaveAttribute("data-gesture-handling", "greedy");
    expect(map).toHaveAttribute("data-disable-default-ui", "true");
    expect(map).toHaveAttribute("data-fullscreen-control", "true");
    expect(map).toHaveAttribute("data-zoom-control", "true");
  });
});
