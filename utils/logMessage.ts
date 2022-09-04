import chalk from 'chalk'

type MessageLevels = 'info' | 'error' | 'warning'

export const logMessage = (message: string, level: MessageLevels = 'info'): void => {
  const time = new Date().toLocaleDateString(undefined, {
    hour: '2-digit',
    minute: 'numeric',
  })

  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : level === 'info' ? 'blue' : 'white'
  console.log(`[${time}]`, chalk[color](message))
}
