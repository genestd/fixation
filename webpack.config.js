var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('webpack-html-plugin');
//var CopyWebpackPlugin = require('copy-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/server/views/index.html',
  filename: 'index.html',
  inject: 'body'
});
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports={
  devtool: "source-map",
  entry: [
    './client/src/index.js'
  ],
  output: {
    path: __dirname + '/client/dist',
    //publicPath: './dist',
    filename: "index_bundle.js"
  },
  devServer: {
    contentBase: __dirname + '/server/views',
    port: 8081
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css?$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass?sourceMap' ]}
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    // new CopyWebpackPlugin([
    //         { from: './src/icons', to: 'icons' },
    //         { from: './src/styles/entypo', to: 'styles/entypo'},
    //         { from: './src/*.png'},
    //         { from: './src/*.xml'},
    //         { from: './src/*.svg'},
    //         { from: './src/*.ico'}
    //     ]),
    // new ExtractTextPlugin("styles.css")
  ]
};
