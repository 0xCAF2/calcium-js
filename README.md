# calcium-js

Calcium language interpreter on JavaScript

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

calcium-js uses the global window object so that this library is available in
a browser environment.
