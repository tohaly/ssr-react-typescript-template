import React from 'react'
import styles from './App.css'
import ServerIcon from './server.svg'

export const App: React.FC = () => (
  <h1 className={styles.app}>
    Ssr App
    <ServerIcon />
  </h1>
)
