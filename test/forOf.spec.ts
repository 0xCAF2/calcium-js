import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('forOf.spec.ts', () => {
  it('if statement', () => {
    const runtime = new Calcium.Runtime([
      [1, [], Calcium.Keyword.Command.ForOf, 'ch', 'message'],
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
