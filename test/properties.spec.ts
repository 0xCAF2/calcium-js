
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('properties.js', () => {
  it('properties.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"const","obj",{}],
[1,[],"const","inner",{}],
[1,[],"=",["prop","inner","prop"],7],
[1,[],"=",["prop","obj","inner"],["var","inner"]],
[1,[],"expr",["call",["prop","console","log"],[["prop","obj","inner","prop"]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
