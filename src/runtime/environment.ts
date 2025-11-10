import { Address } from "./address"
import { Block, Result } from "./block"
import { CallingCmd } from "./callingCmd"
import * as Err from "../error"
import * as Idx from "../core/indexes"
import { Namespace } from "./namespace"
import type { Statement } from "./statement"
import * as Expr from "../expression"
import type { AnyType } from "./types"
import type { StatementParser } from "./parser"

export type OutputFunction = (desc: string) => void

export class Environment {
  address = new Address(1, 0)
  blocks: Block[] = []
  calls: CallingCmd[] = []
  code: Statement[]
  context = new Namespace()

  /**
   * consumes a statement and returns a command.
   */
  parser: StatementParser

  returnedValue: AnyType
  stack: Namespace[] = []
  thisObj: AnyType

  constructor(code: Statement[], parser: StatementParser) {
    this.code = code
    this.context = new Namespace()
    this.parser = parser
  }

  evaluate(value: Expr.Expression): AnyType {
    if (
      value instanceof Expr.Variable ||
      value instanceof Expr.Property ||
      value instanceof Expr.Subscript ||
      value instanceof Expr.Call ||
      value instanceof Expr.New ||
      value instanceof Expr.BinaryOperator ||
      value instanceof Expr.UnaryOperator
    ) {
      return value.evaluate(this)
    } else {
      return value
    }
  }

  skipToNextLine() {
    let nextIndex: number
    outer: while (true) {
      nextIndex = this.address.line + 1
      inner: while (true) {
        const nextStmt = this.code[nextIndex]
        const nextIndent = nextStmt[Idx.Statement.Indent]
        const delta = this.address.indent - nextIndent
        if (delta > 0) {
          // some blocks must be popped.
          for (let i = 0; i < delta; ++i) {
            const result = this.blocks.at(-1)!.didExit(this)
            if (result === Result.Invalid) {
              throw new Err.InconsistentBlock()
            } else if (result === Result.Jumpped) {
              continue outer
            }
          }
          break outer
        } else if (delta === 0) {
          break outer
        } else {
          nextIndex += 1
          continue inner
        }
      }
    }
    this.address.line = nextIndex
  }
}
