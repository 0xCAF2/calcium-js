import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./jsCode/fileReader"

test("Create and modify an object", () => {
  const code = convertJsToCalcium("object.js")
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
