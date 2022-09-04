import React from 'react'
import { Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import { Html } from '../template'
import { App } from '../../client/components/App'

export const sssRender =
  () =>
  (req: Request, res: Response): Response => {
    const cssScripts: string[] = ['http://localhost:8501/static/main.css']
    const jsScripts = ['http://localhost:8501/static/bundle.js', 'http://localhost:8501/static/vendor.js']
    const appMarkup = renderToString(<App />)
    const html = renderToString(<Html cssScripts={cssScripts} jsScripts={jsScripts} innerHtml={appMarkup} />)
    const htmlMarker = '<!doctype html>'

    return res.send(htmlMarker + html)
  }
