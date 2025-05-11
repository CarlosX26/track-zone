import React from "react";
import { render, screen } from "@testing-library/react";
import { VehicleMarker } from "./index";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({
    children,
    position,
    onMouseEnter,
    onMouseLeave,
    className,
  }: React.PropsWithChildren<any>) => (
    <div
      data-testid="advanced-marker"
      data-position={JSON.stringify(position)}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  ),
}));

describe("VehicleMarker Component", () => {
  const mockVehicle = {
    id: "1",
    fleet: "Fleet A",
    equipmentId: "eqp-789xyz",
    name: "Caminhão Baú",
    plate: "ABC1D23",
    ignition: "on",
    lat: -23.55052,
    lng: -46.633308,
    createdAt: "2025-05-07T12:34:56Z",
  };

  it("renders the marker with correct position", () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const marker = screen.getByTestId("advanced-marker");
    const position = JSON.parse(marker.dataset.position || "{}");

    expect(position).toEqual({ lat: mockVehicle.lat, lng: mockVehicle.lng });
  });

  it("renders with cursor-pointer class", () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const marker = screen.getByTestId("advanced-marker");
    expect(marker).toHaveClass("cursor-pointer");
  });

  it("renders the truck icon", () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const iconContainer = screen
      .getByTestId("advanced-marker")
      .querySelector(".bg-primary.rounded-full");
    expect(iconContainer).toBeInTheDocument();
  });

  it("does not show info popup by default", () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    expect(screen.queryByText(`Placa - ${mockVehicle.plate}`)).not.toBeInTheDocument();
    expect(screen.queryByText(`Frota - ${mockVehicle.fleet}`)).not.toBeInTheDocument();
  });

  it("shows info popup on hover", async () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const marker = screen.getByTestId("advanced-marker");

    await userEvent.hover(marker);

    expect(screen.getByText(`Placa - ${mockVehicle.plate}`)).toBeInTheDocument();
    expect(screen.getByText(`Frota - ${mockVehicle.fleet}`)).toBeInTheDocument();

    expect(
      screen.getByText(`${mockVehicle.lat.toFixed(6)}, ${mockVehicle.lng.toFixed(6)}`),
    ).toBeInTheDocument();
  });

  it("hides info popup when hover ends", async () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const marker = screen.getByTestId("advanced-marker");

    await userEvent.hover(marker);

    expect(screen.getByText(`Placa - ${mockVehicle.plate}`)).toBeInTheDocument();

    await userEvent.unhover(marker);

    expect(screen.queryByText(`Placa - ${mockVehicle.plate}`)).not.toBeInTheDocument();
  });

  it("includes a Google Maps link with correct coordinates", async () => {
    render(<VehicleMarker vehicle={mockVehicle} />);

    const marker = screen.getByTestId("advanced-marker");

    await userEvent.hover(marker);

    const link = screen.getByText("Ver no Google Maps");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `https://www.google.com/maps?q=${mockVehicle.lat},${mockVehicle.lng}`,
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
