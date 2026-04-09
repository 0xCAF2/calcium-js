import { calciumGenerator } from "."

calciumGenerator.forBlock["for_of"] = (block, generator) => {
  const variable = block.getFieldValue("VAR") || "i"
  const iterableCode =
    generator.valueToCode(block, "ITER", 0) ||
    '["array", [["num", "0"], ["num", "1"], ["num", "2"]]]'
  generator.shiftIndent(1)
  const bodyCode = generator.statementToCode(block, "STMTS")
  generator.shiftIndent(-1)
  return `[${generator.indent}, [], "for of", ${JSON.stringify(variable)}, ${iterableCode}],${bodyCode}`
}
