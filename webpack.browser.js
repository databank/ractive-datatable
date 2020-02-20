const webpack = require('webpack');
const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // no support for ES6+
const TerserPlugin = require('terser-webpack-plugin'); // support for ES6+ (succesor of uglify-es)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	node: false,
	node: {
		fs: 'empty'
	},
	mode: 'production',
	performance: {
		hints: false,
	},
	target: 'web',
	context: path.resolve(__dirname, 'src'),
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: false,
				//test: /\.js(\?.*)?$/i,
				test: /\.min\.js$/
			}),
		],
	},

	entry: {
		'ractive-datatable': path.resolve(__dirname, './src/index.js'),
		'ractive-datatable.min': path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: '@databank/ractive-datatable',

		// var, this, window, umd , amd, commonjs, global
		libraryTarget: 'umd',
		umdNamedDefine: true,   // Important
		libraryExport: 'default',
		globalObject: 'this',
	},
	externals: {
		ractive: {
			commonjs: 'ractive',  // require
			commonjs2: 'ractive', // require + module.exports - used by nodejs
			amd: 'ractive',
			root: 'Ractive'
		},
	},
	plugins: [
	],
	module: {
		rules: [

			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader, // extract css into files
					{
						loader: 'css-loader', // translates CSS into CommonJS
					},
					{
						loader: 'less-loader', // compiles Less to CSS
						// options: {
						//	paths: [path.resolve(__dirname, 'node_modules')],
						// 	strictMath: true,
						// 	noIeCompat: true,
						// },
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
		]
	}
}
