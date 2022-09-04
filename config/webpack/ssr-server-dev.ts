import { Configuration } from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderServer, moduleCssLoaderServer, svgLoaderServer } from '../loaders'
import { _dev } from './ustils'

const config: Configuration = {
  name: COMPILERS_NAME.SERVER,
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(PATHS.SRC_SERVER, 'index.tsx'),
  externals: [nodeExternals()],
  output: {
    path: PATHS.SERVER_BUILD,
    filename: 'server.js',
    publicPath: `${process.env.HMR_HOST}:${process.env.HMR_PORT}/static/`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      moduleCssLoaderServer(_dev),
      svgLoaderServer,
      imageLoaderServer,
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
  target: 'node',
  performance: {
    hints: false,
  },
}

export default config
