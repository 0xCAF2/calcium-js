
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('function.js', () => {
  it('function.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"function","f",["a","b"]],
[2,[],"ifs"],
[3,[],"if",["===",["var","a"],["var","b"]]],
[4,[],"return",0],
[3,[],"else"],
[4,[],"ifs"],
[5,[],"if",[">",["var","a"],["var","b"]]],
[6,[],"return",1],
[5,[],"else"],
[6,[],"return",["-_",1]],
[1,[],"const","l",[[5,3,6]]],
[1,[],"const","l2",["call",["prop","l","sort"],[["var","f"]]]],
[1,[],"expr",["call",["prop","console","log"],[["var","l2"]]]],
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
    function f(a, b) {
  if (a === b) {
    return 0
  } else {
    if (a > b) {
      return 1
    } else {
      return -1
    }
  }
}
const l = [5, 3, 6]
const l2 = l.sort(f)
console.log(l2)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
