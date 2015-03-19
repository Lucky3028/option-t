# OptionType

[![npm version](https://badge.fury.io/js/option-t.svg)](http://badge.fury.io/js/option-t)
[![Build Status](https://secure.travis-ci.org/saneyuki/option-t.js.svg?branch=master)](http://travis-ci.org/saneyuki/option-t.js)

* This library represents [Option type](http://en.wikipedia.org/wiki/Option_type) in ECMAScript.
* APIs are inspired by Rust Language's [`Option<T>`](https://doc.rust-lang.org/std/option/).


## Installation

```sh
npm install --save option-t
```


## Usage

```javascript
var OptionType = require('option-t').OptionType;

// `Some<T>`
var some = new OptionType(1);
console.log(some.isSome); // true
console.log(some.value); // 1

// `None`
var none = new OptionType();
console.log(some.isSome); // false
console.log(some.value); // undefined
```

### JSON Representation

#### `Some<T>`

`new OptionType(1)` will be:

```json
{
    "is_some": true,
    "value": 1
}
```

#### `None`

`new OptionType()` will be:

```json
{
    "is_some": false
}
```


## License

[MIT License](./LICENSE.MIT)
