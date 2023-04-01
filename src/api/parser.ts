import { Command } from './command'
import { Element, Operation } from './element'
import { CommandNotDefined } from './error'
import { Expression, Reference } from './expression'
import { Index, Statement } from './statement'

export abstract class Parser {
  constructor(readonly table: CommandTable) {}

  abstract readExpr(elem: Element): Expression
  abstract readRef(elem: Operation): Reference

  readStmt(stmt: Statement): Command {
    const keyword = stmt[Index.Command]
    const generator = this.table.get(keyword)
    if (generator) {
      return generator(this, stmt)
    } else {
      throw new CommandNotDefined(keyword)
    }
  }
}

export type CommandTable = Map<
  string,
  (parser: Parser, stmt: Statement) => Command
>
