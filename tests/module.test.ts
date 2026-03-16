import { expect, test } from "vitest"
import { convertJsToCalcium } from "./testCases/fileReader"
import { code } from "./testCases/module-main"
import { Runtime, Status } from "../src"

test("load module and run main", () => {
  const moduleA = convertJsToCalcium("module-a.js")
  const moduleB = convertJsToCalcium("module-b.js")
  const runtime = new Runtime(code as any, {
    canAccessWindow: false,
    enableGlobal: true,
  })
  runtime.loadModule("module-a", moduleA)
  runtime.loadModule("module-b", moduleB)
  expect(runtime.run()).toBe(Status.Terminated)
})
