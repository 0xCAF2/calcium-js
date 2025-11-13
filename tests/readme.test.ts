import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./jsCode/fileReader"

test("The sample code in README", () => {
  const code = convertJsToCalcium("readme.js")
  console.log(code)
  const runtime = new Runtime(code)
  expect(runtime.run()).toBe(Status.Terminated)
})
