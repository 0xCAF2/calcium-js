import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('forOf.spec.ts', () => {
  it('for of loop', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'let', 's', 0],
      [1, [], 'for of', 'n', [[0, 1, 2]]],
      [2, [], '=', ['var', 's'], ['+', ['var', 's'], ['var', 'n']]],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 's']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
