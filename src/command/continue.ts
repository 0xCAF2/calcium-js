import type { Command } from "."
import { commandTable } from "../core/table"
import { InvalidContinue } from "../error"
import { Kind } from "../runtime/block"
import { Environment } from "../runtime/environment"
import * as Keyword from "../core/keywords"

export class Continue implements Command {
  execute(env: Environment): void {
    while (true) {
      const block = env.blocks.pop()
      if (block?.kind === Kind.While || block?.kind === Kind.For) {
        block.willEnter(env)
        break
      } else if (
        block?.kind === Kind.Ifs ||
        block?.kind === Kind.IfElseIfElse
      ) {
        env.address.shift(-1)
        continue
      } else {
        throw new InvalidContinue()
      }
    }
  }
}

commandTable.set(Keyword.Command.Continue, () => {
  return new Continue()
})
