import Axios from "axios";

/**
 *
 * @param {string} value Bundle search value to seek
 * @returns {Array} Array of Bundle that matched with the given value
 */
export async function searchBundles(value) {
  try {
    const res = await Axios.get(`/search/${value}`);

    if (res.status === 200) {
      const suggestions = await res.data;

      return Array.isArray(suggestions) ? suggestions : [];
    }

    throw new Error();
  } catch (error) {
    throw new Error(`Service unavailable, retry later (${error})`);
  }
}

/**
 *
 * @param {string} name Bundle name
 * @returns {Object} Bundle details object.
 */
export async function getBundleDetails(name) {
  try {
    const res = await Axios.get(`/bundle`, {
      params: {
        name,
      },
    });

    if (res.status === 200) {
      return res.data;
    }

    throw new Error();
  } catch (error) {
    throw new Error(`Service failed to build bundle ${name}: ${error}`);
  }

  // Exemple of return of bundle details
  //
  // return {
  //   name: "react",
  //   version: "1.4.0",
  //   description: "React is a JavaScript library for building user interfaces",
  //   dependencies: 3,
  //   repository: {
  //     type: "git",
  //     url: "git+https://github.com/facebook/react.git",
  //   },
  //   sizes: [
  //     {
  //       name: "react",
  //       version: "0.0.1",
  //       initialSize: 12000,
  //       minifySize: 7000,
  //       gzipSize: 4000,
  //     },
  //     {
  //       name: "react",
  //       version: "1.2.0",
  //       initialSize: 11500,
  //       minifySize: 6000,
  //       gzipSize: 3500,
  //     },
  //     {
  //       name: "react",
  //       version: "1.3.0",
  //       initialSize: 11000,
  //       minifySize: 5000,
  //       gzipSize: 2000,
  //     },
  //     {
  //       name: "react",
  //       version: "16.13.1",
  //       initialSize: 8000,
  //       minifySize: 3000,
  //       gzipSize: 1500,
  //     },
  //   ],
  // };
}
