
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('forOf.js', () => {
  it('forOf.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"let","s",0],
[1,[],"for of","n",[[0,1,2]]],
[2,[],"=",["var","s"],["+",["var","s"],["var","n"]]],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["var","s"]]]],
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
    let s = 0
for (const n of [0, 1, 2]) {
  s = s + n
}
console.log(s)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
