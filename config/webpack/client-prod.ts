import path from 'path'
import { Configuration } from 'webpack'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderClient, moduleCssLoaderClient, svgLoaderClient, tsLoaderClient, fontLoaderClient } from '../loaders'
import { _prod } from '../utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: Configuration = {
  name: COMPILERS_NAME.CLIENT,
  mode: 'production',
  entry: PATHS.SRC_CLIENT,
  output: {
    path: path.join(PATHS.CLIENT_BUILD, PATHS.PUBLIC_PATH),
    filename: 'bundle.js',
    publicPath: `/`,
  },
  optimization: {
    emitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          filename: 'vendor.js',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [tsLoaderClient, moduleCssLoaderClient(_prod), ...svgLoaderClient, imageLoaderClient, fontLoaderClient],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: require.resolve('react'),
      'react-dom/client': require.resolve('react-dom/client'),
    },
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' }), new CleanWebpackPlugin()],
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
  devtool: false,
}

export default config
