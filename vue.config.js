const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

// const resolve = dir => path.join(__dirname, dir)

const productionGzipExtensions = ['js', 'css']
const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import ('@vue/cli-service').ProjectOptions}
 */
const config = {
  // 项目部署路径
  publicPath: '/',
  configureWebpack: config => {
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
  chainWebpack: config => {
    // 生产环境
    if (process.env.NODE_ENV === 'production') {
      // webpack打包分析
      if (process.env.npm_lifecycle_event === 'analyze') {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
    }

    // 打包速度插件
    config.plugin('speed')
      .use(SpeedMeasurePlugin)

    // 引用dll文件
    config.plugin('vendorDll1')
      .use(webpack.DllReferencePlugin, [
        {
          context: __dirname,
          manifest: require('./public/vender/other_vendor.manifest.json')
        }
      ])

    config.plugin('vendorDll2')
      .use(webpack.DllReferencePlugin, [
        {
          context: __dirname,
          manifest: require('./public/vender/vue_vendor.manifest.json')
        }
      ])

    // 将dll下的文件自动插入到index.html中
    config.plugin('asset')
      .use(AddAssetHtmlWebpackPlugin, [
        [
          {
            filepath: path.resolve(__dirname, 'public/vender/vue_vendor.dll.js'),
            outputPath: 'vender',
            publicPath: '/vender'
          },
          {
            filepath: path.resolve(__dirname, 'public/vender/other_vendor.dll.js'),
            outputPath: 'vender',
            publicPath: '/vender'
          }
        ]
      ])
  },
  // 打包时不生成.map文件, 测试环境使用 npm run preproduct 命令，生成带sourceMap的打包文件
  productionSourceMap: process.env.npm_lifecycle_event === 'preproduct',
  // 启用dll,动态库文件每次打包生成的vendor的[chunkhash]值就会一样,
  // 用于后期迭代时 vendor 缓存.
  // dll: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  // 显示使用Babel转换node_modules中安装的依赖
  transpileDependencies: [],
  devServer: {
    https: false,
    port: 8099, // 端口号
    sockHost: 'http://127.0.0.1:8080/',
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: 'http://192.168.20.19:8080/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_URL}`]: ''
        }
      }
    }
  }
}

module.exports = config
