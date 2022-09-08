import path from 'path'
import webpack, { Configuration } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderClient, moduleCssLoaderClient, svgLoaderClient, fontLoaderClient, tsLoaderClient } from '../loaders'
import { _dev } from '../utils'

const WEBPACK_HOST = process.env.WEBPACK_HOST
const WEBPACK_PORT = process.env.WEBPACK_PORT

const config: Configuration = {
  name: COMPILERS_NAME.CLIENT,
  mode: 'development',
  entry: [`webpack-hot-middleware/client?path=${WEBPACK_HOST}:${WEBPACK_PORT}/__webpack_hmr`, PATHS.SRC_CLIENT],
  output: {
    path: path.join(PATHS.CLIENT_BUILD, PATHS.PUBLIC_PATH),
    filename: 'bundle.js',
    publicPath: `${WEBPACK_HOST}:${WEBPACK_PORT}${PATHS.PUBLIC_PATH}`,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js',
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
    rules: [tsLoaderClient, moduleCssLoaderClient(_dev), ...svgLoaderClient, imageLoaderClient, fontLoaderClient],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: require.resolve('react'),
      'react-dom/client': require.resolve('react-dom/client'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  ],

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
  devtool: 'source-map',
  performance: {
    hints: false,
  },
}

export default config
