
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('nestedFunction.js', () => {
  it('nestedFunction.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"function","f",["a","b"]],
[2,[],"const","c",["*",["var","a"],["var","b"]]],
[2,[],"function","g",["m","n"]],
[3,[],"return",["%",["var","m"],["var","n"]]],
[2,[],"return",["+",["call",["var","g"],[["var","a"],["var","b"]]],["var","c"]]],
[1,[],"let","x",7],
[1,[],"let","y",3],
[1,[],"let","z",["call",["var","f"],[["var","x"],["var","y"]]]],
[1,[],"expr",["call",["prop",["var","console"],"log"],[["var","z"]]]],
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
  const c = a * b
  function g(m, n) {
    return m % n
  }
  return g(a, b) + c
}

let x = 7
let y = 3
let z = f(x, y)

console.log(z)

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
