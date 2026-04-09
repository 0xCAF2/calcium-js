import { calciumGenerator } from "."

calciumGenerator.forBlock["css"] = (block, generator) => {
  const property = block.getFieldValue("PROPERTY")
  const value = block.getFieldValue("VALUE")
  return `[${generator.indent}, [], "css", ${JSON.stringify(property)}, ${JSON.stringify(value)}],`
}
