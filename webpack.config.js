const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index-test.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  }
};

const productionConfig = merge([
  ...

  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),

]);

const developmentConfig = merge([
  ...

  parts.loadImages(),

]);
