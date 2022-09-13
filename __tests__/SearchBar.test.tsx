import { render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("should renders the SearchBar component", () => {
    const { container } = render(<SearchBar query="" setQuery={() => {}} />);
    expect(screen.getByTestId("search-bar-main")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
