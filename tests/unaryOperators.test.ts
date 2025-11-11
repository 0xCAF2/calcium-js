import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./jsCode/fileReader"

test("Unary operators", () => {
  const code = convertJsToCalcium("unaryOperators.js")
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
