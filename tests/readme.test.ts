import { test } from "vitest"
import { runTest } from "./testCases/runner"

test("The sample code in README", () => {
  runTest("readme.js")
})
