
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('properties.js', () => {
  it('properties.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"const","obj",{}],
[1,[],"const","inner",{}],
[1,[],"=",["prop","inner","prop"],7],
[1,[],"=",["prop","obj","inner"],["var","inner"]],
[1,[],"expr",["call",["prop","console","log"],[["prop","obj","inner","prop"]]]],
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
    const obj = {}

const inner = {}
inner.prop = 7

obj.inner = inner

console.log(obj.inner.prop)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
