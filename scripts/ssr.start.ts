import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import clientConfig from '../config/webpack/ssr-client-dev'
import serverConfig from '../config/webpack/ssr-server-dev'
import { asyncCompiler, findCompilerByName } from '../utils/AsyncCompiler'
import { logMessage } from '../utils/logMessage'
import { COMPILERS_NAME } from '../config/webpack/constants'
import express from 'express'
import { paths } from '../config/paths'
import nodemon from 'nodemon'

const WEBPACK_PORT =
  process.env.WEBPACK_PORT || (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501)

// const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost'

const app = express()

const start = async (): Promise<void> => {
  const publicPath = clientConfig.output?.publicPath

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
  app.use('/static', express.static(paths.clientBuild))
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
    script: `${paths.serverBuild}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client', '**/locales', '**/tmp'],
    delay: 200,
  })

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    logMessage('Process ended')
    process.exit()
  })

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error')
    process.exit(1)
  })
}

start().then(() => logMessage('then'))