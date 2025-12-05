import { test } from "vitest"
import { runTest } from "./testCases/runner"

test("Create and modify an object", () => {
  runTest("object.js")
})
