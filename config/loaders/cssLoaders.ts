import { RuleSetRule } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const cssRegexp = /\.css$/

const cssModuleOptions = (isDev: boolean): Record<string, string | boolean> =>
  isDev ? { localIdentName: '[name]_[local]-[hash:base64:5]' } : { localIdentName: '[hash:base64:8]' }

export const moduleCssLoaderServer = (isDev: boolean): RuleSetRule => ({
  test: cssRegexp,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: { ...cssModuleOptions(isDev), exportOnlyLocals: true },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDev,
      },
    },
  ],
})

export const moduleCssLoaderClient = (isDev: boolean): RuleSetRule => ({
  test: cssRegexp,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: cssModuleOptions(isDev),
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: isDev,
      },
    },
  ].filter(Boolean) as RuleSetRule['use'],
})
