import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./openJsFile"

test('Say "Hello, World."', () => {
  const code = convertJsToCalcium("hello.js")
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
