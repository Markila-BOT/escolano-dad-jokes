import { cleanup, render, screen } from "@testing-library/react";
import Jokes from "../components/Jokes";
import Index from "../pages";
import { MOCK_DATA_JOKES } from "./Jokes.test";

afterEach(() => {
  cleanup();
});

describe("Main Page", () => {
  it("should renders the main component", () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });

  it("should show NoData component when no data", () => {
    render(<Jokes {...{ ...MOCK_DATA_JOKES, results: [] }} />);
    expect(screen.getByTestId("no-data-main")).toBeVisible;
  });

  it("should show Pagination component when query is filled and there more than 20 jokes", () => {
    render(
      <Jokes {...{ ...MOCK_DATA_JOKES, query: "joke", total_jokes: 300 }} />
    );
    expect(screen.getByTestId("pagination-main")).toBeVisible;
  });

  it("should not show Pagination component when query is filled but theres no more than 20 jokes", () => {
    render(
      <Jokes {...{ ...MOCK_DATA_JOKES, query: "joke", total_jokes: 18 }} />
    );
    expect(screen.queryAllByTestId("pagination-main")).toBeNull;
  });

  it("should not show Pagination component when no query is filled but theres more than 20 jokes", () => {
    render(<Jokes {...{ ...MOCK_DATA_JOKES, total_jokes: 300 }} />);
    expect(screen.queryAllByTestId("pagination-main")).toBeNull;
  });
});
