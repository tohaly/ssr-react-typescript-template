import dotenv from 'dotenv'
import { rootPath } from '../constants'

export const dotEnv = () => {
    const envPath = process.env.NODE_ENV === 'development' ? '/.env.dev' : '/.env'
    dotenv.config({path: rootPath + envPath})
}

