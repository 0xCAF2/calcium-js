import { calciumGenerator } from "./generator"

calciumGenerator.forBlock["on"] = (block, generator) => {
  const event = block.getFieldValue("EVENT")
  generator.shiftIndent(1)
  const body = generator.statementToCode(block, "HANDLER")
  generator.shiftIndent(-1)
  return `[${generator.indent}, [], "on", ${JSON.stringify(event)}],` + body
}
