// var webpack = require('webpack');
//
// module.exports = {
//   entry: {
//     path: './src/main.js'
//   },
//   output: {
//     path: __dirname+'/build',
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.scss$/,
//         use: [
//           "style-loader",
//           "css-loader",
//           "sass-loader"
//         ]
//       },
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       }
//     ]
//   },
//   devtool: 'eval-source-map',
//   devServer: {
//     contentBase: './build',
//     inline: true
//   }
// }
var config = {
  entry: {
        path: __dirname + '/src/main.js',
  },
  output: {
        path: __dirname + '/../app/assets/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  var webpack = require('webpack');
  config.plugins = [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  ];
}

module.exports = config;
