import path from 'path'
import webpack, { Configuration } from 'webpack'
// import TerserPlugin from 'terser-webpack-plugin'
// import WriteFileWebpackPlugin from 'write-file-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { paths } from '../paths'
import { COMPILERS_NAME } from './constants'

const config: Configuration = {
  name: COMPILERS_NAME.CLIENT,
  mode: 'development',
  entry: [`webpack-hot-middleware/client?path=http://localhost:8501/__webpack_hmr`, paths.srcClient],
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8501/static/',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js',
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin({
    //   overlay: {
    //     sockIntegration: 'whm',
    //   },
    // }),
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
