import { expect, test } from "vitest"
import { Runtime, Status } from "../src"

test('Say "Hello, World."', () => {
  const code = [
    [
      1,
      [],
      "expr",
      ["call", ["prop", ["var", "console"], "log"], ["Hello, World."]],
    ],
    [1, [], "end"],
  ]
  const runtime = new Runtime(JSON.stringify(code))
  expect(runtime.run()).toBe(Status.Terminated)
})
