import { render, screen } from "@testing-library/react";
import NoData from "../components/NoData";

describe("NoData", () => {
  it("should renders the NoData component", () => {
    const { container } = render(<NoData />);
    expect(screen.getByTestId("no-data-main")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
