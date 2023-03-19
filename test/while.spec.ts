
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('while.js', () => {
  it('while.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"let","n",1],
[1,[],"while",["<",["var","n"],100]],
[2,[],"=",["var","n"],["+",["var","n"],["+",["var","n"],1]]],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["var","n"]]]],
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
    let n = 1
while (n < 100) {
  n = n + (n + 1)
}
console.log(n)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
