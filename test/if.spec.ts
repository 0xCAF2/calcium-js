
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('if.js', () => {
  it('if.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"const","condition",true],
[1,[],"ifs"],
[2,[],"if",["!",["var","condition"]]],
[3,[],"expr",["call",["prop","console","log"],["NG"]]],
[2,[],"else if",["var","condition"]],
[3,[],"expr",["call",["prop","console","log"],["OK"]]],
[2,[],"else if",["!",["!",["var","condition"]]]],
[3,[],"expr",["call",["prop","console","log"],["NG3"]]],
[2,[],"else"],
[3,[],"expr",["call",["prop","console","log"],["NG2"]]],
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
    const condition = true
if (!condition) {
  console.log('NG')
} else if (condition) {
  console.log('OK')
} else if (!!condition) {
  console.log('NG3')
} else {
  console.log('NG2')
}

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
