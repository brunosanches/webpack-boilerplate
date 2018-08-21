const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/assets/javascripts/main.js'),
      path.resolve(__dirname, 'src/assets/stylesheets/main.scss')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/views/index.pug'),
      title: 'Boilerplate Webpack 4'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/stylesheets/[name].min.css'
    })
  ],
  module: {
    rules: [
      // PUG
      {
        test: /\.pug$/,
        use: [{
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }]
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true
          }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },

      // IMAGE
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: path.resolve(__dirname, 'src/assets/images/[name].[ext]')
            }
          }
        ]
      }
    ]
  }
}
