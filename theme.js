// import {dark as darkTheme, aspect as lightTheme} from 'mdx-deck/themes'
import {dark as darkTheme} from 'mdx-deck/themes'

import lightStyle from 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight'
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/tomorrow'

import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'

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
    style: {
      ...darkStyle,
      'pre[class*="language-"]': {
        ...darkStyle['pre[class*="language-"]'],
        padding: '.5em',
        paddingBottom: 0,
        margin: 0,
      },
    },
    languages: {
      typescript,
      javascript,
    },
  },
}

export const light = {
  // ...lightTheme,
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
        padding: '.5em',
        paddingBottom: 0,
        margin: 0,
      },
    },
    languages: {
      typescript,
      javascript,
    },
  },
}

export const themeKey = 'light'
// export const themeKey = 'dark'

export default (themeKey === 'dark' ? dark : light)
