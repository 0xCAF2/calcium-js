
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('subscript.js', () => {
  it('subscript.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"const","a",[[73]]],
[1,[],"expr",["call",["prop","console","log"],[["sub",["var","a"],0]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
