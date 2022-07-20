import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('subscript.spec.ts', () => {
  it('element access expression (subscript syntax)', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'const', 'a', [[73]]],
      [
        1,
        [],
        'expr',
        ['call', ['prop', 'console', 'log'], [['sub', ['var', 'a'], 0]]],
      ],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
