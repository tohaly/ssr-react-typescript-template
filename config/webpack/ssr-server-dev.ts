import { Configuration } from 'webpack'
import { paths } from '../paths'
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { COMPILERS_NAME } from './constants'

const config: Configuration = {
  name: COMPILERS_NAME.SERVER,
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(paths.srcServer, 'index.tsx'),
  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      // whitelist: /\.css$/,
    }),
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: 'http://localhost:8501/static/',
    // libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    // alias: {
    //   react: require.resolve('react'),
    //   'react-dom/client': require.resolve('react-dom/client'),
    // },
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
