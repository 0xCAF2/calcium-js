import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('forOf.spec.ts', () => {
  it('for of loop', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.Let, 'n', 1],
      [1, [], Calcium.Keyword.Command.While, ['<', ['var', 'n'], 100]],
      [
        2,
        [],
        Calcium.Keyword.Command.Assign,
        ['var', 'n'],
        ['+', ['var', 'n'], ['+', ['var', 'n'], 1]],
      ],
      [
        1,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], [['var', 'n']]],
      ],
      [1, [], Calcium.Keyword.Command.End],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
