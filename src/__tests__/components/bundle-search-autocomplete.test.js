import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { BundleSearchAutocomplete } from "../../client/component/bundle/bundle-search-autocomplete";
import { BundleStatus } from "../../client/redux/action/bundle-action";

describe("Test BundleSearchAutocomplete component", () => {
  it("should render", () => {
    const component = render(<BundleSearchAutocomplete suggestions={[]} />);

    expect(component).toMatchSnapshot();
  });

  it("should open suggestions panel", async () => {
    const suggestions = [
      { name: "suggest1", description: "description 1" },
      { name: "suggest2", description: "description 2" },
      { name: "suggest3", description: "description 3" },
    ];

    const { getByPlaceholderText, queryAllByText } = render(
      <BundleSearchAutocomplete suggestions={suggestions} />
    );

    fireEvent.click(getByPlaceholderText("Find a package"));

    const suggestionsElements = queryAllByText(/suggest/i);
    expect(suggestionsElements.length).toBe(3);
  });

  it("should display the bundle name & version", () => {
    const { getByPlaceholderText } = render(
      <BundleSearchAutocomplete
        suggestions={[]}
        bundle="react"
        version="1.0.0"
      />
    );

    expect(getByPlaceholderText("Find a package").getAttribute("value")).toBe(
      "react@1.0.0"
    );
  });

  it("should display an error", () => {
    const { queryByText } = render(
      <BundleSearchAutocomplete
        suggestions={[]}
        suggestionStatus={BundleStatus.error}
        error="Error message"
      />
    );

    expect(queryByText("Error message")).not.toBeNull();
  });

  it("should display a refresh icon", () => {
    const component = render(
      <BundleSearchAutocomplete
        suggestions={[]}
        suggestionStatus={BundleStatus.inProgress}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
