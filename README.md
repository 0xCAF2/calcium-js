# calcium-js

Calcium language interpreter on JavaScript

## Convert JavaScript code to Calcium

```bash
tsc script/convert.ts
node script/convert.js script/tests/hello.js # output Calcium code
```

## Import and create the Runtime

```typescript
import * as Calcium from 'calcium-js'

const runtime = new Calcium.Runtime([
  [1, [], 'const', 'message', 'Hello, World.'],
  [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'message']]]],
  [1, [], 'end'],
])
runtime.run() // prints "Hello, World."
```
