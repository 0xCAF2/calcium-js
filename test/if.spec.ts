import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('if.spec.ts', () => {
  it('if statement', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'const', 'condition', true],
      [1, [], 'ifs'],
      [2, [], 'if', ['!', ['var', 'condition']]],
      [3, [], 'expr', ['call', ['prop', 'console', 'log'], ['NG']]],
      [2, [], 'else if', ['var', 'condition']],
      [3, [], 'expr', ['call', ['prop', 'console', 'log'], ['OK']]],
      [2, [], 'else if', ['!', ['!', ['var', 'condition']]]],
      [3, [], 'expr', ['call', ['prop', 'console', 'log'], ['NG3']]],
      [2, [], 'else'],
      [3, [], 'expr', ['call', ['prop', 'console', 'log'], ['NG2']]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
