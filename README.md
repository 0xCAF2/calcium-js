# calcium-js

Calcium language interpreter on JavaScript

This library uses the global window object. So it is available in a browser
environment only.

## Install

```shell
npm install calcium-js
```

## Create a runtime

```javascript
import * as calcium from 'calcium-js'

const runtime = new calcium.Runtime([
  [1, [], 'const', 'message', 'Hello, World.'],
  [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'message']]]],
  [1, [], 'end'],
])
runtime.run() // prints "Hello, World."
```

## Support basic statements

`const`, `let` (declaration), `=` (assignment), `if`, `while`, `for of`
and `function` statements can be executed as commands.

## The structure of a command

```javascript
const command = [indent, optional_array, command_keyword, ...args]
```

## Using the converter

The converter inputs the subset of JavaScript code and
outputs the Calcium code. To use it, install the typescript package.

```shell
npm install typescript
```

Then import the `convert` function.

```javascript
import { convert } from 'calcium-js/dist/converter'

const calciumCode = convert("console.log('Hello, World.')")
// give the code to the Runtime
```
