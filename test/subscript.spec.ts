
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('subscript.js', () => {
  it('subscript.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"const","a",[[73]]],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["sub",["var","a"],0]]]],
[1,[],"end"]
]
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)

    let result2 = ''
    const capture2 = (...chunk: any[]) => {
      result2 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture2
    {
    const a = [73]
console.log(a[0])

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
