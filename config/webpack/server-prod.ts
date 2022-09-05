import { Configuration } from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { PATHS } from '../../constants'
import { COMPILERS_NAME } from './constants'
import { imageLoaderServer, moduleCssLoaderServer, svgLoaderServer, tsLoaderServer, fontLoaderServer } from '../loaders'
import { _prod } from '../utils'

const config: Configuration = {
  name: COMPILERS_NAME.SERVER,
  mode: 'production',
  devtool: false,
  entry: path.resolve(PATHS.SRC_SERVER, 'index.tsx'),
  externals: [nodeExternals()],
  output: {
    path: PATHS.SERVER_BUILD,
    filename: 'server.js',
    publicPath: PATHS.PUBLIC_PATH,
  },
  module: {
    rules: [tsLoaderServer, moduleCssLoaderServer(_prod), svgLoaderServer, imageLoaderServer, fontLoaderServer],
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
}

export default config
