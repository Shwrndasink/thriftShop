const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
	  app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './bundle.js'
  },
  devServer: {
	contentBase: path.resolve(__dirname, './src')
  },
  module: {
    rules: [
      {
		  test: /\.(js|jsx)$/,
		  exclude: [/node_modules/],
		  use: [{
			  loader: 'babel-loader',
			  options: {presets: ['es2015']}
		  }]
  	  },
	  {
		  test: /\.scss$/,
		  use: ExtractTextPlugin.extract({
			  fallback: 'style-loader',
			  use: ['style-loader', 'css-loader', 'sass-loader']
		  })
	  }
    ]
  },
  plugins: [
	new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './html/index.html'}),
]
};

module.exports = config;
