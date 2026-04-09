import { calciumGenerator } from "./generator"

calciumGenerator.forBlock["array"] = (block, generator) => {
  const element0 = generator.valueToCode(block, "ELEM0", 0) || '["num", "0"]'
  const element1 = generator.valueToCode(block, "ELEM1", 0) || '["num", "1"]'
  const element2 = generator.valueToCode(block, "ELEM2", 0) || '["num", "2"]'
  return [`["array", [${element0}, ${element1}, ${element2}]]`, 0]
}
