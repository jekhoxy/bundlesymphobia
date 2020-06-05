import { render } from "@testing-library/react";
import React from "react";
import BundleInfo from "../../client/component/bundle/bundle-info";

describe("Test BundleInfo component", () => {
  it("should render", () => {
    const component = render(
      <BundleInfo
        name="react"
        description="description"
        dependencies={3}
        repository="/path/to/repo"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
