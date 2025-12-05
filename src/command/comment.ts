import type { Command } from "."
import { commandTable } from "../core/table"
import { Environment } from "../runtime/environment"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class Comment implements Command {
  constructor(public readonly text: string | undefined) {}

  execute(env: Environment): void {
    // do nothing
  }
}

commandTable.set(Keyword.Command.Comment, (stmt) => {
  return new Comment(stmt[Index.Comment.Text] as string | undefined)
})
