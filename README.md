# calcium-js

Calcium language runtime on JavaScript

## How to create and execute code

```javascript
import * as calcium from 'calcium-js'

const runtime = new calcium.Runtime([
  [1, [], 'const', 'message', 'Hello, World.'],
  [
    1,
    [],
    'expr',
    ['call', ['prop', ['var', 'console'], 'log'], [['var', 'message']]],
  ],
  [1, [], 'end'],
])
runtime.run() // prints "Hello, World."
```

Calcium code is represented by JSON.

## Supported basic statements

`const`, `let` (declaration), `=` (assignment), `if`, `while`, `for of`
and `function` are available.

## The structure of a command

```javascript
const command = [indent, optional_array, command_keyword, ...args]
```

## Using the converter

The converter gets the subset of JavaScript code as input, and
outputs the Calcium code as JSON. To use it, `typescript` package is required.
Then import the `convert` function.

```javascript
import { convert } from 'calcium-js/dist/converter'

const calciumCode = convert("console.log('Hello, World.')")
// give the code to the runtime and call run() method.
```
