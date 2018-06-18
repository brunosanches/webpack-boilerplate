const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path')
const common = require('./webpack.common')

module.exports = merge(common, {
  stats: {
    children: false,
    modules: false
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new WebpackShellPlugin({
      onBuildEnd: [
      ]
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/images/'),
        to: path.resolve(__dirname, 'dist/assets/images'),
        ignore: ['svgs/**'],
        cache: true
      }
    ])
  ],
  output: {
    filename: 'assets/javascripts/[name].js',
    path: path.resolve(__dirname, 'dist')
  }
})
