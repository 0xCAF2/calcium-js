import { test } from "vitest"
import { runTest } from "./testCases/runner"

test("Redeclare 'new' operator", () => {
  runTest("new.js")
})
