import * as solutions from './solutions'

const env_curry = `
function curry(f) {
  return (...args) =>
    args.length === f.length
      ? f(...args)
      : curry(f.bind(null, ...args))
}
`

const compose_code = `// (f ∘ g)(x) = f(g(x))

const head = xs => xs[0]
const reverse = xs => [...xs].reverse()

const last = xs => head(reverse(xs))

const arr = ['Find', 'the', 'object', 'you', 'want', 'at', 'Catawiki']

last(arr)`

export const compose = {
  name: 'compose',
  code: compose_code,
  solution: solutions.compose,
}

const compose3_code = `const compose = (f, g) => (x) => f(g(x))

const join = curry((delim, xs) => xs.join(delim))
const toUpper = (str) => str.toUpperCase()
const exclaim = (str) => str + '!!!'

const siteTitle = compose(
  compose(
    exclaim,
    toUpper,
  ),
  join(' '),
)

const arr = ['Find', 'the', 'object', 'you', 'want', 'at', 'Catawiki']

siteTitle(arr)`

export const compose3 = {
  name: 'compose3',
  code: compose3_code,
  solution: solutions.compose3,
  env: env_curry,
}

const composeN_code = `const compose = (f, g) => (x) => f(g(x))
const compose3 = (f, g, h) => (x) => f(g(h(x)))

const join = curry((delim, xs) => xs.join(delim))
const toUpper = (str) => str.toUpperCase()
const exclaim = (str) => str + '!!!'
const h1 = (str) => '<h1>' + str + '</h1>'

const titlelize = compose3(
  compose(
    h1,
    exclaim,
  ),
  toUpper,
  join(' '),
)

const arr = ['Find', 'the', 'object', 'you', 'want', 'at', 'Catawiki']

titlelize(arr)`

export const composeN = {
  name: 'curryWanted',
  code: composeN_code,
  solution: solutions.composeN,
  env: env_curry,
}

const curryWanted_code = `const add = (a) => (b) => a + b
`

export const curryWanted = {
  name: 'curryWanted',
  code: curryWanted_code,
  solution: solutions.curryWanted,
}

const curry1_code = `const add = (a, b) => a + b

const inc = add(1)

add(1, 2) === inc(2)`

export const curry1 = {
  name: 'curry1',
  code: curry1_code,
  solution: solutions.curry1,
}

const splice_code = `const xs = [1,2,3,4,5]

xs.splice(0, 3)`

export const splice = {
  name: 'splice',
  code: splice_code,
  solution: solutions.splice,
}

const slice_code = `const xs = [1,2,3,4,5]

xs.slice(0, 3)`

export const slice = {
  name: 'slice',
  code: slice_code,
  solution: solutions.slice,
}
