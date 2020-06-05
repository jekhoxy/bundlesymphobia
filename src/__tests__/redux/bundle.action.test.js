import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  BundleActionTypes,
  BundleStatus,
  getBundleDetailsAction,
  getBundleSuggestionsAction,
} from "../../client/redux/action/bundle-action";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
const suggestions = ["suggest1", "suggest2", "suggest3"];

jest.mock("axios");

describe("Test bundle async action creators", () => {
  const initialState = {
    suggestions: [],
    suggestionStatus: "unknown",
    bundleStatus: "unknown",
    bundleDetails: undefined,
    error: "",
  };

  beforeEach(() => {
    // Reset store
    store = mockStore(initialState);
  });

  it("creates GET_BUNDLE_SUGGESTIONS when fetching suggestions has been done", () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: suggestions,
      })
    );

    const expectedActions = [
      {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.inProgress,
      },
      {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        suggestions,
        status: BundleStatus.ok,
      },
    ];

    return store.dispatch(getBundleSuggestionsAction("testBundle")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_BUNDLE_SUGGESTIONS with error (status  != 200", () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      })
    );

    const expectedActions = [
      {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.inProgress,
      },
      {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.error,
        error: "Service unavailable, retry later (Error)",
      },
    ];

    return store.dispatch(getBundleSuggestionsAction("testBundle")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_BUNDLE_DETAILS with ok status", () => {
    const testBundle = {
      name: "testBundle",
      version: "1.0.0",
      description: "bundle description",
      sizes: [],
    };

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: testBundle,
      })
    );

    const expectedActions = [
      {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.inProgress,
      },
      {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.ok,
        bundleDetails: testBundle,
      },
    ];

    return store.dispatch(getBundleDetailsAction("testBundle")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_BUNDLE_DETAILS with error", () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      })
    );

    const expectedActions = [
      {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.inProgress,
      },
      {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.error,
        error: "Service failed to build bundle testBundle: Error",
      },
    ];

    return store.dispatch(getBundleDetailsAction("testBundle")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
