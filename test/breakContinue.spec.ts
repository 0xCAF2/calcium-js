
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('breakContinue.js', () => {
  it('breakContinue.js', () => {
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
  })
})
