import type { Expression, Reference } from '.'
import { Environment } from '../runtime/environment'

export class New {
  constructor(
    public readonly klass: Reference,
    public readonly args: Expression[]
  ) { }

  evaluate(env: Environment) {
    const ctr = env.evaluate(this.klass) as any
    const evaluatedArgs = this.args.map((a) => env.evaluate(a))
    return new ctr(...evaluatedArgs)
  }
}
