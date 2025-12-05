import { test } from "vitest"
import { runTest } from "./testCases/runner"

test('Say "Hello, World."', () => {
  runTest("hello.js")
})
