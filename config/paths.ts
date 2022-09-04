import fs from 'fs'

export const rootPath = fs.realpathSync(process.cwd())

export const resolvePath = (path: string): string => `${rootPath}/${path}`

export const paths = {
  publicPath: '/static/',
  srcClient: resolvePath('src/client'),
  clientBuild: resolvePath('build/client'),
  appHtml: resolvePath('src/client/template.html'),
  srcServer: resolvePath('src/server'),
  serverBuild: resolvePath('build/server'),
} as const
