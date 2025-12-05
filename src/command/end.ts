import type { Command } from "./"
import { Environment } from "../runtime/environment"
import { commandTable } from "../core/table"
import * as Keyword from "../core/keywords"

/**
 * terminate a program
 */
export class End implements Command {
  /**
   * do nothing
   * @param env
   */
  execute(env: Environment) {}
}

commandTable.set(Keyword.Command.End, () => {
  return new End()
})
