import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('breakContinue.spec.ts', () => {
  it('break and continue statement', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.ForOf, 'ch', 'message'],
      [2, [], Calcium.Keyword.Command.Ifs],
      [3, [], Calcium.Keyword.Command.If, ['===', ['var', 'ch'], 'a']],
      [4, [], Calcium.Keyword.Command.Break],
      [3, [], Calcium.Keyword.Command.Else],
      [
        4,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], [['var', 'ch']]],
      ],
      [4, [], Calcium.Keyword.Command.Continue],
      [
        2,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], [['var', 'ch']]],
      ],
      [1, [], Calcium.Keyword.Command.End],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
