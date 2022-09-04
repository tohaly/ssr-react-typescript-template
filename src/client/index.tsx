import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './components/App'

const container = document.getElementById('app')

if (container) {
  hydrateRoot(container, <App />)
} else {
  console.error('warn container')
}

if (module.hot) {
  module.hot.accept()
}
