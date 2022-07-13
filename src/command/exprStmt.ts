import { Command } from '.'
import { Environment } from '../runtime/environment'
import * as Expr from '../expression'

export default class ExprStmt implements Command {
  constructor(public readonly expr: Expr.Expression) {}
  execute(env: Environment): void {
    env.evaluate(this.expr)
  }
}
