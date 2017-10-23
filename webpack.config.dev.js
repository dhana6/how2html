var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var fs = require("fs");

module.exports = {
	entry: "./src",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
				exclude: /node-modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(jpe?g|png|svg|gif)$/,
				use: "file-loader?name=[path][name].[ext]&outputPath=images/"
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "build"),
		compress: true, //gzip
		port: 9000,
		hot: true,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "HOW2HTML",
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: "./index.html"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	]
};
