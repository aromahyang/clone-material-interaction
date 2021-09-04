const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
		clean: true,
	},
	plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
	mode: 'production',
};
