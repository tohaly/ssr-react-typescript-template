declare module '*.css'
declare module '*.svg' {
  import React from 'react'
  export default React.FC<React.SVGProps<SVGSVGElement>>
}
declare module '*.png' {
  export default string
}
