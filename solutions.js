export const compose = `// (f ∘ g)(x) = f(g(x))

const compose = (f, g) => (x) => f(g(x))

const head = xs => xs[0]
const reverse = xs => [...xs].reverse()

const last = compose(head, reverse)

const arr = ['Odessa', 'JS', 'Rocks']

last(arr)`

export const compose3 = `const compose = (f, g) => (x) => f(g(x))
const compose3 = (f, g, h) => (x) => f(g(h(x)))

const join = curry((delim, xs) => xs.join(delim))
const toUpper = (str) => str.toUpperCase()
const exclaim = (str) => str + '!!!'

const titlelize = compose3(
  exclaim,
  toUpper,
  join(' '),
)

const arr = ['Odessa', 'JS', 'Rocks']

titlelize(arr)`

export const composeN = `const compose = (...fns) => (x) =>
  fns.reduceRight(
    (a, f) => f(a),
    x,
  )

const join = curry((delim, xs) => xs.join(delim))
const toUpper = (str) => str.toUpperCase()
const exclaim = (str) => str + '!!!'
const h1 = (str) => '<h1>' + str + '</h1>'

const siteTitle = compose(
  h1,
  exclaim,
  toUpper,
  join(' '),
)

const arr = ['Odessa', 'JS', 'Rocks']

siteTitle(arr)`

export const curryWanted = `const add = (a) => (b) => a + b

const inc = add(1) // \\o/

add(1)(2) // =/

const sum = (a, b) => a + b

const inc_ = (b) => sum(1, b) // =/

sum(1, 2) // \\o/`

export const curry1 = `function curry (fn) {
  return (...args) =>
    fn.length === args.length
      ? fn(...args)
      : curry(fn.bind(null, ...args))
}

const add = curry((a, b) => a + b)

const inc = add(1)

inc(2) === add(1, 2)`

export const splice = `const xs = [1,2,3,4,5]

xs.splice(0, 3)

xs.splice(0, 3)

xs.splice(0, 3)

xs // ???`

export const slice = `const xs = [1,2,3,4,5]

xs.slice(0, 3)

xs.slice(0, 3)

xs.slice(0, 3)

xs // \\o/`
