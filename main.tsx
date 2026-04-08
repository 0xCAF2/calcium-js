import { render } from "preact"
import { CalciumInterpreter } from "./src/web"

render(
  // @ts-ignore
  <CalciumInterpreter
    code={[
      [1, [], "html"],
      [
        2,
        [],
        "expr",
        ["call", ["prop", ["var", "console"], "log"], ["Hello, World."]],
      ],
      [2, [], "for of", "num", ["array", ["1", "2", "3"]]],
      [3, [], "p"],
      [4, [], "text", ["+", "This is a paragraph ", ["var", "num"]]],
      [1, [], "end"],
    ]}
  />,
  document.getElementById("root")!,
)
