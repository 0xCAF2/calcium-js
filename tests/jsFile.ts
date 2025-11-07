import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { convert } from "../tool/converter"

export function openJsFile(filename: string): string {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const filePath = join(__dirname, "js", filename)
  return readFileSync(filePath, "utf-8")
}

export function convertJsToCalcium(filename: string): string {
  const source = openJsFile(filename)
  return convert(source)
}
