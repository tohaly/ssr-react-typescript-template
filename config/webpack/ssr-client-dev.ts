import path from 'path'
import webpack, { Configuration } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderClient, moduleCssLoaderClient, svgLoaderClient } from '../loaders'
import { _dev } from './ustils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const HMR_HOST = process.env.HMR_HOST
const HMR_PORT = process.env.HMR_PORT

const config: Configuration = {
  name: COMPILERS_NAME.CLIENT,
  mode: 'development',
  entry: [`webpack-hot-middleware/client?path=${HMR_HOST}:${HMR_PORT}/__webpack_hmr`, PATHS.SRC_CLIENT],
  output: {
    path: path.join(PATHS.CLIENT_BUILD, PATHS.PUBLIC_PATH),
    filename: 'bundle.js',
    publicPath: `${HMR_HOST}:${HMR_PORT}${PATHS.PUBLIC_PATH}`,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js',
  },
  optimization: {
    noEmitOnErrors: true,
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
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      moduleCssLoaderClient(_dev),
      ...svgLoaderClient,
      imageLoaderClient,
    ],
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
