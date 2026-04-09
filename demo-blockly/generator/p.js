import { calciumGenerator } from "."

calciumGenerator.forBlock["p"] = (block, generator) => {
  generator.shiftIndent(1)
  const childrenCode = calciumGenerator.statementToCode(block, "CHILDREN")
  generator.shiftIndent(-1)
  return `[${generator.indent}, [], "p"],${childrenCode}`
}
