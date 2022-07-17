import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('while.spec.ts', () => {
  it('while loop', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'let', 'n', 1],
      [1, [], 'while', ['<', ['var', 'n'], 100]],
      [2, [], '=', ['var', 'n'], ['+', ['var', 'n'], ['+', ['var', 'n'], 1]]],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'n']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
