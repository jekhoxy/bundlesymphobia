import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Main from "../../client/page/main";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  suggestions: [],
};

describe("Test Main page component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("Render Main page correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Main />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
