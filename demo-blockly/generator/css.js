import { calciumGenerator } from "."

calciumGenerator.forBlock["css"] = (block, generator) => {
  const property = block.getFieldValue("PROPERTY")
  const value = generator.valueToCode(block, "VALUE", 0) || '"red"'
  return `[${generator.indent}, [], "css", ${JSON.stringify(property)}, ${value}],`
}
