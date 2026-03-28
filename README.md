# calcium-js

[Calcium is a programming language](https://0xcaf2.dev/docs/calcium) designed
to easily generate its code programmatically.
This repository is a JavaScript implementation of the Calcium interpreter.

## Installation

You can install calcium-js via npm:

```bash
npm install calcium-js
```

## Calcium is run based on commands.

Each command is represented as a JSON array. The commands correspond to
statements in programming languages.

<!-- prettier-ignore-start -->
```json
[
[1, [], "=", ["var", "message"], "Hello, World."],
[1, [], "expr", ["call", ["prop", ["var", "console"], "log"], [["var", "message"]]]],
[1, [], "end"]
]
```
<!-- prettier-ignore-end -->

The code above is equivalent to the following JavaScript code:

```js
let message = "Hello, World."
console.log(message)
```

## How to run commands

<!-- prettier-ignore-start -->

```js
import { Runtime } from "calcium-js"

const code = [
  [1, [], "=", ["var", "message"], "Hello, World."],
  [1, [], "expr", ["call", ["prop", ["var", "console"], "log"], [["var", "message"]]]],
  [1, [], "end"]
]

const runtime = new Runtime(code, {
  // canAccessWindow: true // In a browser environment to use console.log
  enableGlobal: true // In a Node.js environment to use console.log
})
runtime.run() // This will output "Hello, World." to the console.

```
<!-- prettier-ignore-end -->

## Converter

The `convert` function can convert JavaScript code into Calcium commands.

```js
import { convert } from "calcium-js"

const commands = convert(`
  console.log("Hello, World.")
`)

console.log(commands)
```

This will output the following commands:

<!-- prettier-ignore-start -->
```json
[
[1, [], "expr", ["call", ["prop", ["var", "console"], "log"], ["Hello, World."]]],
[1, [], "end"]
]
```
<!-- prettier-ignore-end -->

Since Calcium does not support all JavaScript features, some code may not be
converted correctly.

## What is the first element?

Increase the value of the number if you need a block,
for example, `while`, and so on.

<!-- prettier-ignore-start -->
```json
[
[1, [], "=", ["var", "i"], ["num", "0"]],
[1, [], "while", ["<", ["var", "i"], ["num", "10"]]],
[2, [], "expr", ["call", ["prop", ["var", "console"], "log"], [["_++", ["var", "i"]]]]],
[1, [], "end"]
]
```
<!-- prettier-ignore-end -->

The code above corresponds to:

```js
let i = 0
while (i < 10) {
  console.log(i++)
}
```
