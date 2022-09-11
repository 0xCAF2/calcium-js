
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('while.js', () => {
  it('while.js', () => {
    const runtime = new calcium.Runtime(
      [
[1,[],"let","n",1],
[1,[],"while",["<",["var","n"],100]],
[2,[],"=",["var","n"],["+",["var","n"],["+",["var","n"],1]]],
[1,[],"expr",["call",["prop","console","log"],[["var","n"]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
