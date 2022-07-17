import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('hello.spec.ts', () => {
  it('create and execute the runtime', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'const', 'message', 'Hello, World.'],
      [
        1,
        [],
        'expr',
        ['call', ['prop', 'console', 'log'], [['var', 'message']]],
      ],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
