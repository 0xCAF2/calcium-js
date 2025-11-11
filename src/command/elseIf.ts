import { commandTable } from "../core/table"
import { If } from "./if"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class ElseIf extends If {}

commandTable.set(Keyword.Command.ElseIf, (stmt, exprParser) => {
  const condition = exprParser.readExpr(stmt[Index.Conditional.Expr])
  return new ElseIf(condition)
})
