import type { Command } from '.'
import type { Expression } from '../expression'
import { Kind } from '../runtime/block'
import { Environment } from '../runtime/environment'

export class Return implements Command {
  public readonly hasExplicitValue: boolean
  public readonly expr?: Expression
  constructor(...args: Expression[]) {
    if (args.length === 0) {
      this.hasExplicitValue = false
    } else {
      this.hasExplicitValue = true
      this.expr = args[0]
    }
  }

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
