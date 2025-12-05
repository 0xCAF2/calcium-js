import type { Expression } from "."
import { Environment } from "../runtime/environment"
import type { AnyType } from "../runtime/types"
import * as Kw from "../core/keywords"

export class BinaryOperator {
  constructor(
    public readonly operator: string,
    public readonly left: Expression,
    public readonly right: Expression
  ) {}
  evaluate(env: Environment): AnyType {
    const l = env.evaluate(this.left) as any
    const r = env.evaluate(this.right) as any
    switch (this.operator) {
      case Kw.BinaryOperator.Addition:
        return l + r
      case Kw.BinaryOperator.And:
        return l && r
      case Kw.BinaryOperator.BitwiseAnd:
        return l & r
      case Kw.BinaryOperator.BitwiseOr:
        return l | r
      case Kw.BinaryOperator.BitwiseXor:
        return l ^ r
      case Kw.BinaryOperator.Division:
        return l / r
      case Kw.BinaryOperator.Equal:
        return l === r
      case Kw.BinaryOperator.Exponentiation:
        return l ** r
      case Kw.BinaryOperator.GreaterThan:
        return l > r
      case Kw.BinaryOperator.GreaterThanOrEqual:
        return l >= r
      case Kw.BinaryOperator.LeftShift:
        return l << r
      case Kw.BinaryOperator.LessThan:
        return l < r
      case Kw.BinaryOperator.LessThanOrEqual:
        return l <= r
      case Kw.BinaryOperator.Multiplication:
        return l * r
      case Kw.BinaryOperator.NotEqual:
        return l !== r
      case Kw.BinaryOperator.Or:
        return l || r
      case Kw.BinaryOperator.Remainder:
        return l % r
      case Kw.BinaryOperator.RightShift:
        return l >> r
      case Kw.BinaryOperator.Subtraction:
        return l - r
      default:
        throw new Error(`${this.operator} not implemented`)
    }
  }
}
