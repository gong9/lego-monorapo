const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../index.js'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'main.js',
    library: 'js-editor-vue',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
      chunkFilename: '[id].css'
    }),
    new VueLoaderPlugin(),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'css', 'html', 'typescript'],
      features: [],
      publicPath: path.resolve(__dirname, '../lib')
    })
  ]
}

