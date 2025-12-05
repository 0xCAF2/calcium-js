# calcium-js

Calcium is a programming language designed to be easy
to generate programmatically.
This repository is a JavaScript implementation of the Calcium interpreter.

## Installation

You can install calcium-js via npm:

```bash
npm install calcium-js
```

## Calcium is run based on commands.

Each command is represented as a JSON array.

```json
[
  [1, [], "=", ["var", "message"], "Hello, World."],
  [
    1,
    [],
    "expr",
    ["call", ["prop", ["var", "console"], "log"], [["var", "message"]]]
  ],
  [1, [], "end"]
]
```

The commands are equivalent to statements.
The meaning of each element in a command is as follows:

0. Block level (`number`)
1. Option (`any`)
2. Keyword (`string`)
3. (After that) Arguments (`any`)

## What is the first element (block level)?

Increase the value of the number if you need a block,
for example, `while`, and so on.

```json
[
  [1, [], "=", ["var", "i"], ["num", "0"]],
  [1, [], "while", ["<", ["var", "i"], ["num", "10"]]],
  [
    2,
    [],
    "expr",
    ["call", ["prop", ["var", "console"], "log"], [["_++", ["var", "i"]]]]
  ],
  [1, [], "end"]
]
```

The code above corresponds to:

```js
let i = 0
while (i < 10) {
  console.log(i++)
}
```
