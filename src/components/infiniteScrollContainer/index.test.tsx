import React from "react";
import { render, screen } from "@testing-library/react";
import { InfiniteScrollContainer } from "./index";
import { useInView } from "react-intersection-observer";
import "@testing-library/jest-dom";

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

describe("InfiniteScrollContainer Component", () => {
  const mockRef = jest.fn();
  let mockOnChange: (inView: boolean) => void;

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(({ onChange }) => {
      mockOnChange = onChange;
      return { ref: mockRef };
    });
  });

  it("renders children correctly", () => {
    render(
      <InfiniteScrollContainer onBottomReached={jest.fn()}>
        <div data-testid="test-child">Test Content</div>
      </InfiniteScrollContainer>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies className to container", () => {
    render(
      <InfiniteScrollContainer onBottomReached={jest.fn()} className="test-class">
        <div>Test Content</div>
      </InfiniteScrollContainer>,
    );

    const container = screen.getByText("Test Content").parentElement;
    expect(container).toHaveClass("test-class");
  });

  it("calls onBottomReached when scrolled into view", () => {
    const onBottomReachedMock = jest.fn();

    render(
      <InfiniteScrollContainer onBottomReached={onBottomReachedMock}>
        <div>Test Content</div>
      </InfiniteScrollContainer>,
    );

    expect(useInView).toHaveBeenCalledWith({
      rootMargin: "100px",
      onChange: expect.any(Function),
    });

    mockOnChange(true);

    expect(onBottomReachedMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onBottomReached when not in view", () => {
    const onBottomReachedMock = jest.fn();

    render(
      <InfiniteScrollContainer onBottomReached={onBottomReachedMock}>
        <div>Test Content</div>
      </InfiniteScrollContainer>,
    );

    mockOnChange(false);

    expect(onBottomReachedMock).not.toHaveBeenCalled();
  });

  it("attaches ref to sentinel div", () => {
    render(
      <InfiniteScrollContainer onBottomReached={jest.fn()}>
        <div>Test Content</div>
      </InfiniteScrollContainer>,
    );

    expect(mockRef).toHaveBeenCalled();
  });
});
