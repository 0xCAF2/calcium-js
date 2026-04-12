import type { Command } from "../../command"
import { commandTable } from "../../core/table"
import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "../block/elementBlock"

export class Div implements Command {
  execute(env: Environment): void {
    const block = new ElementBlock(env, "div")
    block.willEnter(env)
  }
}

commandTable.set("div", (stmt, exprParser) => {
  return new Div()
})
