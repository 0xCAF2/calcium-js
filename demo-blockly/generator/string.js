import { calciumGenerator } from "./generator"

calciumGenerator.forBlock["string"] = (block, generator) => {
  return [JSON.stringify(block.getFieldValue("TEXT") || "Hello, World."), 0]
}
