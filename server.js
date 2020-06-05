const express = require("express");
const temp = require("temp");
const axios = require("axios");
const webpack = require("webpack");
const { createFsFromVolume, Volume } = require("memfs");
const path = require("path");

const fs = createFsFromVolume(new Volume());
const joinPath = require("memory-fs/lib/join");
// Bug with no join method in FS (used by Webpack)
if (!fs.join) {
  fs.join = joinPath;
}

const minify = require("babel-minify");
const gzip = require("gzip-size");
const { exec } = require("child_process");

////
// EXPRESS RUN
////
const app = express();
app.use(express.static("build"));

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

////
// ROUTES
////
app.get("/search/:value", (req, res) => {
  const searchValue = req.params.value;
  searchBundles(searchValue)
    .then((suggestions) => res.send(suggestions))
    .catch((error) => res.status(500).send(error));
});

app.get("/bundle", (req, res) => {
  const bundleName = req.query.name;
  getBundleDetails(bundleName)
    .then((details) => {
      buildBundleResults(details.name, Object.keys(details.versions))
        .then((results) => res.send(results))
        .catch((error) => {
          console.error(error);
          res.status(500).send(error);
        });
    })
    .catch((error) => res.send(error));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

////
// Cache - Server will cache bundles name/version pairs to speed requests
// name@version / bundle sizes info
const cache = new Map();

/**
 * Get cache key
 *
 * @param {string} name bundle name
 * @param {string} version bundle version
 * @returns {string} cache key
 */
function getCacheKey(name, version) {
  return `${name}@${version}`;
}

/////
// NPM API Call
/////

/**
 * NPMJS Search suggestion API call
 *
 * @param {string} searchValue Value to search
 * @returns {Array} An array of bundles that match the given search value
 */
async function searchBundles(searchValue) {
  try {
    const res = await axios.get(
      `https://www.npmjs.com/search/suggestions?q=${searchValue}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * NPMJS Registry API call to get details for the given bundle name and given version (may be null).
 * In that case, return all details for all versions of that bundle.
 * Otherwise, return details for the given bundle and version
 *
 * @param {string} bundleName bundle name
 * @param {string} version bundle version
 * @returns Bundle details (see npmjs registry documentation)
 */
async function getBundleDetails(bundleName, version) {
  try {
    const versionUrl = version ? `/${version}` : "";
    const res = await axios.get(
      `https://registry.npmjs.org/${bundleName}${versionUrl}`
    );

    if (res.status === 200) {
      return res.data;
    }
    throw new Error(`Cannot get bundle details for ${bundleName}@${version}`);
  } catch (error) {
    console.error(error);
  }
}

////
// BUSINESS FUNCTIONS
////

/**
 * Build bundle results with the 3 last versions and previous major version
 *
 * @param {string} name Bundle name
 * @param {Array<String>} versions All bundle versions
 * @returns {Object} An Object with bundle name, version, desc, repository and sizes
 */
function buildBundleResults(name, versions) {
  // Remove others than release versions
  const filteredVersion = versions.filter(
    (v) => !v.match("(0.0.0.*|alpha|beta|snapshot|rc)")
  );

  // Get 3 last versions
  const lastThreeVersions = filteredVersion.slice(filteredVersion.length - 3);
  const lastVersion = lastThreeVersions[2];

  // Get previous major version if exists
  const previousMajorVersions = filteredVersion.filter(
    (v) => parseInt(v.split(".")[0]) < parseInt(lastVersion.split(".")[0])
  );

  const versionsToBuild = lastThreeVersions;
  if (previousMajorVersions.length) {
    const lastPreviousMajorVersion =
      previousMajorVersions[previousMajorVersions.length - 1];

    if (versionsToBuild.indexOf(lastPreviousMajorVersion) < 0) {
      versionsToBuild.splice(0, 0, lastPreviousMajorVersion);
    }
  }

  return new Promise((resolve, reject) => {
    Promise.all([
      // Install, build and compute stats for each version
      ...versionsToBuild.map((version) => buildBundleStats(name, version)),

      // Get info of last version
      getBundleDetails(name, lastVersion),
    ])
      .then((stats) => {
        const details = stats.pop();

        resolve({
          name: name,
          version: lastVersion,
          description: details.description || "",
          repository: details.repository || "",
          dependencies: details.dependencies
            ? Object.keys(details.dependencies).length
            : 0,
          sizes: stats,
        });
      })
      .catch((error) => reject(error));
  });
}

/**
 * Build the given bundle and version then compute sizes (initial, minify and gzip).
 *
 * @param {string} name Bundle name
 * @param {string} version Bundle version
 * @returns {Array} An array of Object with bundle name, version, initialSize, minifySize and gzipSize
 */
async function buildBundleStats(name, version) {
  const cacheKey = getCacheKey(name, version);
  if (!cache.has(cacheKey)) {
    // Get details of this version in particular
    const details = await getBundleDetails(name, version);

    if (details) {
      // Install module
      const bundlePath = await install(name, version);

      // Build in memory with webpack
      const buildFile = await build(bundlePath, name, details.main);

      // Compute sizes
      const minified = minify(buildFile).code;
      const bundleInfos = {
        name,
        version,
        initialSize: Buffer.byteLength(buildFile),
        minifySize: Buffer.byteLength(minified),
        gzipSize: gzip.sync(buildFile),
      };

      cache.set(cacheKey, bundleInfos);
    } else {
      throw new Error("Cannot get bundle details from NPM registry");
    }
  }

  return cache.get(cacheKey);
}

/**
 * Install the given bundle by executing npm into temporary dir
 *
 * @param {string} name Bundle name
 * @param {version} version Bundle version
 * @returns {Promise<String>} a Promise with temporary path of the install
 */
function install(name, version) {
  const tempDir = temp.mkdirSync("installBundles");

  return new Promise((resolve, reject) => {
    exec(
      `npm install i --no-save --prefix ${tempDir} ${name}@${version}`,
      (error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(tempDir);
        }
      }
    );
  });
}

/**
 * Build in memory with WebPack the given bundle.
 *
 * @param {string} bundlePath Bundle path
 * @param {string} name Bundle name
 * @param {string} mainFile Bundle main file
 * @returns {string} Built file as String
 */
function build(bundlePath, name, mainFile = "index.js") {
  return new Promise((resolve, reject) => {
    const compiler = webpack({
      entry: path.join(bundlePath, "node_modules", name, mainFile),
      output: {
        filename: "bundle",
      },
      context: path.join(bundlePath),
      mode: "production",
    });

    compiler.context = path.join(bundlePath);
    compiler.outputFileSystem = fs;
    compiler.run((error, stats) => {
      if (error) {
        console.error(error);
        reject(error);
      } else if (stats.compilation.assets.bundle.existsAt) {
        resolve(fs.readFileSync(stats.compilation.assets.bundle.existsAt));
      } else {
        reject(`Error building ${name}: ${stats.compilation.errors}`);
      }
    });
  });
}
