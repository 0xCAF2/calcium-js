import type { Command } from '.'
import type { Expression, Reference } from '../expression'
import { Environment } from '../runtime/environment'

export class Assign implements Command {
  constructor(
    public readonly lhs: Reference,
    public readonly rhs: Expression
  ) { }

  execute(env: Environment): void {
    const rhsValue = env.evaluate(this.rhs)
    this.lhs.assign(rhsValue, env)
  }
}
