import { Configuration } from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { _dev } from '../utils'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderServer, moduleCssLoaderServer, svgLoaderServer, tsLoaderServer, fontLoaderServer } from '../loaders'

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
    rules: [tsLoaderServer, moduleCssLoaderServer(_dev), svgLoaderServer, imageLoaderServer, fontLoaderServer],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
