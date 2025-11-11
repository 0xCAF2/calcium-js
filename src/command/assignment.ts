import type { Command } from "."
import { commandTable } from "../core/table"
import type { Expression, Reference } from "../expression"
import { Environment } from "../runtime/environment"
import * as Element from "../runtime/element"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class Assignment implements Command {
  constructor(
    public readonly lhs: Reference,
    public readonly rhs: Expression
  ) {}

  execute(env: Environment): void {
    const rhsValue = env.evaluate(this.rhs)
    this.lhs.assign(rhsValue, env)
  }
}

commandTable.set(Keyword.Command.Assignment, (stmt, exprParser) => {
  const lhs = exprParser.readRef(
    stmt[Index.Assignment.Lhs] as Element.Reference
  )
  const rhs = exprParser.readExpr(stmt[Index.Assignment.Rhs] as Element.Any)
  return new Assignment(lhs, rhs)
})
