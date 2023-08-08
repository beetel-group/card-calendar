const path = require("path");

module.exports = ({ mode } = { mode: "production" }) => {
  return {
    mode,
    entry: "./src/index.js",
    output: {
      path: path.resolve("build"),
      filename: "index.js",
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/, loader: "css-loader" },
      ],
    },
  };
};
