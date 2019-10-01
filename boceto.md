I want to talk about my experience with functional programming

"for the people?"

We write JS and the language it's fully capable writting FP code

FP has the reputation of being heavy on math and difficult

I believe it should be for everybody

We all can benefit from it, so let's discover that!

We see things like this one

"monad, monoid, category, endofunctors"

Yes, FP is that, and if you want you can get to that level and benefit from it

I'm not trying to bash on the math heavy FP I'm trying to bring FP to those that
just want to write better code

Let's then ask a question:

What does it mean to write functional oriented code?

To answer that question we are going to go through a few pilar concepts of FP

When I started to learn FP I did it because it was cool So for a while I wasn't
able to explain "why FP?" because I was doing it only because it felt cool
(which still does) but ultimately what I want is to write better code, do my job
better, and of course enjoy the process

But first let's set ourselves a goal, besides the one of writing FP

Let's set the goal of:

> code terse, yet easy to reason about

our code should not be verbose, but it shouldn't be offuscated either, we want
to find the balance

> don't reinvent the wheel

> represent problems in terms of generic, composable bits

By writing our code in a FP oriented approach we plan to achieve that :point_up:

"Functions, Functions Everywhere"

If we talk about FP we got to start from **functions**

Whereas in OOP objects are the core of the paradigm

And in procedural or imperative programming instructions are the core

In FP we have functions

There are a few "features" about functions that are important in FP

They need to be "first class"

That means they are just like any other value (yeah, it's not like planes, first
class doesn't mean speciall, it means normal)

Since we can say functions are just like any other value we can store our
functions in variables, we can store them in arrays or objects (as properties)

We can pass / return them in other functions

And that takes us to the next item, **higher-order functions**

as opposed to first-order ones

Again the name sounds fancier than what it means, as we saw, since functions are
values it means we can accept them as arguments of functions and/or return them
from other functions, that's what it mean to be _higher-order_.

When we pass functions to other functions they will call them for us (e.g.
reduce).

When we return functions from others we will be able to call them later (or
right away if we want).

This is something we see every day and doesn't feel like much, but it's not
possible in every language. Specially the "passing functions to others".

These first two we kind of give for granted, they are possible in JS (and in all
or most of the modern languages).

They kind of go together and you can't have higher order functions if they
aren't first class. And will be the foundation for some of the patters we talk
about today.

But there's one more characteristic to add, and we'll focus more on this one:

**Pure functions**

Yeah, functions seem to be very elitists

They are first-class, higher-oder and now they also want to be pure.

What does it mean for a function to be pure?

[read definition] :point_down:

> A pure function is a function that, given the **same input**, will always
> return the **same output** and **does not have any observable side effect**.

So first "same input produces same output"

This is not always true, think about `Math.random` or `Date.now`

They are for sure not pure functions, every time we call them we get a different
result.

And second, "no observable side effects"

Let's not go into detail of why he says observable... (homework for you)

But, who knows what a "side effect" is?

- Modify non-local variables
- Mutate arguments (passed by reference)
- Perform I/O
- Call other functions that do side effects

As we'll see later, the problem is not the "effect" but the "side" part

Let's see some examples firt

[splice vs. slice]

We don't want to get our data modified when calling a function (at least not
when we don't expect it to do it)

We don't want a function to write a file if we don't intent to.

So all of this is about "predictability"

If you call `splice` and don't know it mutates, you might get into some trouble

But there are times when you want to produce effects (write to a file, fetch
data from the server, log to stdout/stderr, etc), what do we do then?

As I said, problem with "side effects" is not the "effects" is when they happen
on the "side", when they become unpredictable

<!-- reword these two paragraphs -->

The first thing we can do to deal with them is to write our code in a way that
we keep the impure code isolated in a place and make the rest of the application
pure. I'll this in practice in one of the examples at the end.

There are also "fancy" FP patterns to deal with effects in a pure way that are

<!-- ------------------------------>

Another benefit of "pure functions" is how easy they are to test

If we go back to the definition

"same input -> same output" we know that every time we give some input it
produces some output, that's really trivial to test

"no observable side effects" that's also really beneficial, we aren't changing
the world around us so we don't have to use any type of hacks to observe it for
changes

Another benefit about pure functions we haven't talked about is that we can
write our impure functions in a way so they become pure and easier to test, by
doing "dependency injection" in other words

[db test with dependency injection]

There are more benefits that we can get from pure functions

- memoization
- parallelization
- portable
- self documenting (specially when we add types)

There are some interesting things we can do with the concept of pure functions
beyond math operations and array transformation.

Think about React, what was unique out it when it came out was this idea of the
view (website, mobile, event terminal) being the pure function of your data

> React `f(data) -> view`

Or Redux, where we define the changes in our state as pure functios as well, and
the runtime (i.e. Redux store) takes care of the state, outside of the scope of
our application

> Redux `f(state, action) -> state`

If you are paying attention (I hope you are) you might have noticed we
implemented many functions in a particular way:

> `const add = (a) => (b) => a + b`

That allowed us to **partially** use this function

```js
const inc = add(1)

inc(10) // 11
```

We could accept both parameters at once:

```js
const add = (a, b) => a + b
```

But then we'd need to write another function to define `inc`:

```js
const inc = (b) => add(1, b) // =(
```

Not so good. But in the way we defined `add`, if we want to path both aruments
right away we have to do this

```js
add(1)(2) // =(
```

It would be awesome if we could use `add` in both ways depending what we need:

```js
const inc = add(1)

add(10, 20)
```

This takes us to currying and partial application

This are two terms that usually go together and are often confused with each
other, so let me first give the definitions and then we'll see them in practice

> **Currying**: is the technique of translating the evaluation of a function
> that takes multiple arguments into evaluating a sequence of functions, each
> with a single argument.
>
> **Partial Application**: the process of fixing a number of arguments to a
> function, producing another function of smaller arity.
>
> **Arity**: the amount of parameters a function has.

[implement curry]

I said we wouldn't talk about math and I lied, here's the math we'll talk about
today:

`(f ∘ g)(x) = f(g(x))`

Does anybody know what that means? Anybody remembers it from highschool or
college?

**function composition**

We talked a lot about functions already, I mean we are in the topic of
functional programming, so what can you expect, right?

When you write functional code you are just combining or composing functions in
many different ways

The most basic one is composition _per se_ -> our programs will boild down to
composed functions

We got the mathematical definition, let's see it in practice:

[compose 2 example]

[compose 3 example]

[compose N example]

Compositon will be the foundation of our programs

We can then see composition as fractal

> operations -> services -> use cases -> app

We have small opperations, usually with not business logic involved, just
transformations on data (`toUpper`, `head`)

We combine those to produce services like we saw in the last composition example

These services start to have some business logic in them

If we keep doing the same, we can compose several services to build an use case

And once again, by composing use cases, well we haven an application

If we think about it, that's exactly what and application is, a composition
(wheather we use `compose` or not) of several use cases together

And we can keep going, we can compose applications to build systems as well

[example application (CLI)] -> show the impure vs. pure areas

[lift function to arrays -> map exercise]
