import React from 'react'
import styles from './App.css'
import ServerIcon from './server.svg'
import wbpImage from './wbp.png'

export const App: React.FC = () => (
  <h1 className={styles.app}>
    Ssr App
    <ServerIcon />
    <img src={wbpImage} alt='wbp' />
  </h1>
)
