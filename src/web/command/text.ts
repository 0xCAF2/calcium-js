import type { Command } from "../../command"
import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "../block/elementBlock"
import { commandTable } from "../../core/table"
import { Index } from "../.."
import type { Expression } from "../../expression"
import { findElementBlock } from "../block/findElementBlock"

export class Text implements Command {
  constructor(public readonly text: Expression) {}

  execute(env: Environment): void {
    const parent = findElementBlock(env)
    if (parent instanceof ElementBlock) {
      parent.children.push(env.evaluate(this.text))
    } else {
      throw new Error("Text command must be inside an element block")
    }
  }
}

commandTable.set("text", (stmt, exprParser) => {
  const expr = stmt.at(Index.Statement.FirstArg)
  const text = exprParser.readExpr(expr)
  return new Text(text)
})
