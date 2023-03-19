
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('hello.js', () => {
  it('hello.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"const","message","Hello, World."],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["var","message"]]]],
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
    const message = 'Hello, World.'
console.log(message)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
