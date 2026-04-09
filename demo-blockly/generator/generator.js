import * as Blockly from "blockly"

export class CalciumGenerator extends Blockly.Generator {
  indent = 2

  constructor() {
    super("calcium")
  }

  shiftIndent(delta) {
    this.indent += delta
  }

  scrub_(_block, code, _opt_thisOnly) {
    const nextBlock =
      _block.nextConnection && _block.nextConnection.targetBlock()
    const nextCode = _opt_thisOnly ? "" : this.blockToCode(nextBlock)
    if (!code.endsWith(",") && _block.getParent() === null) {
      code = code + ","
    }
    if (nextBlock) {
      return code + nextCode
    }
    return code
  }

  finish(code) {
    const start = JSON.stringify([1, [], "html"])
    const end = JSON.stringify([1, [], "end"])
    return `[${start},${code}${end}]`
  }
}

export const trimParens = (codeStr) => {
  let strWithoutParens = codeStr
  if (codeStr && codeStr[0] === "(") {
    strWithoutParens = codeStr.substring(1, codeStr.length - 1)
  }
  return strWithoutParens
}

export function trimLastComma(code) {
  // remove the last comma in the code.
  let result = code.trimEnd()
  while (true) {
    if (result.endsWith(",")) {
      result = result.substring(0, result.length - 1)
    } else {
      break
    }
  }
  return result
}

export const calciumGenerator = new CalciumGenerator()
