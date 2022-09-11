
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('new.js', () => {
  it('new.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"const","d",["new",["var","Date"],[2022,7,20]]],
[1,[],"expr",["call",["prop","console","log"],[["var","d"]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
