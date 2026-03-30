import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convertJsToCalcium } from "./testCases/fileReader"

test("define external function and run", () => {
  const code = convertJsToCalcium("defineExternalFunc.js")
  const runtime = new Runtime(code as any, {
    canAccessWindow: false,
    enableGlobal: true,
  })
  runtime.defineExternalFunction("increment", (x: number) => x + 1)
  expect(runtime.run()).toBe(Status.Terminated)
})
