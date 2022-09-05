import React from 'react'
import styles from './App.css'
import ServerIcon from './server.svg'
import wbpImage from './wbp.png'

export const App: React.FC = () => (
  <h1 className={styles.app}>
    Ssr App
    <ServerIcon />
    <img src={wbpImage} alt='wbp' />
    {new Array(10).fill(0).map((_, index) => (
      <div key={index}>{index}</div>
    ))}
  </h1>
)
