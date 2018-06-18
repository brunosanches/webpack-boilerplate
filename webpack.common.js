const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: './src/assets/javascripts/main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/assets/views/index.pug'),
      title: 'Boilerplate Webpack'
    }),
    new ExtractTextPlugin({
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

      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // SCSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: 'inline',
                plugins: (loader) => [
                  require('autoprefixer')(),
                  require('css-mqpacker')(),
                  require('cssnano')()
                ]
              }
            },
            { loader: 'sass-loader' }
          ]
        })
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
