import React from 'react'
import { Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import { Html } from '../templates'
import { App } from '../../client/components/App'

export const sssRender =
  () =>
  (req: Request, res: Response): Response => {
    try {
      const port = process.env.HMR_PORT ? `:${process.env.HMR_PORT}` : ''
      const staticPath = !process.env.HMR_HOST ? '/static/' : `${process.env.HMR_HOST}${port}/static/`

      const cssScripts: string[] = [`${staticPath}main.css`]
      const jsScripts: string[] = [`${staticPath}bundle.js`, `${staticPath}vendor.js`]
      const appMarkup = renderToString(<App />)
      const html = renderToString(<Html cssScripts={cssScripts} jsScripts={jsScripts} innerHtml={appMarkup} />)
      const htmlMarker = '<!doctype html>'

      return res.send(htmlMarker + html)
    } catch {
      return res.send('error')
    }
  }
