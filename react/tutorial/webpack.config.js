const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'inline-source-map',
  devtool: 'eval',
  entry: './src/app',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     React: "react",
  //     ReactDOM: "react-dom",
  //   })
  // ]
};
