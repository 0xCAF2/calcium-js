import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./jsCode/fileReader"

test("Call the method of an object", () => {
  const code = convertJsToCalcium("method.js")
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
