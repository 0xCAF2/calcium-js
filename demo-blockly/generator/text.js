import { calciumGenerator } from "."

calciumGenerator.forBlock["txt"] = (block, generator) => {
  const text = generator.valueToCode(block, "TEXT", 0) || '"Hello, World."'
  return `[${generator.indent}, [], "text", ${text}],`
}
