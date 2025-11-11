import type { Expression, Reference } from "."
import { Environment } from "../runtime/environment"
import * as Kw from "../core/keywords"

export class UnaryOperator {
  constructor(
    public readonly operator: string,
    public readonly operand: Expression
  ) {}

  evaluate(env: Environment): Expression {
    const value = env.evaluate(this.operand)
    switch (this.operator) {
      case Kw.UnaryOperator.Not:
        return !value
      case Kw.UnaryOperator.Minus:
        if (typeof value === "number" || typeof value === "bigint") {
          return -value
        } else {
          throw new Error("- not supported")
        }
      case Kw.UnaryOperator.BitwiseNot:
        if (typeof value === "number" || typeof value === "bigint") {
          return ~value
        } else {
          throw new Error("~ not supported")
        }
      case Kw.UnaryOperator.TypeOf:
        return typeof value
      case Kw.UnaryOperator.PreIncrement:
        if (typeof value === "number" || typeof value === "bigint") {
          const assignable = this.operand as Reference
          const newValue = value + 1
          assignable.assign(newValue, env)
          return newValue
        } else {
          throw new Error("++ not supported")
        }
      case Kw.UnaryOperator.PreDecrement:
        if (typeof value === "number" || typeof value === "bigint") {
          const assignable = this.operand as Reference
          const newValue = value - 1
          assignable.assign(newValue, env)
          return newValue
        } else {
          throw new Error("-- not supported")
        }
      case Kw.UnaryOperator.PostIncrement:
        if (typeof value === "number" || typeof value === "bigint") {
          const assignable = this.operand as Reference
          const newValue = value + 1
          assignable.assign(newValue, env)
          return value
        } else {
          throw new Error("++ not supported")
        }
      case Kw.UnaryOperator.PostDecrement:
        if (typeof value === "number" || typeof value === "bigint") {
          const assignable = this.operand as Reference
          const newValue = value - 1
          assignable.assign(newValue, env)
          return value
        } else {
          throw new Error("-- not supported")
        }
      default:
        throw new Error(`${this.operator} not implemented`)
    }
  }
}
