import type { Command } from '.'
import type { Expression } from '../expression'
import { Environment } from '../runtime/environment'
import { Variable } from '../runtime/variable'

export class Let implements Command {
  constructor(
    public readonly name: string,
    public readonly value?: Expression
  ) { }
  execute(env: Environment) {
    env.context.register(
      this.name,
      new Variable(this.name, env.evaluate(this.value ?? undefined))
    )
  }
}
