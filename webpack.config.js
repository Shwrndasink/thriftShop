const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
	  app: './index.js',
	  vendor: ['react', 'react-dom']
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
		  include: [path.resolve(__dirname, 'src/sass')],
		  use: [{
				  loader: "style-loader" // creates style nodes from JS strings
			  }, {
				  loader: "css-loader" // translates CSS into CommonJS
			  }, {
				  loader: "sass-loader" // compiles Sass to CSS
			  }]
	  }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './html/index.html'}),
	new CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.bundle.js'
	})
]
};

module.exports = config;
