import { RuleSetRule } from 'webpack'

const SVG_REGEXP = /\.svg$/

export const svgLoaderClient: RuleSetRule[] = [
  {
    test: SVG_REGEXP,
    type: 'asset/inline',
    resourceQuery: /url/,
  },
  {
    test: SVG_REGEXP,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] },
    loader: '@svgr/webpack',
    options: {
      typescript: true,
      ext: 'tsx',
    },
  },
]

export const svgLoaderServer: RuleSetRule = {
  ...svgLoaderClient[1],
  options: {
    emitFile: false,
  },
}
