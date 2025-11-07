import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./jsCode/fileReader"

test("Revived new operator", () => {
  const code = convertJsToCalcium("new.js")
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
