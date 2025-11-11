import { commandTable } from "../core/table"
import type { Expression } from "../expression"
import { Environment } from "../runtime/environment"
import { Conditional } from "./conditional"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

/**
 * if statement
 */
export class If extends Conditional {
  /**
   *
   * @param condition an expression to determine whether
   * the statement shoule be executed
   */
  constructor(public readonly condition: Expression) {
    super()
  }
  isSatisfied(env: Environment): boolean {
    const result = env.evaluate(this.condition)
    return result ? true : false
  }
}

commandTable.set(Keyword.Command.If, (stmt, exprParser) => {
  const condition = exprParser.readExpr(stmt[Index.Conditional.Expr])
  return new If(condition)
})
