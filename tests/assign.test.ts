import { test } from "vitest"
import { runTest } from "./testCases/runner"

test("Assign and reference variables", () => {
  runTest("assign.js")
})
