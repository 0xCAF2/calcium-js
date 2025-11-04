import { Address } from './address'
import { Block, Result } from './block'
import { CallingCmd } from './callingCmd'
import * as Err from '../error'
import * as Idx from '../indexes'
import { Namespace } from './namespace'
import type { Statement } from './statement'
import * as Expr from '../expression'
import type { AnyType } from './types'

export type OutputFunction = (desc: string) => void

export class Environment {
  address = new Address(1, 0)
  blocks: Block[] = []
  calls: CallingCmd[] = []
  code: Statement[]
  context = new Namespace()
  returnedValue: AnyType
  stack: Namespace[] = []
  thisObj: AnyType

  constructor(code: Statement[]) {
    this.code = code
    this.context = new Namespace()
  }

  evaluate(value: Expr.Expression): AnyType {
    if (
      value instanceof Expr.Variable ||
      value instanceof Expr.Property ||
      value instanceof Expr.Subscript ||
      value instanceof Expr.Call ||
      value instanceof Expr.BinaryOperator ||
      value instanceof Expr.UnaryOperator ||
      value instanceof Expr.New
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
