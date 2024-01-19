/* eslint-disable */
const Path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const { PORT } = require('./config')
const common = require('./webpack.comm.js')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	output: {
		chunkFilename: 'js/[name].chunk.js',
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: false
		}
	},
	devServer: {
		// open: 'chrome',
		port: PORT,
		historyApiFallback: {
			hot: true,
			index: '/'
			//	rewrites: [ { from: '*', to: 'index.html' } ]
		}
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		rules: [
			{
				test: /\.(js)$/,
				include: Path.resolve(__dirname, '../src'),
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					emitWarning: true
				}
			},
			{
				test: /\.(js)$/,
				include: Path.resolve(__dirname, '../src'),
				loader: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i, // /\.s?css$/i,
				use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
			}
		]
	}
})

