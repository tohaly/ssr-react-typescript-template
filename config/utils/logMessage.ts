import chalk from 'chalk'

type MessageLevels = 'info' | 'error' | 'warning' | 'success'

export const logMessage = (message: string, level: MessageLevels = 'info'): void => {
  const time = new Date().toLocaleDateString(undefined, {
    hour: '2-digit',
    minute: 'numeric',
  })

  const color =
    level === 'error'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'info'
      ? 'blue'
      : level === 'success'
      ? 'green'
      : 'white'
  // eslint-disable-next-line no-console
  console.log(`[${time}]`, chalk[color](message))
}
