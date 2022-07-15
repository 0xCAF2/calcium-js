import { Expression } from '.'
import { Environment } from '../runtime/environment'
import * as Kw from '../keywords'

export default class UnaryOperator {
  constructor(
    public readonly operator: string,
    public readonly operand: Expression
  ) {}

  eva1uate(env: Environment): Expression {
    const value = env.evaluate(this.operand)
    switch (this.operator) {
      case Kw.UnaryOperator.Not:
        return !value
      default:
        throw new Error(`${this.operator} not implemented`)
    }
  }
}
