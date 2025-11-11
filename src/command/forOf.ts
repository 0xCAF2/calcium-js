import type { Command } from "."
import { commandTable } from "../core/table"
import type { Expression } from "../expression"
import { Block, Kind, Result } from "../runtime/block"
import { Environment } from "../runtime/environment"
import * as Index from "../core/indexes"
import * as Keyword from "../core/keywords"

export class ForOf implements Command {
  constructor(
    public readonly variableName: string,
    public readonly iterable: Expression
  ) {}

  execute(env: Environment): void {
    const iterator = (env.evaluate(this.iterable) as any)[Symbol.iterator]()
    const block = new Block(
      Kind.For,
      env.address,
      (env) => {
        const nextObj = iterator.next()
        if (nextObj.done) {
          return false
        }
        env.context.register(this.variableName, nextObj.value)
        return true
      },
      (env) => {
        block.willEnter(env)
        return Result.Jumpped
      }
    )
    block.willEnter(env)
  }
}

commandTable.set(Keyword.Command.ForOf, (stmt, exprParser) => {
  const variableName = stmt[Index.ForOf.VariableName] as string
  const iterable = exprParser.readExpr(stmt[Index.ForOf.Iterable])
  return new ForOf(variableName, iterable)
})
