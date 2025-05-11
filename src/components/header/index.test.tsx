import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Header } from ".";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

const setThemeMock = jest.fn();

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: setThemeMock,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Header Component", () => {
  beforeEach(() => {
    setThemeMock.mockClear();
  });

  const renderHeader = () => {
    return render(<Header />);
  };

  it("renders the header with the correct name", () => {
    renderHeader();
    expect(screen.getByText("Carlos Jr.")).toBeInTheDocument();
  });

  it("renders the theme toggle button", () => {
    renderHeader();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("renders sun and moon icons", () => {
    renderHeader();
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("opens menu dropdown when clicking toggle button", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggleButton = screen.getByTestId("toggle-theme");
    await user.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByRole("menuitem", { name: /light/i })).toBeInTheDocument();
    });

    expect(screen.getByRole("menuitem", { name: /dark/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /system/i })).toBeInTheDocument();
  });

  it("sets theme to light when clicking light option", async () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("toggle-theme");
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByTestId("theme-light")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("theme-light"));

    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("sets theme to dark when clicking dark option", async () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("toggle-theme");
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByTestId("theme-dark")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("theme-dark"));

    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("sets theme to system when clicking system option", async () => {
    render(<Header />);

    const toggleButton = screen.getByTestId("toggle-theme");
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByTestId("theme-system")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("theme-system"));

    expect(setThemeMock).toHaveBeenCalledWith("system");
  });

  it("has the correct styling classes", () => {
    renderHeader();
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("border-2");
    expect(header).toHaveClass("mt-4");
    expect(header).toHaveClass("h-20");
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("items-center");
    expect(header).toHaveClass("justify-between");
    expect(header).toHaveClass("rounded-xl");
    expect(header).toHaveClass("bg-accent");
  });
});
