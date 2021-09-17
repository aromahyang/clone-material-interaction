const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname),
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
	mode: 'production',
};
