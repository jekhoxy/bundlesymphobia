import { getBundleDetails, searchBundles } from "../../api/bundle-api";

/**
 * Status result for request
 */
export const BundleStatus = {
  unknown: "unknown",
  ok: "ok",
  error: "error",
  inProgress: "inProgress",
};

/**
 * Redux action types
 */
export const BundleActionTypes = {
  GET_BUNDLE_SUGGESTIONS: "GET_BUNDLE_SUGGESTIONS",
  GET_BUNDLE_DETAILS: "GET_BUNDLE_DETAILS",
  CLEAR_BUNDLE: "CLEAR_BUNDLE",
};

/**
 * Redux action to get bundle suggestions
 */
export const getBundleSuggestionsAction = (value) => {
  return (dispatch) => {
    dispatch({
      type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
      status: BundleStatus.inProgress,
    });

    return searchBundles(value)
      .then((bundles) => {
        dispatch({
          type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
          status: BundleStatus.ok,
          suggestions: bundles,
        });
      })

      .catch((error) =>
        dispatch({
          type: BundleActionTypes.GET_BUNDLE_SUGGESTIONS,
          status: BundleStatus.error,
          error: error.message,
        })
      );
  };
};

/**
 * Redux action to clear bundle suggestions and details
 */
export const clearBundleAction = () => {
  return {
    type: BundleActionTypes.CLEAR_BUNDLE,
  };
};

/**
 * Redux action to get bundle details
 */
export const getBundleDetailsAction = (bundleName) => {
  return (dispatch) => {
    dispatch({
      type: BundleActionTypes.GET_BUNDLE_DETAILS,
      status: BundleStatus.inProgress,
    });

    return getBundleDetails(bundleName)
      .then((details) => {
        return dispatch({
          type: BundleActionTypes.GET_BUNDLE_DETAILS,
          status: BundleStatus.ok,
          bundleDetails: details,
        });
      })

      .catch((error) =>
        dispatch({
          type: BundleActionTypes.GET_BUNDLE_DETAILS,
          status: BundleStatus.error,
          error: error.message,
        })
      );
  };
};
