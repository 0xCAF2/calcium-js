
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('breakContinue.js', () => {
  it('breakContinue.js', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      [
[1,[],"for of","ch","message"],
[2,[],"ifs"],
[3,[],"if",["===",["var","ch"],"a"]],
[4,[],"break"],
[3,[],"else"],
[4,[],"expr",["call",["prop","console","log"],[["var","ch"]]]],
[4,[],"continue"],
[2,[],"expr",["call",["prop","console","log"],["NG"]]],
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
    for (const ch of 'message') {
  if (ch === 'a') {
    break
  } else {
    console.log(ch)
    continue
  }
  console.log('NG')
}

    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
