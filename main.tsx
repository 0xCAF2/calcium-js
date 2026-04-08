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
        "for of",
        "num",
        [
          "array",
          [
            ["num", "1"],
            ["num", "2"],
            ["num", "3"],
          ],
        ],
      ],
      [3, [], "p"],
      [4, [], "ifs"],
      [5, [], "if", ["===", ["%", ["var", "num"], ["num", "2"]], ["num", "1"]]],
      [6, [], "css", "color", "dodgerblue"],
      [4, [], "text", ["+", "This is a paragraph ", ["var", "num"]]],
      [1, [], "end"],
    ]}
  />,
  document.getElementById("root")!,
)
