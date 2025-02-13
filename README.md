# option-t

[![npm](https://img.shields.io/npm/v/option-t.svg?style=flat)](https://www.npmjs.com/package/option-t)
[![CI Status (GitHub Actions)](https://github.com/option-t/option-t/workflows/CI/badge.svg)](https://github.com/option-t/option-t/actions?query=workflow%3ACI)

* **This library provides a toolkit for _nullable_ types in ECMAScript**.
    - `T | null`
    - `T | undefined`
    - `T | null | undefined`
    - [_Result type_](https://en.wikipedia.org/wiki/Result_type)
    - Tagged [_Option type_](https://en.wikipedia.org/wiki/Option_type)
* **APIs are inspired by Rust Language's [`Option<T>`](https://doc.rust-lang.org/std/option/) and [`Result<T, E>`](https://doc.rust-lang.org/std/result/)**.
* **This library helps to sort the "nullable" convention in your project**.
* **TypeScript friendly APIs**.
    * We recommend to use this with some static type systems like TypeScript.
* **Zero dependency**.
* **Tree shakable completely**.
* **ES Module fully compatbile**.
    * Support Node.js' ES Module.
    * Of course, we provides CommonJS too.



## Motivation

This library provides these conventions for your project:

1. Uniform an expression of _"none"_ value in JavaScript.
2. Uniform a way to carry error information instead of throwing an error by _result type_.
3. Provide various utility functions to handle _1_ and _2_ easily.

And Rust's [`std::option`](https://doc.rust-lang.org/std/option/) and [`std::result`](https://doc.rust-lang.org/std/result/) are
suggestive to achieve these conventions in practice. Thus this package is inspired by their design.


### Uniform the expression of "none" value.

In JavaScript world, there are many ways to express "there is no value".
At least in ECMA262, There are some ways to represent them:

* `undefined` (e.g. `Map.prototype.get()`)
* `null` (e.g. `RegExp.prototype.exec()`)
* `-1` (e.g. `String.prototype.indexOf()`)

In addition, ECMA262 interacts with [DOM binding](https://heycam.github.io/webidl/),
Node.js standard modules, and others. There are additional various ways to represent "none" value.

In practice, we write some _glue code_ to tame their various ways in our project to uniform their expression style.
This library contributes to uniform the convention to write it. 


### Uniform the way to carry error information instead of throwing an error.

_Exception_ is useful but it has some terrible aspects.
It's easy that _try-catch_ statement be a jump instruction by large scoped _try-catch_ statement.
It's hard to find where to throw an error, it's also hard to handle a penetrated exception from a lower layer.
Especially, _exception_ mechanism mis-matches with an async programming model.
ECMA262 7th' _async-await_ relaxes the problem about an exception with async programming,
but there is still the problem about exceptions in traditional synchronous programming.
Furthermore, if you interact with `setTimeout()` and other async APIs built with callback style on event loop,
this problem faces you.

And some async-push based paradigm like `Rx.Observable<T>` does not allow throw any exceptions
in their _Observable_ stream. If you throw an error in it, only _catch()_ operator can catch the error.
But a programmer would sometimes forget to use its operator. This means that throwing an Error in Rx's _Observable_
is pretty mis-matched action. _Promise<T>_ also has a similar problem.

And exception in ECMA262 is not friendly with static typing model
because ECMA262's _throw_ can throw not only `Error` but also other object types.

In Rust which is a programming language designed for parallel and seftiness, it treats errors in two category:

> Rust groups errors into two major categories: _recoverable_ and _unrecoverable_ errors.
> For a recoverable error, such as a file not found error,
> it’s reasonable to report the problem to the user and retry the operation.
> Unrecoverable errors are always symptoms of bugs, like trying to access a location beyond the end of an array.

This categorization is pretty useful to relax the problem about exception in ECMA262 which this section described.

Thus this library provides a way to express _recoverable_ error and also recommends
to use throwing an error only if you intend to throw an _unrecoverable_ error.
This categorization introduces a convenient convention for you:
	
* If the code uses _throw_, you should be careful about _unrecoverable_ error.
* If the code returns `Result<T, E>` provided this library, then you should handle it correctly.

This convention is clear as error handling style and it's static typing friendly by _generics_.


### Provide a utility function to handle these uniformed expression easily.

Some static type checking tools also provide a way to check nullability and provide these conventions.
 
- Flowtype's semantics has [a built-in "Maybe" types](https://flow.org/en/docs/types/maybe/),
- TypeScript has [a non-nullable type check](https://github.com/Microsoft/TypeScript/issues/185),
- Google Closure Compiler also can check a non-nullable type via JSDoc style annotations in some compilation mode.
 
Flowtype and TypeScript checks with their control flow analysis
(Sorry, I'm not sure about the details of Google Closure Compiler's behavior).
 
However, these compilers do not provide a way to handle their value easily like `map` or `flatMap` operations.
 
Rust's `std::option` and `std::result` have some utilities operation method to handle them easily.
This library also provides a convenient way to handle them and its way is inspired by Rust's ones.



## Supported Environments

We target to run in following environments.

- Language
    - [ECMA262 5th edition](https://262.ecma-international.org/5.1/).
    - TypeScript's latest version.
- Module system
    - ES Module ([ES2015](https://262.ecma-international.org/6.0/) level).
    - CommonJS
    - A runtime environment or module bundler must support Node.js' [package.json's `exports` field](https://nodejs.org/api/packages.html#package-entry-points) (Newer is better).


### Caution

1. Your code may work with this package even if your project does not supports all of these requirements.
   But we may not be able to support such environments officially. We recommend to update your environment generally.
2. If you would like to work this packages for a more legacy environment (e.g. ES3!)
   we recommend to transform whole of codes including your dependencies in your build pipeline.
3. If your project still use TypeScript's `--moduleResolution` with `node` setting, please use `v34`.



## Installation

```sh
npm install --save option-t
// or
yarn add option-t --save
```






## Usage & APIs

All APIs are TypeScript ready.

* _Utility functions for these types_. These are designed for more tree shaking friendly and more usable for JavaScript common world.
    * [`Nullable<T>` (`T | null`)](./src/Nullable/)
    * [`Undefinable<T>` (`T | undefined`)](./src/Undefinable/)
    * [`Maybe<T>` (`T | null | undefined`)](./src/Maybe/)
    * plain objects
        * [`Result<T, E>` (`{ ok: true; val: T } | { ok: false; err: E; }`)](./src/PlainResult/)
        * [`Option<T>` (`{ ok: true; val: T } | { ok: false; }`)](./src/PlainOption/) (_weak deprecated_)
* [Wrapper objects](./docs/wrapper_objects.md) ([__*deprecated*__](https://github.com/option-t/option-t/issues/459)).

Additional documents are in [`docs/`](./docs/).


### How to import

**You can use [these paths](./docs/public_api_list.md) in both of CommonJS style and ES Module style.**
This package provides some sub directories to import various functions (e.g. `option-t/PlainResult`).
Each of them includes the same directory hierarchy with [under `src`/](./src/).

If you're project cannot import by their path, please read [this guide](./docs/how_to_import.md) to know more details.

#### Examples

```js
import { isNotNull } from 'option-t/Nullable';
import { unwrapNullable } from 'option-t/Nullable/unwrap';
import { createOk, isOk } from 'option-t/PlainResult';

// If your toolchains supports package.json's exports field (if you fail to import by the above style)
import { isNotNull } from 'option-t/lib/Nullable';
import { unwrapNullable } from 'option-t/lib/Nullable/unwrap';
import { createOk, isOk } from 'option-t/lib/PlainResult';
```


### Deprecation

All deprecated items including "not recommended" are marked as `@deprecated` in JSDoc.
Please read [this guide](./docs/deprecated_apis.md) to know more details.


## See also

These documents would provide more information about `Option<T>` and `Result<T, E>`.
These are written for Rust, but the essence is just same.

- [Error Handling - Rust by Example](https://doc.rust-lang.org/rust-by-example/error.html)
- [Error Handling - The Rust Programming Language](https://doc.rust-lang.org/book/second-edition/ch09-00-error-handling.html)
- [`std::option` - Rust](https://doc.rust-lang.org/std/option/)
- [`std::result` - Rust](https://doc.rust-lang.org/std/result/)




## License

[MIT License](./LICENSE.MIT)






## Contribution

- Use npm v9 or later to install dev-dependency toolchains.



## Related works: Comparison with other similar packages

### [fp-ts (v2.13.1)](https://github.com/gcanti/fp-ts/tree/2.13.1)

_fp-ts_ is a packages that provides various tools to write a functional programming style code including _Either_ and _Option_ type.

our design’ origin is Rust language, so we also contains an essence of functional programming style which Rust language contains.
In this point, features that we provides would be similar to fp-ts’ one.

However, we do not aim to achieve to provides a feature to write a functional programming language code unlike fp-ts.
Our design goal is that we provide more specialized tools to handle an absence of a values.


### [neverthrow (v6.0.0)](https://github.com/supermacro/neverthrow/tree/v6.0.0)

_neverthrow_ is a package that provides _Result_ type implementation.
At this point, we think that we and they share the same spirits.

However, we think there some different design decision between neverthrow and us.


#### option-t does not provide a method chain style but have a perfect "tree-shakability"

We does not provide class based implementation and method chaining style.
Historically, we had provided a method-chain style APIs and data types as tier 1.

- [`ClassicOption`](./src/ClassicOption/)
- [`ClassicResult`](./src/ClassicResult/)

But we gave up method chain style as primary style and switched our primary APIs
to current simple functions combination style by various reasons.

First, there was a problem with [dead code elimination](https://en.wikipedia.org/wiki/Dead-code_elimination).
Dead code elimination (as known as DCE or “tree shaking” in JavaScript toolchain context) is important optimization.
It reduces a final bundled code size after linking codes by a module bundler (linker).

However, it’s hard to remove unused an object property method in JavaScript.
To remove them _safely_, an optimizer should know weather a object property is used or not over a whole of programs.
But this kind of optimization requires perfect call graph information too.
This kind of optimization is easy relatively with a static language like C++ or Rust
but JavaScript is a dynamic language essentially.
JavaScript have a multiple way to prevent a this kind of optimization like a reflection (e.g. `Object.keys(obj)`).
So it’s hard.

Under this condition, we cannot add a feature as property methods without increase a final code size.
We would like to add a popular feature as a part of this package to reuse it or would like to fill a gap with Rust's original feature set.
But an user project does not use all features at every time.
They use a partial of this package generally. Even if an user project does not use them,
features provided as a object property method are not removed, so it increases a final application size. 
This might be a big problem for client-side application, especially to implement SDK libraries.
Thus we would like to avoid it sincerely.

Exceptionally, as our memory, Google Closure Compiler’s advanced optimization mode can do such aggressive dead code elimination
about an unused object property as a part of static optimization.
But it’s not a popular toolchain choice in 2010s later.
We could not expect that a user project accept it as a popular choice rather than UglyfyJS, terser,
or other code minifier lacking an analysis whole of programs statically.

Second, there was a problem with TypeScript’s type inference.
In 2016~2018, our method chain style implementation sometimes fall into that
a type parameter for generics fallback to `any` or `unknown`
in mid of a long (relatively complex) method chains in our user project.
This causes to break a type integrity whole of a project and causes a bad developer experience.

Third, there was a problem to make hard to keep a consistent behavior with mixing multiple version in a project dependency.
A class based object implementation often supports `instanceof` check naturally as a part of APIs implicitly.
However, if there are multiple versions of same name package in a project dependencies
by aggregating them with semantic versioning, `instanceof` behavior might be inconsistent as contrary to expectations of a developer.

For example,  the following code will be result as `false`. This is just unsound.

```js
// This is some_package@v2 actually.
import { SomeClass } from 'some_package';
// This package uses some_package@v1 as dependency.
import { getBar } from 'other_package';

// This value is some_package@v1's instance
// that having same type shape with some_package@v2's same named class instance.
const bar = getBar();
// Developer think this should be `true`, but the actual is `false`.
console.log(bar instanceof SomeClass); // false
```

You may think TypeScript’s static type system can fix this problem,
but it cannot do. TypeScript’s type system uses structural subtyping.
This example is valid if the `bar`  and `SomeClass`  (instance) have a same type shape.
As a result, it’s bad behavior. To fix above problems,
we gave up method chain style and make it deprecated.

Finally, we shifted to provide a set of minimum types and various standalone "operator" functions.
This design allows us to "tree-shaking" perfectly to remove unused functions.

Of course, we know this design style is boring programming style.
If [pipeline operator proposal](https://github.com/tc39/proposal-pipeline-operator) advance to the part of ECMA262 spec,
this boring style problem might be relaxed.

Furthermore, we think that it happens many times reading the code but writing one is fewer than it.
We believe that this style is tired but not a problem in actually as a long term.
