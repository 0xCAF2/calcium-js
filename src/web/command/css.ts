import { Index } from "../.."
import type { Command } from "../../command"
import { commandTable } from "../../core/table"
import type { Expression } from "../../expression"
import type { Environment } from "../../runtime/environment"
import { findElementBlock } from "../block/utils"

export class Css implements Command {
  constructor(
    private readonly property: string,
    private readonly value: Expression,
  ) {}

  execute(env: Environment): void {
    const element = findElementBlock(env)
    if (element) {
      const propertyValue = env.evaluate(this.value) as string
      element.style.value = new Map(element.style.value).set(
        this.property,
        propertyValue,
      )
    } else {
      throw new Error("CSS command must be inside an element block")
    }
  }
}

commandTable.set("css", (stmt, exprParser) => {
  const property = stmt.at(Index.Statement.FirstArg)
  const value = stmt.at(Index.Statement.FirstArg + 1)
  return new Css(property, exprParser.readExpr(value))
})
