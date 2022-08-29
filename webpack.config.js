const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "main.js"),
  output: {
    filename: "bundle.js",
  },
};
