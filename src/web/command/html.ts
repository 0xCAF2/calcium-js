import type { Command } from "../../command"
import { commandTable } from "../../core/table"
import type { Environment } from "../../runtime/environment"
import { HtmlBlock } from "../block/htmlBlock"

export class Html implements Command {
  execute(env: Environment): void {
    const block = new HtmlBlock(env)
    block.willEnter(env)
  }
}

commandTable.set("html", (stmt, exprParser) => {
  return new Html()
})
