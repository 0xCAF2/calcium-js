import { test, expect } from "vitest"
import { Runtime, Status } from "../src"
import { code } from "./testCases/add"

test("Add sequences of numbers", () => {
  const runtime = new Runtime(code as any)
  expect(runtime.run()).toBe(Status.Terminated)
})
