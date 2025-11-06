import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convert } from "../tool/converter"

test("Convert JavaScript to Calcium", () => {
  const code = convert(`
    const x = 42;
    console.log(x);
  `)
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
