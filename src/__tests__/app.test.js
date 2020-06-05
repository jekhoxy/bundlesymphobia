import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../client/app";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  suggestions: [],
};

const store = mockStore(initialState);

describe("Test app router", () => {
  it("should render main page with search input", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();

    const { getByPlaceholderText, getByAltText } = component;

    expect(getByPlaceholderText("Find a package")).not.toBeNull();

    expect(getByAltText("logo")).not.toBeNull();
  });

  it("should render results page with bundle info div", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/results?bundle=react&version=1.0.0"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();

    const { getByDisplayValue } = component;

    expect(getByDisplayValue("react@1.0.0")).not.toBeNull();
  });
});
