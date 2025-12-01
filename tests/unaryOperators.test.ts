import { test } from "vitest"
import { runTest } from "./testCases/runner"

test("Unary operators", () => {
  runTest("unaryOperators.js")
})
