import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('if.spec.ts', () => {
  it('if statement', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.Const, 'condition', false],
      [1, [], Calcium.Keyword.Command.Ifs],
      [2, [], Calcium.Keyword.Command.If, ['var', 'condition']],
      [
        3,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], ['NG']],
      ],
      [2, [], Calcium.Keyword.Command.ElseIf, ['!', ['var', 'condition']]],
      [
        3,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], ['OK']],
      ],
      [2, [], Calcium.Keyword.Command.Else],
      [
        3,
        [],
        Calcium.Keyword.Command.ExprStmt,
        ['call', ['prop', 'console', 'log'], ['NG']],
      ],
      [1, [], Calcium.Keyword.Command.End],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
