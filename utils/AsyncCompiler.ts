import { Compiler, MultiCompiler } from 'webpack'
import { logMessage } from './logMessage'

export const findCompilerByName = (multiCompiler: MultiCompiler, name: string): Compiler | undefined =>
  multiCompiler.compilers.find((compiler) => compiler.name === name)

export const asyncCompiler = (compiler: Compiler, name: string, disableCustomCompile = false): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!compiler) {
      reject(`Compiler with name "${name}" not found `)
      return
    }

    compiler.hooks.done.tap(name, (stats) => {
      if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach(({ message, stack }) => {
          logMessage(`${message}\\n${stack}\\n`, 'warning')
        })
      }

      if (stats.hasErrors()) {
        stats.compilation.errors.forEach(({ message, stack }) => {
          logMessage(`${message}\\n${stack}\\n`, 'error')
        })

        reject('Compilation has error 🤬')
        return
      }

      const successCompilerText = `Compiled successfully [${name}]`

      logMessage(successCompilerText)
      resolve(successCompilerText)
    })

    compiler.hooks.compile.tap(name, () => {
      logMessage(`Compile [${name}]`)
    })
    //TODO remove this legacy code
    if (!disableCustomCompile) {
      compiler.compile((error) => {
        if (error) {
          reject(`[${name}] Compiler error: ${error.message}`)
        }
      })
    }
  })
}
