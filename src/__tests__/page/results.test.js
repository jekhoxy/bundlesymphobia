import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Results from "../../client/page/results";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  suggestions: [],
};

describe("Test Results page component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("Render Results page correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Results />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
