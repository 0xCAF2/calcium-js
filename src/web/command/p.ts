import type { Command } from "../../command"
import { commandTable } from "../../core/table"
import type { Environment } from "../../runtime/environment"
import { ElementBlock } from "../block/elementBlock"

export class P implements Command {
  execute(env: Environment): void {
    const block = new ElementBlock(env, "p")
    block.willEnter(env)
  }
}

commandTable.set("p", (stmt, exprParser) => {
  return new P()
})
