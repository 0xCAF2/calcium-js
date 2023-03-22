import { Command } from './command'
import { CommandNotDefined } from './error'
import { Expression, Reference } from './expression'
import { Index, Statement } from './statement'

export abstract class Parser {
  constructor(readonly table: CommandTable) {}

  abstract readExpr(elem: Element): Expression
  abstract readRef(elem: Element): Reference

  readStmt(stmt: Statement): Command {
    const keyword = stmt[Index.Command]
    const generator = this.table.get(keyword)
    if (generator) {
      return generator(stmt)
    } else {
      throw new CommandNotDefined()
    }
  }
}

export type CommandTable = Map<string, (stmt: Statement) => Command>
