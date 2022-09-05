import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './components/App'

const container = document.getElementById('app')

if (container) {
  hydrateRoot(container, <App />)
} else {
  // eslint-disable-next-line no-console
  console.error('[Error] App container possible is null or incorrect')
}

if (module.hot) {
  module.hot.accept()
}
