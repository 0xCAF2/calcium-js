import * as Calcium from '../src'

describe('hello.ts', () => {
  it('create and execute the runtime', () => {
    const runtime = new Calcium.Runtime('')
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
