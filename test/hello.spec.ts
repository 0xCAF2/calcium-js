
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('hello.js', () => {
  it('hello.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"const","message","Hello, World."],
[1,[],"expr",["call",["prop","console","log"],[["var","message"]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
