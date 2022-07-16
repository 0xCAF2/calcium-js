import { Command } from '.'
import { Expression } from '../expression'
import { Kind } from '../runtime/block'
import { Environment } from '../runtime/environment'

export default class Return implements Command {
  constructor(public readonly expr?: Expression) {}

  execute(env: Environment): void {
    env.returnedValue = env.evaluate(this.expr)
    while (true) {
      const block = env.blocks.at(-1)!
      switch (block.kind) {
        case Kind.Call:
          block.didExit(env)
          return
        default:
          env.blocks.pop()
          continue
      }
    }
  }
}
