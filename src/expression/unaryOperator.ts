import { Expression } from '.'
import { Environment } from '../runtime/environment'
import * as Kw from '../keywords'

export default class UnaryOperator {
  constructor(
    public readonly operator: string,
    public readonly operand: Expression
  ) {}

  evaluate(env: Environment): Expression {
    const value = env.evaluate(this.operand)
    switch (this.operator) {
      case Kw.UnaryOperator.Not:
        return !value
      case Kw.UnaryOperator.Negative:
        if (typeof value === 'number' || typeof value === 'bigint') {
          return -value
        } else {
          throw new Error('- not supported')
        }
      case Kw.UnaryOperator.BitwiseNot:
        if (typeof value === 'number' || typeof value === 'bigint') {
          return ~value
        } else {
          throw new Error('- not supported')
        }
      default:
        throw new Error(`${this.operator} not implemented`)
    }
  }
}
