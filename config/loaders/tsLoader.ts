import { RuleSetRule } from 'webpack'

const TS_REGEXP = /\.tsx?$/

export const tsLoaderClient: RuleSetRule = {
  test: TS_REGEXP,
  use: 'ts-loader',
  exclude: /node_modules/,
}

export const tsLoaderServer = {
  ...tsLoaderClient,
}
