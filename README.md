# BUNDLESYMPHOBIA

This project was generated with [create-react-app](https://github.com/facebook/create-react-app)

The main feature of this web app is to find a NPM package, download its 3 last versions and last major version as well,
and display sizes of these versions: initial, minify and after gzip into a bar chart.

The back-end uses public NPM API: 
- https://www.npmjs.com/search/suggestions?q=${packageName} to get suggestions modules
- https://registry.npmjs.org/pacakge/version to get package details. For further information, see docs at [Registry NPM public API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md)

Not all NPM package is intent be to be used. See [Troubleshooting](#troubleshooting) before testing the app

# Install dependencies

In root folder, run `npm install`

# Development server - Running project

In root folder, run `npm run start` to start front-end dev server at (http://localhost:3000)

To run the back-end, in root folder, run `PORT=5000 node server.js`. It will run an Express server at (http://localhost:5000). You can run/debug the server from VSCode Debug tab.

# Build

In root folder, run `npm run build` to build front-end application. It will be placed into build folder.

# Running unit tests

In root folder, run `npm run test` to execute the unit tests. They use [Jest framework](https://jestjs.io/en/) and [Testing library](https://testing-library.com/).

# Running coverage

In root folder, run `npm run coverage` to execute tests coverage. 

# Troubleshooting

The back-end is not working with all npm package. It uses [NPM registry public API](https://registry.npmjs.org) and for some package, the build cannot be done, due to (non exhaustive list): 
- NPM registry API send back a 401 status
- During the build, Webpack does not find some dependencies
- During the build, Webpack is not correctly configure to load specific files

Packages that work so far: 
- React
- Redux
- free-style
- lodash
- lens-core
- cron
- feed
