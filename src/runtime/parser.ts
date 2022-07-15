import * as Cmd from '../command'
import * as Elem from './element'
import * as Err from '../error'
import * as Expr from '../expression'
import * as Kw from '../keywords'
import Statement from './statement'
import * as Idx from '../indexes'
import { AnyType } from './types'

export default class Parser {
  readonly table = new Map<Kw.Command, (stmt: Statement) => Cmd.Command>()

  constructor() {
    this.table.set(Kw.Command.Break, (stmt) => {
      return new Cmd.Break()
    })
    this.table.set(Kw.Command.Continue, (stmt) => {
      return new Cmd.Continue()
    })
    this.table.set(Kw.Command.Const, (stmt) => {
      const name = stmt[Idx.Assign.Lhs] as string
      const value = stmt[Idx.Assign.Rhs] as AnyType
      return new Cmd.Const(name, value)
    })
    this.table.set(Kw.Command.Else, (stmt) => {
      return new Cmd.Else()
    })
    this.table.set(Kw.Command.ElseIf, (stmt) => {
      const condition = this.readExpr(stmt[Idx.Conditional.Expr])
      return new Cmd.ElseIf(condition)
    })
    this.table.set(Kw.Command.End, (stmt) => {
      return new Cmd.End()
    })
    this.table.set(Kw.Command.ExprStmt, (stmt) => {
      const expr = this.readExpr(stmt[Idx.ExprStmt.Expr])
      return new Cmd.ExprStmt(expr)
    })
    this.table.set(Kw.Command.ForOf, (stmt) => {
      const variableName = stmt[Idx.ForOf.VariableName] as string
      const iterable = this.readExpr(stmt[Idx.ForOf.Iterable])
      return new Cmd.ForOf(variableName, iterable)
    })
    this.table.set(Kw.Command.If, (stmt) => {
      const condition = this.readExpr(stmt[Idx.Conditional.Expr])
      return new Cmd.If(condition)
    })
    this.table.set(Kw.Command.Ifs, (stmt) => {
      return new Cmd.Ifs()
    })
  }

  readArgs(elems: Elem.Any[]): Expr.Expression[] {
    const args: Expr.Expression[] = []
    for (const arg of elems) {
      args.push(this.readExpr(arg))
    }
    return args
  }

  readBinOp(operator: string, expr: Elem.Any[]): Expr.BinaryOperator {
    const left = this.readExpr(expr[Idx.BinaryOperator.Left])
    const right = this.readExpr(expr[Idx.BinaryOperator.Right])
    return new Expr.BinaryOperator(operator, left, right)
  }

  readExpr(elem: Elem.Any): Expr.Expression {
    if (Array.isArray(elem)) {
      if (Array.isArray(elem[0])) {
        // an array literal
        return elem[0] as AnyType[]
      } else {
        const kw = elem[Idx.Expression.Keyword] as string
        if (kw === Kw.Reference.Variable || kw === Kw.Reference.Property) {
          return this.readRef(elem as Elem.Reference)
        } else if (kw === Kw.Expression.Call) {
          const ref = this.readRef(elem[Idx.Call.FuncRef] as Elem.Reference)
          const args = this.readArgs(elem[Idx.Call.Args] as Elem.Any[])
          return new Expr.Call(ref, args)
        } else if (elem.length === 3) {
          return this.readBinOp(kw, elem)
        } else if (elem.length === 2) {
          return this.readUnary(kw, elem)
        }
      }
    } else {
      return elem
    }
    throw new Error('Not implemented')
  }

  readRef(elem: Elem.Reference): Expr.Reference {
    const kw = elem[Idx.Expression.Keyword]
    if (kw === Kw.Reference.Variable) {
      return new Expr.Variable(elem[Idx.Variable.Name] as string)
    } else if (kw === Kw.Reference.Property) {
      const variableName = elem[Idx.Property.VariableName] as string
      const properties: string[] = []
      for (let i = Idx.Property.FirstPropertyName; i < elem.length; ++i) {
        properties.push(elem[i] as string)
      }
      return new Expr.Property(variableName, properties)
    } else {
      throw new Error('Not implemented')
    }
  }

  readStmt(stmt: Statement): Cmd.Command {
    const kw = stmt[Idx.Statement.Keyword]
    const cmd = this.table.get(kw)?.(stmt)
    if (cmd === undefined) {
      throw new Err.CommandNotDefined(kw)
    }
    return cmd
  }

  readUnary(operator: string, elem: Elem.Any[]): Expr.Expression {
    return new Expr.UnaryOperator(
      operator,
      this.readExpr(elem[Idx.UnaryOperator.Operand])
    )
  }
}
