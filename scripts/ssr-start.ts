export default {}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// import webpack, { Compiler, Configuration } from 'webpack'
// import chalk from 'chalk'
// import express from 'express'
// import nodemon from 'nodemon'
// import webpackDevMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import clientConfig from '../config/webpack/ssr-client-dev'
// import serverConfig from '../config/webpack/ssr-client-dev'
// import { paths } from '../config/paths'
//
// const WEBPACK_PORT =
//   process.env.WEBPACK_PORT || (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501)
//
// const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost'
//
// export const logMessage = (message: string, level = 'info'): void => {
//   const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : level === 'info' ? 'blue' : 'white'
//   console.log(`[${new Date().toISOString()}]`, chalk[color](message))
// }
//
// export const compilerPromise = (name: string, compiler: webpack.Compiler): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     compiler.hooks.compile.tap(name, () => {
//       logMessage(`[${name}] Compiling `)
//     })
//     compiler.hooks.done.tap(name, (stats) => {
//       if (!stats.hasErrors()) {
//         return resolve()
//       }
//       return reject(`Failed to compile ${name} ${stats.toJson()}`)
//     })
//   })
// }
//
// const app = express()
//
// const start = async (): Promise<void> => {
//   // clientConfig.entry.push(`webpack-hot-middleware/client`)
//   //
//   // @ts-ignore
//   clientConfig.output.hotUpdateMainFilename = 'updates/[fullhash].hot-update.json'
//   // @ts-ignore
//   clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[fullhash].hot-update.js'
//
//   const publicPath = clientConfig.output?.publicPath
//
//   // @ts-ignore
//   // clientConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
//   //   .join('/')
//   //   .replace(/([^:+])\/+/g, '$1/')
//
//   // if (serverConfig.output) {
//   //   serverConfig.output.publicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, publicPath]
//   //     .join('/')
//   //     .replace(/([^:+])\/+/g, '$1/')
//   // }
//
//   const multiCompiler = webpack([clientConfig, serverConfig], (err, start) => console.log(err, start))
//
//   const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'ssr-client')
//   const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'ssr-server')
//
//   // @ts-ignore
//   const clientPromise = compilerPromise('client', clientCompiler)
//   // @ts-ignore
//   const serverPromise = compilerPromise('server', serverCompiler)
//
//   const watchOptions = {
//     ignored: /node_modules/,
//     stats: clientConfig.stats,
//   }
//
//   app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     return next()
//   })
//
//   app.use(
//     // @ts-ignore
//     webpackDevMiddleware(clientCompiler, {
//       publicPath: clientConfig.output.publicPath,
//       stats: clientConfig.stats,
//       // watchOptions,
//     }),
//   )
//   // @ts-ignore
//   app.use(webpackHotMiddleware(clientCompiler))
//
//   app.use('/static', express.static(paths.clientBuild))
//
//   app.listen(WEBPACK_PORT)
//
//   // serverCompiler.watch(watchOptions, (error, stats) => {
//   //   if (!error && !stats?.hasErrors()) {
//   //     console.log(stats?.toString(serverConfig.stats))
//   //     return
//   //   }
//   //
//   //   if (error) {
//   //     logMessage(String(error), 'error')
//   //   }
//   //
//   //   if (stats?.hasErrors()) {
//   //     const info = stats.toJson()
//   //
//   //     if (info.errors) {
//   //       logMessage(String(info.errors[0]))
//   //     }
//   //   }
//   // })
//   try {
//     console.log(serverPromise)
//     await serverPromise
//     await clientPromise
//     console.log(serverPromise)
//   } catch (error) {
//     console.log('error')
//     logMessage(String(error), 'error')
//   }
//   console.log('after')
//   // const script = nodemon({
//   //   script: `${paths.serverBuild}/server.js`,
//   //   ignore: ['src', 'scripts', 'config', './*.*', 'build/client', '**/locales', '**/tmp'],
//   //   delay: 200,
//   // })
//   // //
//   // script.on('restart', () => {
//   //   logMessage('Server side app has been restarted.', 'warning')
//   // })
//   //
//   // script.on('quit', () => {
//   //   console.log('Process ended')
//   //   process.exit()
//   // })
//   //
//   // script.on('error', () => {
//   //   logMessage('An error occured. Exiting', 'error')
//   //   process.exit(1)
//   // })
// }
//
// start()
