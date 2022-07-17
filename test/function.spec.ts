import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('function.spec.ts', () => {
  it('define and call the function', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'function', 'f', ['a', 'b']],
      [2, [], 'ifs'],
      [3, [], 'if', ['===', ['var', 'a'], ['var', 'b']]],
      [4, [], 'return', 0],
      [3, [], 'else'],
      [4, [], 'ifs'],
      [5, [], 'if', ['>', ['var', 'a'], ['var', 'b']]],
      [6, [], 'return', 1],
      [5, [], 'else'],
      [6, [], 'return', ['-_', 1]],
      [1, [], 'const', 'l', [[5, 3, 6]]],
      [1, [], 'const', 'l2', ['call', ['prop', 'l', 'sort'], [['var', 'f']]]],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'l2']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
