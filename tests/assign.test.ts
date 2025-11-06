import { expect, test } from "vitest"
import { Runtime, Status } from "../src"

test("Assign and reference variables", () => {
  const code = [
    [1, [], "=", ["var", "x"], ["num", "42"]],
    [
      1,
      [],
      "expr",
      ["call", ["prop", ["var", "console"], "log"], [["var", "x"]]],
    ],
    [1, [], "end"],
  ]
  const runtime = new Runtime(JSON.stringify(code))
  expect(runtime.run()).toBe(Status.Terminated)
})
