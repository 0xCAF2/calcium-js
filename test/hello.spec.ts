import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('hello.ts', () => {
  it('create and execute the runtime', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.Const, 'message', 'Hello, World.'],
      [
        1,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], [['var', 'message']]],
      ],
      [1, [], Calcium.Keyword.Command.End],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
