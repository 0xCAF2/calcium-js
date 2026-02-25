import { expect } from "vitest"
import { Runtime, Status } from "../../src"
import { convertJsToCalcium } from "./fileReader"

export function runTest(fileName: string): void {
  const code = convertJsToCalcium(fileName)
  const runtime = new Runtime(code, {
    canAccessWindow: false,
    enableGlobal: true,
  })
  expect(runtime.run()).toBe(Status.Terminated)
}
