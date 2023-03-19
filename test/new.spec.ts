
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('new.js', () => {
  it('new.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"const","d",["new",["var","Date"],[2022,7,20]]],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["var","d"]]]],
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
    const d = new Date(2022, 7, 20)
console.log(d)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
