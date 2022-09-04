import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { paths } from '../../config/paths'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import { sssRender } from './middleware/sssRender'

dotenv.config()

const app = express()

// Use Nginx or Apache to serve static assets in production or remove the if() around the
// following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === 'development') {
app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))
// }

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(sssRender())

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: http://localhost:${process.env.PORT || 8500}`),
  )
})
