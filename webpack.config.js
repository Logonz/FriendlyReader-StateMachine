const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.main.js",
    path: path.resolve(__dirname, "dist")
  }
};
