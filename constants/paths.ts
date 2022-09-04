import fs from 'fs'

export const rootPath = fs.realpathSync(process.cwd())

export const resolvePath = (path: string): string => `${rootPath}/${path}`

export const PATHS = {
  PUBLIC_PATH: '/static/',
  SRC_CLIENT: resolvePath('src/client'),
  CLIENT_BUILD: resolvePath('build/client'),
  APP_HTML: resolvePath('src/client/template.html'),
  SRC_SERVER: resolvePath('src/server'),
  SERVER_BUILD: resolvePath('build/server'),
  ROOT_BUILD: resolvePath('/build'),
} as const
