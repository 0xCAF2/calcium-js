import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('function.spec.ts', () => {
  it('define and call the function', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.Function, 'f', ['a', 'b']],
      [
        2,
        [],
        Calcium.Keyword.Command.Return,
        ['+', ['var', 'a'], ['var', 'b']],
      ],
      [
        1,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], [['call', ['var', 'f'], [7, 3]]]],
      ],
      [1, [], Calcium.Keyword.Command.End],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
