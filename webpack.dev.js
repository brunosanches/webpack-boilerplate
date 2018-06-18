const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    compress: true,
    port: 9000,
    stats: {
      children: false,
      modules: false
    }
  }
})
