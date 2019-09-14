const path = require('path');

const libPath = path.join(__dirname, '..', 'lib');
const publicPath = path.join(__dirname, '..', 'public');

module.exports = {
  entry: path.join(libPath, 'index.js'),
  output: {
    filename: '[name].bundle.js',
    path: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      styles: path.join(libPath, 'styles'),
      common: path.join(libPath, 'common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    contentBase: publicPath
  }
}