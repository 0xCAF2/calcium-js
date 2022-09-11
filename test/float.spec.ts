
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('float.js', () => {
  it('float.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"const","pi",3.14],
[1,[],"expr",["call",["prop","console","log"],[["var","pi"]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
