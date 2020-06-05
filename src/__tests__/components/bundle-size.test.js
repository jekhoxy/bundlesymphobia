import { render } from "@testing-library/react";
import React from "react";
import BundleSize from "../../client/component/bundle/bundle-size";

describe("Test BundleSize component", () => {
  it("should render", () => {
    const component = render(<BundleSize title="react" size={10000} />);

    expect(component).toMatchSnapshot();
    expect(component.getByText("kB").innerHTML).toBe("kB");
  });

  it("should render different unit", () => {
    const component = render(
      <BundleSize title="react" size={10000} unit="MB" />
    );

    expect(component).toMatchSnapshot();
    expect(component.getByText("MB").innerHTML).toBe("MB");
  });
});
