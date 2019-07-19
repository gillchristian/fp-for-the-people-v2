import React, {useState, useEffect} from 'react'
import MonacoEditor from 'react-monaco-editor'
import * as IOEither from 'fp-ts/lib/IOEither'
import * as IO from 'fp-ts/lib/IO'
import * as Option from 'fp-ts/lib/Option'
import {pipe} from 'fp-ts/lib/pipeable'
import {flow, identity as I} from 'fp-ts/lib/function'

import * as snippets from './snippets'
import * as solutions from './solutions'
import {themeKey as theme} from './theme'

const fontSize = 24

const options = {
  selectOnLineNumbers: true,
  autoIndent: true,
  autoSurround: true,
  fontSize,
}

const resultTheme = (theme) =>
  theme === 'light'
    ? {backgroundColor: 'white', color: '#333'}
    : {backgroundColor: '#1e1e1e', color: '#d4d4d4'}

const styles = {
  result: (theme, height) => ({
    overflow: 'auto',
    width: '50%',
    margin: 0,
    padding: '0 20px',
    lineHeight: height || '32px',
    fontSize,
    ...resultTheme(theme),
  }),
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    textAlign: 'left',
    padding: '3%',
  },
  err: {
    color: 'red',
    fontSize: 'small',
    lineHeight: 1,
  },
  btn: (theme) => ({
    backgroundColor: 'transparent',
    border: `2px solid ${theme === 'light' ? '#333' : 'white'}`,
    outline: 'none',
    cursor: 'pointer',
    color: theme === 'light' ? '#333' : 'white',
    margin: 5,
  }),
  controls: {
    position: 'fixed',
    top: 10,
    right: 10,
    display: 'flex',
  },
}

const lineCount = (str) => str.trim().split('\n').length

const renderError = (e) =>
  IO.of(
    <div style={styles.err}>
      <p>{e.message}</p>
      <p>{e.stack}</p>
    </div>,
  )

const offset = (lines) =>
  new Array(lines - 1).fill(0).map((_, i) => <br key={i} />)

const showResult = (lines) => (result) => (
  <span>
    {offset(lines)}
    {'> '}
    {result}
  </span>
)

const renderResult = ({lines, result}) =>
  pipe(
    result,
    Option.map(showResult(lines)),
    Option.getOrElse(() => <React.Fragment />),
    IO.of,
  )

// error :: Error | any -> Error
const error = (e) => (e instanceof Error ? e : new Error('unknown error'))

const curry = `
function curry(f) {
  return (...args) =>
    args.length === f.length
      ? f(...args)
      : curry(f.bind(null, ...args))
}
`

// Result :: { lines: number, result: Option<string> }

// We don't know what `eval` is going to do since we are arbitrarily
// running JS code (it can do anything), so it has to be `IO`
// evalIO :: Bool -> String -> IOEither<Error, Result>
const evalIO = (withCurry) => (code) =>
  IOEither.tryCatch(
    () => ({
      // find last not-comment & not-empty line
      lines: withCurry ? lineCount(code) - lineCount(curry) : lineCount(code),
      result: Option.fromNullable(eval(code)),
    }),
    error,
  )

// evalIO :: Result -> IOEither<Error, Result>
const safeStringifyResult = ({lines, result}) =>
  IOEither.tryCatch(
    () => ({
      lines,
      result: Option.map((result) =>
        typeof result === 'function'
          ? `[Function ${result.name}]`
          : JSON.stringify(result, null, 2)
              .split('\n')
              .join('\n  '),
      )(result),
    }),
    error,
  )

const curryfy = (withCurry) => (code) => (withCurry ? `${curry}${code}` : code)

// evalIO :: Bool -> String  -> IOEither<Error, Result>
const evalCodeIO = (withCurry) => (code) =>
  pipe(
    code,
    curryfy(withCurry),
    evalIO(withCurry),
    IOEither.chain(safeStringifyResult),
  )

const storageIO = {
  // getItem :: String -> IO<Option<a>>
  getItem: (key) => () => Option.fromNullable(localStorage.getItem(key)),
  // setItem :: String -> a -> IO<()>
  setItem: (key, value) => () => localStorage.setItem(key, value),
}

// $ :: String -> IO<Option<DOMElement>>
const $ = (selector) => () =>
  Option.fromNullable(document.querySelector(selector))

// heightOr :: Option<DOMElement> -> String
const elemHeightOr = (or) =>
  flow(
    Option.mapNullable((l) => l.style),
    Option.mapNullable((s) => s.height),
    Option.getOrElse(() => or),
  )

const Repl = ({snippet, language, persist: shouldPersist, withCurry}) => {
  const [height, setHeight] = useState()
  const [showBtn, setShowBtn] = useState(true)
  const [code, setCode] = useState(
    pipe(
      storageIO.getItem(snippet),
      IO.map(Option.fold(() => snippets[snippet] || '// ...', I)),
    ),
  )
  useEffect(
    pipe(
      $('.react-monaco-editor-container .view-line'),
      IO.map(elemHeightOr('32px')),
      IO.map(setHeight),
    ),
    [],
  )
  const persist = (value) => {
    shouldPersist && storageIO.setItem(snippet, value)()
    setCode(value)
  }
  const loadSolution = () => {
    persist(solutions[snippet])
    setShowBtn(false)
  }
  const loadInitial = () => {
    persist(snippets[snippet])
    setShowBtn(true)
  }

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        {showBtn && (
          <button onClick={loadSolution} style={styles.btn(theme)}>
            Show solution
          </button>
        )}
        <button onClick={loadInitial} style={styles.btn(theme)}>
          Load initial
        </button>
      </div>
      <MonacoEditor
        theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
        language={language || 'javascript'}
        value={code}
        onChange={(code, _event) => persist(code)}
        options={options}
        width="50%"
      />
      <pre style={styles.result(theme, height)}>
        {height
          ? pipe(
              code,
              evalCodeIO(withCurry),
              IOEither.fold(renderError, renderResult),
            )()
          : null}
      </pre>
    </div>
  )
}

export default Repl
