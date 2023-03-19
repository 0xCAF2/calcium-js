import { Command } from '.'
import { Block, Kind, Result } from '../runtime/block'
import { Environment } from '../runtime/environment'

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
