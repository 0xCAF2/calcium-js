import { Command } from '.'
import { Expression } from '../expression'
import { Block, Kind, Result } from '../runtime/block'
import { Environment } from '../runtime/environment'

export class While implements Command {
  constructor(public readonly condition: Expression) {}
  execute(env: Environment): void {
    const block = new Block(
      Kind.While,
      env.address,
      (env) => {
        const value = env.evaluate(this.condition)
        return value ? true : false
      },
      (env) => {
        block.willEnter(env)
        return Result.Jumpped
      }
    )
    block.willEnter(env)
  }
}
