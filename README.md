# calcium-js

Calcium language interpreter on JavaScript

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
