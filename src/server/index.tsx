import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dotEnv, logMessage } from '../../config/utils'

dotEnv()

import { PATHS } from '../../constants'
import { sssRender } from './middleware/sssRender'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(PATHS.PUBLIC_PATH, express.static(path.join(PATHS.CLIENT_BUILD, PATHS.PUBLIC_PATH)))
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(sssRender())

const port = process.env.PORT || 3000

app.listen(port, () => {
  logMessage(`App is running: http://localhost:${port}`, 'success')
})
