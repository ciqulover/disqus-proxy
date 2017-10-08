const path = require('path')
const resolve = p => path.resolve(__dirname, p)

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index',
  output: {
    filename: 'hexo-disqus-proxy.js',
    path: resolve('./lib'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/avatars', to: resolve('./lib/avatars')}
    ])
  ]
}
