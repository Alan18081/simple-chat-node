const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'build')
  },
  devServer: {
    port: 3000
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('main.css')
  ]
};