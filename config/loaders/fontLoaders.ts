import { RuleSetRule } from 'webpack'

const FONT_REGEXP = /.(eot|ttf|otf|woff)$/

export const fontLoaderClient: RuleSetRule = {
  test: FONT_REGEXP,
  type: 'asset/resource',
}

export const fontLoaderServer: RuleSetRule = {
  ...fontLoaderClient,
}
