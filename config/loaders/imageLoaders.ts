import { RuleSetRule } from 'webpack'

const SVG_REGEXP = /\.svg$/
const IMAGE_REGEXP = /\.(png|jpg|gif|jpeg)$/

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

export const imageLoaderClient: RuleSetRule = {
  test: IMAGE_REGEXP,
  type: 'asset/resource',
}

export const imageLoaderServer: RuleSetRule = {
  ...imageLoaderClient,
  generator: {
    emit: false,
  },
}
