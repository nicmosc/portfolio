const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const jsDirs = [
  path.resolve(__dirname, 'src', 'static'),
  path.resolve(__dirname, 'src', 'static', 'js'),
];


const extractCSS = new ExtractTextPlugin('styles.css');
const extractHTML = new ExtractTextPlugin('../index.html');


module.exports = {
  resolve: {
    root: jsDirs,
    extensions: ['', '.js', '.jsx', '.less'],
  },
  entry: {
    app: [
      './src/static/js/main.js'
    ],
  },
  output: {
  },
  plugins: [
    extractCSS,
    //extractHTML,
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: jsDirs,
      loaders: [
        'babel?presets[]=es2015&presets[]=stage-0',
      ]
    }, {
      test: /\.css$/,
      loader: extractCSS.extract('style', '!css!postcss'),
    }, {
      test: /\.less$/,
      loader: extractCSS.extract('style', '!css!postcss!less'),
    }, {
      test: /\.woff([^2].*)?$/,
      loader: 'file?name=/[name].[ext]',
    }, {
      test: /\.woff2(.*)?$/,
      loader: 'file?name=/[name].[ext]',
    }, {
      test: /\.ttf(.*)?$/,
      loader: 'file?name=/[name].[ext]',
    }, {
      test: /\.eot(.*)?$/,
      loader: 'file?name=/[name].[ext]',
    }, {
      test: /\.otf$/,
      loader: 'file?name=/[name].[ext]',
    }, {
      test: /\.svg(.*)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml&name=/[name].[ext]',
    }, {
      test: /\.jpg$/,
      loader: 'url?limit=10000&mimetype=image/jpg&name=/[name].[ext]',
    }, {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png&name=/[name].[ext]',
    }],
  },
  postcss: function () {
    return [autoprefixer(), cssnano()];
  }
};