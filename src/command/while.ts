import type { Command } from "."
import { commandTable } from "../core/table"
import type { Expression } from "../expression"
import { Block, Kind, Result } from "../runtime/block"
import { Environment } from "../runtime/environment"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class While implements Command {
  constructor(public readonly condition: Expression) {}
  execute(env: Environment): void {
    const block = new Block(
      Kind.While,
      env.address,
      (env) => {
        const value = env.evaluate(this.condition)
        return value ? true : false
      },
      (env) => {
        block.willEnter(env)
        return Result.Jumpped
      }
    )
    block.willEnter(env)
  }
}

commandTable.set(Keyword.Command.While, (stmt, exprParser) => {
  const condition = exprParser.readExpr(stmt[Index.Conditional.Expr])
  return new While(condition)
})
