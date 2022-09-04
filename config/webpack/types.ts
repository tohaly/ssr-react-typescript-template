import { Configuration } from 'webpack'

type CliValues = {
  [k: string]: string | boolean
  mode: 'development' | 'production'
}
export type GetConfiguration = (env: unknown, cliValues: CliValues) => Configuration
