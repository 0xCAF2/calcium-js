import { calciumGenerator } from "./generator"

calciumGenerator.forBlock["num"] = (block, generator) => {
  const numStr = block.getFieldValue("NUM")
  return [JSON.stringify(["num", numStr]), 0]
}
