const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  // mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'build')
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname,'build')
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
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(hbs|handlebars)/,
        use: ['handlebars-loader']
      },
      {
        test: /\.(ttf|woff|eot|png|jpe?g|gif)/,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html'
      // filename: 'build/index.html'
    })
  ]
};