import { render } from "preact"
import { CalciumInterpreter } from "./src/web"
import { signal } from "@preact/signals"

export const blocklyCode = signal(`[
  [1, [], "html"],
  [2, [], "p"],
  [3, [], "text", "Hello, World!"],
  [1, [], "end"]
]
`)

function App() {
  // @ts-ignore
  return <CalciumInterpreter code={blocklyCode.value} />
}

render(<App />, document.getElementById("root")!)
