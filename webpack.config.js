const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  target: "node",

  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  externals: [nodeExternals()],

  experiments: {
    topLevelAwait: true,
  },

  plugins: [new NodemonPlugin()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: ["@babel/plugin-syntax-top-level-await"],
        },
      },
    ],
  },
};
