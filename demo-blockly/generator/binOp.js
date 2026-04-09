import { calciumGenerator } from "."

calciumGenerator.forBlock["bin_op"] = (block, generator) => {
  const operator = block.getFieldValue("OP")
  const leftCode = generator.valueToCode(block, "LEFT", 0) || '["num", "0"]'
  const rightCode = generator.valueToCode(block, "RIGHT", 0) || '["num", "1"]'
  return [`["${operator}", ${leftCode}, ${rightCode}]`, 0]
}
