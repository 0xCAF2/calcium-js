import { Command } from './command'
import { Expression, Reference } from './expression'
import { Statement } from './statement'

export interface Parser {
  readExpr(elem: Element): Expression
  readRef(elem: Element): Reference
  readStmt(stmt: Statement): Command
}
