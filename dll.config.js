const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']

module.exports = {
  mode: 'production',
  entry: {
    vue_vendor: ['vue', 'vuex', 'vue-router'],
    other_vendor: ['axios', 'element-ui']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './public/vender'),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, './public/vender/[name].manifest.json')
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
