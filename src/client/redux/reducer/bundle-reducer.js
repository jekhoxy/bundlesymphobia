import { BundleActionTypes, BundleStatus } from "../action/bundle-action";

const initialState = {
  suggestions: [],
  suggestionStatus: BundleStatus.unknown,
  bundleStatus: BundleStatus.unknown,
  bundleDetails: undefined,
  error: "",
};

/**
 * Bundle redux reducer
 */
export default function bundleReducer(state = initialState, action) {
  switch (action.type) {
    case BundleActionTypes.GET_BUNDLE_SUGGESTIONS: {
      return {
        ...state,
        suggestionStatus: action.status,
        suggestions:
          action.status === BundleStatus.ok ? action.suggestions : [],
        error: action.error || "",
      };
    }

    case BundleActionTypes.GET_BUNDLE_DETAILS: {
      return {
        ...state,
        suggestions: [],
        bundleStatus: action.status,
        bundleDetails:
          action.status === BundleStatus.ok ? action.bundleDetails : undefined,
        error: action.error || "",
      };
    }

    case BundleActionTypes.CLEAR_BUNDLE: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
