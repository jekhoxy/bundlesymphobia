import {
  BundleActionTypes,
  BundleStatus,
} from "../../client/redux/action/bundle-action";
import bundleReducer from "../../client/redux/reducer/bundle-reducer";

const initialState = {
  suggestions: [],
  suggestionStatus: "unknown",
  bundleStatus: "unknown",
  bundleDetails: undefined,
  error: "",
};

const testSuggestions = ["suggest1", "suggest2", "suggest3"];

describe("Redux state tests", () => {
  it("should get initial state", () => {
    expect(bundleReducer(undefined, {})).toEqual(initialState);
  });

  it("should update suggestions", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.ok,
        suggestions: testSuggestions,
      })
    ).toEqual({
      suggestions: testSuggestions,
      suggestionStatus: BundleStatus.ok,
      bundleStatus: "unknown",
      bundleDetails: undefined,
      error: "",
    });
  });

  it("should update suggestions in progress", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.inProgress,
      })
    ).toEqual({
      suggestions: [],
      suggestionStatus: BundleStatus.inProgress,
      bundleStatus: "unknown",
      bundleDetails: undefined,
      error: "",
    });
  });

  it("should update suggestions in error", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
        status: BundleStatus.error,
        error: "Error getting suggestions",
      })
    ).toEqual({
      suggestions: [],
      suggestionStatus: BundleStatus.error,
      bundleStatus: "unknown",
      bundleDetails: undefined,
      error: "Error getting suggestions",
    });
  });

  const bundleDetails = {
    name: "test bundle",
    description: "bundle description",
    version: "1.0.0",
    sizes: [
      {
        initialSize: 10,
        minifySize: 5,
        gzipSize: 3,
      },
    ],
  };

  it("should get bundle details", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.ok,
        bundleDetails,
      })
    ).toEqual({
      suggestions: [],
      suggestionStatus: BundleStatus.unknown,
      bundleStatus: BundleStatus.ok,
      bundleDetails,
      error: "",
    });
  });

  it("should get bundle details in progress", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.inProgress,
      })
    ).toEqual({
      suggestions: [],
      suggestionStatus: BundleStatus.unknown,
      bundleStatus: BundleStatus.inProgress,
      bundleDetails: undefined,
      error: "",
    });
  });

  it("should get bundle details in error", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.GET_BUNDLE_DETAILS,
        status: BundleStatus.error,
        error: "Error getting bundle details",
      })
    ).toEqual({
      suggestions: [],
      suggestionStatus: BundleStatus.unknown,
      bundleStatus: BundleStatus.error,
      bundleDetails: undefined,
      error: "Error getting bundle details",
    });
  });

  it("should clear bundle infos", () => {
    expect(
      bundleReducer(undefined, {
        type: BundleActionTypes.CLEAR_BUNDLE,
      })
    ).toEqual(initialState);
  });
});
