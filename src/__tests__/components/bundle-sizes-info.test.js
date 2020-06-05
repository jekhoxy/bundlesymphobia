import { render, waitForDomChange } from "@testing-library/react";
import React from "react";
import BundleSizesInfo from "../../client/component/bundle/bundle-sizes-info";

describe("Test BundleSizesInfo component", () => {
  it("should render 3 sizes", async () => {
    const component = render(
      <BundleSizesInfo
        size={{
          initialSize: 10000,
          minifySize: 5000,
          gzipSize: 2000,
        }}
      />
    );

    await waitForDomChange(() => {
      expect(component).toMatchSnapshot();
      expect(component.getByText(/initial/i)).not.toBeNull();
      expect(component.getByText(/minified/i)).not.toBeNull();
      expect(component.getByText(/gzipped/i)).not.toBeNull();
    });
  });
});
