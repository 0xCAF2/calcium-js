import type { Command } from "."
import { Environment } from "../runtime/environment"
import * as Expr from "../expression"
import { commandTable } from "../core/table"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class ExprStmt implements Command {
  constructor(public readonly expr: Expr.Expression) {}
  execute(env: Environment): void {
    env.evaluate(this.expr)
  }
}

commandTable.set(Keyword.Command.ExprStmt, (stmt, exprParser) => {
  const expr = exprParser.readExpr(stmt[Index.ExprStmt.Expr])
  return new ExprStmt(expr)
})
