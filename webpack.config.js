const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.main.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Database"
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};

//  "build-dev": "webpack --mode development --devtool source-map", --watch exists
//  "build-prod": "webpack --mode production" --watch

/* var config = {
  entry: "./src/main.js",
  output: {
    filename: "build.main.js",
    path: path.resolve(__dirname, "dist")
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    // ...
  }

  return config;
}; */
