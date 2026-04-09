import { calciumGenerator } from "."

calciumGenerator.forBlock["assign"] = (block, generator) => {
  const variable = generator.valueToCode(block, "VAR", 0) || '["var", "i"]'
  const valueCode = generator.valueToCode(block, "VALUE", 0) || '["num", "0"]'
  return `[${generator.indent}, [], "=", ${variable}, ${valueCode}],`
}
