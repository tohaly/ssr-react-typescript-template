import React from 'react'

type Props = {
  cssScripts: string[]
  jsScripts: string[]
  innerHtml: string
}

export const Html: React.FC<React.PropsWithChildren<Props>> = ({ cssScripts, jsScripts, innerHtml }) => {
  return (
    <html lang='ru'>
      <head>
        <title>SSR APP</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {cssScripts.filter(Boolean).map((href) => (
          <link key={href} rel='stylesheet' href={href} />
        ))}
      </head>
      <body>
        {/* eslint-disable-next-line react/no-danger */}
        <div id='app' dangerouslySetInnerHTML={{ __html: innerHtml }} />
        {jsScripts.filter(Boolean).map((src) => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  )
}
