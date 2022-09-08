import React from 'react'
import styles from './App.css'
import ServerIcon from './server.svg'

export const App: React.FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Welcome to SSR app</h1>
    <ServerIcon className={styles.icon} />
    {/* eslint-disable-next-line no-console */}
    <button className={styles.button} onClick={(): void => console.log('click')}>
      click
    </button>
  </div>
)
