import { calciumGenerator } from "."

calciumGenerator.forBlock["if"] = (block, generator) => {
  const conditionCode = generator.valueToCode(block, "COND", 0) || "false"
  generator.shiftIndent(2)
  const thenCode = generator.statementToCode(block, "STMTS")
  generator.shiftIndent(-2)
  return `[${generator.indent}, [], "ifs"],[${generator.indent + 1}, [], "if", ${conditionCode}],${thenCode}`
}
