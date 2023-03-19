import { Command } from '.'
import { Expression } from '../expression'
import { Block, Kind, Result } from '../runtime/block'
import { Constant } from '../runtime/constant'
import { Environment } from '../runtime/environment'

export class ForOf implements Command {
  constructor(
    public readonly variableName: string,
    public readonly iterable: Expression
  ) {}

  execute(env: Environment): void {
    const iterator = (env.evaluate(this.iterable) as any)[Symbol.iterator]()
    const block = new Block(
      Kind.For,
      env.address,
      (env) => {
        const nextObj = iterator.next()
        if (nextObj.done) {
          return false
        }
        env.context.register(
          this.variableName,
          new Constant(this.variableName, nextObj.value)
        )
        return true
      },
      (env) => {
        block.willEnter(env)
        return Result.Jumpped
      }
    )
    block.willEnter(env)
  }
}
