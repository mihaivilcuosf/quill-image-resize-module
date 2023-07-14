const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: "./src/ImageResize.js",
	output: {
		path: __dirname,
		library: 'ImageResize',
		libraryTarget: 'window',
		filename: "image-resize.js"
	},
	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin({
			extractComments: false
		})],
	},
	externals: {
		quill: ['exports', 'Quill'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'src'),
				exclude: /(node_modules|bower_components)/,
				use: [{
					loader: 'babel-loader',
					options: {
						"presets": [['@babel/preset-env', { targets: "defaults" }]],
						"plugins": ["babel-plugin-transform-class-properties"]
					}
				}]
			},
			{
				test: /\.svg$/,
				use: [{
					loader: 'raw-loader'
				}]
			}
		]
	}
};
