import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('float.spec.ts', () => {
  it('use float values', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'const', 'pi', 3.14],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'pi']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
