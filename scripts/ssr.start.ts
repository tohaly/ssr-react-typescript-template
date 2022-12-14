import fs from 'fs'
import webpack from 'webpack'
import express from 'express'
import nodemon from 'nodemon'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import openBrowser from 'open'
import { dotEnv } from '../config/utils'

dotEnv()

import clientConfig from '../config/webpack/client-dev'
import serverConfig from '../config/webpack/server-dev'
import { asyncCompiler, findCompilerByName, logMessage } from '../config/utils'
import { COMPILERS_NAME } from '../config/webpack/constants'
import { PATHS } from '../constants'

const WEBPACK_PORT = process.env.WEBPACK_PORT || 3001
const APP_HOST = process.env.APP_HOST || 'http://localhost'
const APP_PORT = process.env.APP_PORT || 3000

const app = express()

const start = async (): Promise<void> => {
  if (fs.existsSync(PATHS.ROOT_BUILD)) {
    fs.rmSync(PATHS.ROOT_BUILD, { recursive: true })
  }

  const multiCompiler = webpack([serverConfig, clientConfig])

  const clientCompiler = findCompilerByName(multiCompiler, COMPILERS_NAME.CLIENT)
  const serverCompiler = findCompilerByName(multiCompiler, COMPILERS_NAME.SERVER)

  if (!clientCompiler || !serverCompiler) {
    logMessage('One of compiler is undefined')
    return
  }

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })

  //Client compile trigger
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output?.publicPath,
      stats: clientConfig.stats,
      writeToDisk: true,
      serverSideRender: true,
    }),
  )
  app.use(webpackHotMiddleware(clientCompiler))

  //Server compile trigger
  serverCompiler.watch({ ignored: /node_modules/ }, (error, stats) => {
    if (!error && !stats?.hasErrors()) {
      // eslint-disable-next-line no-console
      console.log(stats?.toString(serverConfig.stats))
      return
    }

    if (error) {
      logMessage(String(error), 'error')
    }

    if (stats?.hasErrors()) {
      const info = stats.toJson()

      if (info.errors) {
        logMessage(String(info.errors[0]))
      }
    }
  })

  app.use(webpackHotMiddleware(clientCompiler))
  app.use('/static', express.static(PATHS.CLIENT_BUILD))
  app.listen(WEBPACK_PORT)

  try {
    await Promise.all([
      asyncCompiler(clientCompiler, COMPILERS_NAME.CLIENT, true),
      asyncCompiler(serverCompiler, COMPILERS_NAME.SERVER, true),
    ])
  } catch (error) {
    logMessage(`We has error: ${String(error)}`, 'error')
  }

  const script = nodemon({
    script: `${PATHS.SERVER_BUILD}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    delay: 200,
  })

  script.on('restart', () => {
    logMessage('SSR app restart', 'warning')
  })

  script.on('quit', () => {
    logMessage('Process ended')
    process.exit()
  })

  script.on('error', () => {
    logMessage('Exist with error.', 'error')
    process.exit(1)
  })

  setTimeout(() => {
    openBrowser(`${APP_HOST}:${APP_PORT}`).catch((err) => logMessage(err, 'error'))
  }, 2000)
}

start()
