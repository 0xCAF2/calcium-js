import { calciumGenerator } from "."

calciumGenerator.forBlock["variable"] = (block, generator) => {
  const variableName = block.getFieldValue("VAR") || "i"
  return [JSON.stringify(["var", variableName]), 0]
}
