import React from 'react'
import express, { Express } from 'express'
import { renderToString } from 'react-dom/server'
import { App } from '../../client/components/App'

export const serverRenderer =
  () =>
  (req: express.Request, res: express.Response): Express.Response => {
    const content = renderToString(<App />)

    return res.send('<!doctype html>' + content)
  }
