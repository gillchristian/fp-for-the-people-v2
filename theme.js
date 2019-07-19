import {dark as darkTheme, aspect as lightTheme} from 'mdx-deck/themes'

import lightStyle from 'react-syntax-highlighter/dist/styles/prism/solarizedlight'
import darkStyle from 'react-syntax-highlighter/dist/styles/prism/tomorrow'

import typescript from 'react-syntax-highlighter/dist/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/languages/prism/javascript'

export const dark = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    background: '#2d2d2d',
    pre: '#00cdf1',
    code: '#00cdf1',
    link: '#fff',
  },
  prism: {
    style: darkStyle,
    languages: {
      typescript,
      javascript,
    },
  },
}

export const light = {
  colors: {
    color: '#2d2d2d',
    background: 'rgb(253, 246, 227)',
    pre: '#07c',
    code: '#07c',
    link: '#2d2d2d',
  },
  prism: {
    style: {
      ...lightStyle,
      'pre[class*="language-"]': {
        ...lightStyle['pre[class*="language-"]'],
        borderRadius: 0,
        padding: '.5em .75em',
      }
    },
    languages: {
      typescript,
      javascript,
    },
  },
}

// export const themeKey = 'light'
export const themeKey = 'dark'

export default themeKey === 'dark' ? dark : light
