import { expect, test } from "vitest"
import { Runtime, Status } from "../src"
import { convert } from "../tool/converter"
import { openJsFile } from "./testCases/fileReader"

test("Convert JavaScript to Calcium", () => {
  const source = openJsFile("hello.js")
  const code = convert(source)
  const runtime = new Runtime(code, {
    canAccessWindow: false,
    enableGlobal: true,
  })
  expect(runtime.run()).toBe(Status.Terminated)
})
