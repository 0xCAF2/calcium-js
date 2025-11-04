import { expect, test } from 'vitest'
import { Runtime, Status } from '../src'

test('Runtime', () => {
  const code = [
    [1, [], "expr", ["call", ["prop", ["var", "console"], "log"], ["Hello, world!"]]],
    [1, [], "end"]
  ]
  const runtime = new Runtime(JSON.stringify(code))
  expect(runtime.run()).toBe(Status.Terminated)
})
