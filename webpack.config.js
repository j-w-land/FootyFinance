const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const assetsPluginInstance = new AssetsPlugin({ useCompilerPath: true });
const path = require("path");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
  mode: "development",
  entry: "./FootyFinance/frontend/src/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //title: 'Output Management',
      title: "Caching",
    }),
    assetsPluginInstance,
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, "./FootyFinance/frontend/static/frontend/"),
    //publicPath: "/static/frontend",
    /* publicPath: 'src', */
    filename: "./main.js",
    //filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/nodule_modules/],
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
