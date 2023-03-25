## Calcium is run based on commands.

Each command is represented as a JSON array.

```json
[
  [1, [], "=", ["var", "message"], "Hello, World."],
  [1, [], "print", ["var", "message"]],
  [1, [], "end"]
]
```

Basically, the commands are equivalent to statements.
The meaning of each element in the command is as follows:

0. Indent (integer)
1. Option (any)
2. Command keyword (`string`)
3. (After that) Arguments (`array`)

## What is the "indent"?

Indent in Calcium is what the Python language calls indentation.
Increase the value of the indent if you need a block,
for example `if` or `while`.

```json
[
  ...
  [1, [], "if", ["==", ["var", "i"], 10]],
  [2, [], "print", ["var", "i"]],
  ...
]
```

The code above corresponds to:

```python
if i == 10:
    print(i)
```

## Is the Calcium an esoteric language or just a joke?

No, I don't think so. [Here is one of the applications](https://calcium-editor.web.app/en/).
It is suitable for environments that generate code programmatically.
