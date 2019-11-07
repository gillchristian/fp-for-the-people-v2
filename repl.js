import React, {useState, useEffect} from 'react'
import MonacoEditor from 'react-monaco-editor'
import * as IOEither from 'fp-ts/lib/IOEither'
import * as IO from 'fp-ts/lib/IO'
import * as Option from 'fp-ts/lib/Option'
import {pipe} from 'fp-ts/lib/pipeable'
import {flow, identity as I} from 'fp-ts/lib/function'

import {themeKey as theme} from './theme'

const fontSize = 32

const options = {
  selectOnLineNumbers: true,
  autoIndent: true,
  autoSurround: true,
  fontSize,
  minimap: {enabled: false},
}

const resultTheme = (theme) =>
  theme === 'light'
    ? {backgroundColor: 'white', color: '#333'}
    : {backgroundColor: '#1e1e1e', color: '#d4d4d4'}

const styles = {
  result: (theme, height) => ({
    overflow: 'auto',
    width: '35%',
    margin: 0,
    padding: '15px 20px 0',
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

const showResult = (result) => (
  <span>
    {'> '}
    {result}
  </span>
)

// renderResult :: Result -> IO<React.Element>
const renderResult = ({result}) =>
  pipe(
    result,
    Option.map(showResult),
    Option.getOrElse(() => <React.Fragment />),
    IO.of,
  )

// error :: Error | any -> Error
const error = (e) => (e instanceof Error ? e : new Error('unknown error'))

// Result :: { result: Option<string> }

// We don't know what `eval` is going to do since we are arbitrarily
// running JS code (it can do anything), so it has to be `IO`
// evalIO :: String -> IOEither<Error, Result>
const evalIO = (code) =>
  IOEither.tryCatch(
    () => ({
      result: Option.fromNullable(eval(code)),
    }),
    error,
  )

// safeStringifyResult :: Result -> IOEither<Error, Result>
const safeStringifyResult = ({result: mbResult}) =>
  IOEither.tryCatch(
    () => ({
      result: Option.map((result) =>
        typeof result === 'function'
          ? `[Function ${result.name}]`
          : JSON.stringify(result, null, 2)
              .split('\n')
              .join('\n  '),
      )(mbResult),
    }),
    error,
  )

const withEnv = (mbEnv) => (code) =>
  pipe(
    mbEnv,
    Option.map((env) => `${env};${code}`),
    Option.getOrElse(() => code),
  )

// evalCodeIO :: Option<String> -> String  -> IOEither<Error, Result>
const evalCodeIO = (mbEnv) => (code) =>
  pipe(
    code,
    withEnv(mbEnv),
    evalIO,
    IOEither.chain(safeStringifyResult),
  )

const storageIO = {
  // get :: String -> IO<Option<a>>
  get: (key) => () => Option.fromNullable(localStorage.getItem(key)),
  // set :: String -> a -> IO<()>
  set: (key, value) => () => localStorage.setItem(key, value),
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

// Snippet :: {code: String, solution: String, env: String | null | undefined}

const Repl = ({snippet, language, persist: shouldPersist}) => {
  const [height, setHeight] = useState()
  const [showBtn, setShowBtn] = useState(true)
  const [code, setCode] = useState(
    pipe(
      storageIO.get(snippet.name),
      IO.map(Option.fold(() => snippet.code || '// ...', I)),
    ),
  )
  useEffect(
    pipe(
      // TODO: use `ref` instead if the editor supports it
      $('.react-monaco-editor-container .view-line'),
      IO.map(elemHeightOr('32px')),
      IO.map(setHeight),
    ),
    [],
  )
  const persist = (value) => {
    shouldPersist && storageIO.set(snippet.code, value)()
    setCode(value)
  }
  const loadSolution = () => {
    persist(snippet.solution)
    setShowBtn(false)
  }
  const loadInitial = () => {
    persist(snippet.code)
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
        width="65%"
      />
      <pre style={styles.result(theme, height)}>
        {height
          ? pipe(
              code,
              evalCodeIO(Option.fromNullable(snippet.env)),
              IOEither.fold(renderError, renderResult),
            )()
          : null}
      </pre>
    </div>
  )
}

export default Repl
