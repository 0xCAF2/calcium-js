import * as Cmd from '../command'
import * as Elem from './element'
import * as Err from '../error'
import * as Expr from '../expression'
import * as Kw from '../keywords'
import { Statement } from './statement'
import * as Idx from '../indexes'
import { AnyType } from './types'

export class Parser {
  readonly table = new Map<Kw.Command, (stmt: Statement) => Cmd.Command>()

  constructor() {
    this.table.set(Kw.Command.Assign, (stmt) => {
      const lhs = this.readRef(stmt[Idx.Assign.Lhs] as Elem.Reference)
      const rhs = this.readExpr(stmt[Idx.Assign.Rhs])
      return new Cmd.Assign(lhs, rhs)
    })
    this.table.set(Kw.Command.Break, (stmt) => {
      return new Cmd.Break()
    })
    this.table.set(Kw.Command.Comment, (stmt) => {
      return new Cmd.Comment(stmt[Idx.Comment.Text] as string | undefined)
    })
    this.table.set(Kw.Command.Continue, (stmt) => {
      return new Cmd.Continue()
    })
    this.table.set(Kw.Command.Const, (stmt) => {
      const name = stmt[Idx.Assign.Lhs] as string
      const value = this.readExpr(stmt[Idx.Assign.Rhs])
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
    this.table.set(Kw.Command.Function, (stmt) => {
      const funcName = stmt[Idx.Function.Name] as string
      const params = stmt[Idx.Function.Parameters] as string[]
      return new Cmd.Function(funcName, params)
    })
    this.table.set(Kw.Command.If, (stmt) => {
      const condition = this.readExpr(stmt[Idx.Conditional.Expr])
      return new Cmd.If(condition)
    })
    this.table.set(Kw.Command.Ifs, (stmt) => {
      return new Cmd.Ifs()
    })
    this.table.set(Kw.Command.Let, (stmt) => {
      const name = stmt[Idx.Assign.Lhs] as string
      if (stmt.length <= Idx.Assign.Rhs) {
        return new Cmd.Let(name)
      } else {
        const value = this.readExpr(stmt[Idx.Assign.Rhs])
        return new Cmd.Let(name, value)
      }
    })
    this.table.set(Kw.Command.Return, (stmt) => {
      if (stmt.length <= Idx.Return.Expr) {
        return new Cmd.Return()
      } else {
        const expr = this.readExpr(stmt[Idx.Return.Expr])
        return new Cmd.Return(expr)
      }
    })
    this.table.set(Kw.Command.While, (stmt) => {
      const condition = this.readExpr(stmt[Idx.Conditional.Expr])
      return new Cmd.While(condition)
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
        if (
          kw === Kw.Reference.Variable ||
          kw === Kw.Reference.Property ||
          kw === Kw.Reference.Subscript
        ) {
          return this.readRef(elem as Elem.Reference)
        } else if (kw === Kw.Expression.Call) {
          const ref = this.readRef(elem[Idx.Call.FuncRef] as Elem.Reference)
          const args = this.readArgs(elem[Idx.Call.Args] as Elem.Any[])
          return new Expr.Call(ref, args)
        } else if (kw === Kw.Expression.New) {
          const klass = this.readRef(elem[Idx.New.Class] as Elem.Reference)
          const args = this.readArgs(elem[Idx.New.Args] as Elem.Any[])
          return new Expr.New(klass, args)
        } else if (elem.length === 3) {
          return this.readBinOp(kw, elem)
        } else if (elem.length === 2) {
          return this.readUnOp(kw, elem)
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
      const variableName = this.readRef(elem[Idx.Property.ReferredObj])
      const propertyName = elem[Idx.Property.PropertyName]
      return new Expr.Property(variableName, propertyName)
    } else if (kw === Kw.Reference.Subscript) {
      const referredObj = this.readRef(
        elem[Idx.Subscript.ReferredObj] as Elem.Reference
      )
      const index = this.readExpr(elem[Idx.Subscript.IndexExpr] as Elem.Any)
      return new Expr.Subscript(referredObj, index)
    } else {
      throw new Error('Not implemented')
    }
  }

  readStmt(stmt: Statement): Cmd.Command {
    const kw = stmt[Idx.Statement.Keyword] as Kw.Command
    const cmd = this.table.get(kw)?.(stmt)
    if (cmd === undefined) {
      throw new Err.CommandNotDefined(kw)
    }
    return cmd
  }

  readUnOp(operator: string, elem: Elem.Any[]): Expr.Expression {
    return new Expr.UnaryOperator(
      operator,
      this.readExpr(elem[Idx.UnaryOperator.Operand])
    )
  }
}
