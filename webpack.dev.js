const path = require("path");
const common = require("./webpack.config");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = merge(common, {
  mode: "development"
  //devServer: {
  /* contentBase: 'src', */
  /* hot: true */

  //},
  /* devtool: 'source-map', */
});
