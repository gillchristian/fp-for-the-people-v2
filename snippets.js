export const compose = `// (f ∘ g)(x) = f(g(x))

const head = xs => xs[0]
const reverse = xs => [...xs].reverse()

const last = xs => head(reverse(xs))

const arr = ['Odessa', 'JS', 'Rocks']

last(arr)`

export const compose3 = `const compose = (f, g) => (x) => f(g(x))

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

const arr = ['Odessa', 'JS', 'Rocks']

siteTitle(arr)`

export const composeN = `const compose = (f, g) => (x) => f(g(x))
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

const arr = ['Odessa', 'JS', 'Rocks']

titlelize(arr)`

export const curryWanted = `const add = (a) => (b) => a + b
`

export const curry1 = `const add = (a, b) => a + b

const inc = add(1)

add(1, 2) === inc(2)`

export const splice = `const xs = [1,2,3,4,5]

xs.splice(0, 3)`

export const slice = `const xs = [1,2,3,4,5]

xs.slice(0, 3)`
