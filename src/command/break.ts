import type { Command } from '.'
import { InvalidBreak } from '../error'
import { Kind } from '../runtime/block'
import { Environment } from '../runtime/environment'

export class Break implements Command {
  execute(env: Environment): void {
    while (true) {
      const block = env.blocks.pop()
      if (block?.kind === Kind.While || block?.kind === Kind.For) {
        env.address.shift(-1)
        break
      } else if (
        block?.kind === Kind.Ifs ||
        block?.kind === Kind.IfElseIfElse
      ) {
        env.address.shift(-1)
        continue
      } else {
        throw new InvalidBreak()
      }
    }
  }
}
