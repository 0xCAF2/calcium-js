import type { Command } from "."
import { commandTable } from "../core/table"
import { Block, Kind, Result } from "../runtime/block"
import { Environment } from "../runtime/environment"
import * as Keyword from "../core/keywords"

/**
 * a parent block of `If`, `ElseIf` and `Else`.
 */
export class Ifs implements Command {
  execute(env: Environment): void {
    const block = new Block(
      Kind.Ifs,
      env.address,
      () => true,
      (env) => {
        env.address.shift(-1)
        return Result.Shifted
      }
    )
    block.willEnter(env)
  }
}

commandTable.set(Keyword.Command.Ifs, () => {
  return new Ifs()
})
