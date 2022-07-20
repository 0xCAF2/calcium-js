import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('new.spec.ts', () => {
  it('new operator', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'const', 'd', ['new', ['var', 'Date'], [2022, 7, 20]]],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'd']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
