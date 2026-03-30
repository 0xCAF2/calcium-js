import { expect, test } from "vitest"
import { convertJsToCalcium } from "./testCases/fileReader"
import { code } from "./testCases/moduleMain"
import { Runtime, Status } from "../src"

test("load module and run main", () => {
  const moduleA = convertJsToCalcium("moduleA.js")
  const moduleB = convertJsToCalcium("moduleB.js")
  const runtime = new Runtime(code as any, {
    canAccessWindow: false,
    enableGlobal: true,
  })
  runtime.loadModule("moduleA", moduleA)
  runtime.loadModule("moduleB", moduleB)
  expect(runtime.run()).toBe(Status.Terminated)
})
