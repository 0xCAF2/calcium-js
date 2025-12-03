import * as Cmd from "../command"
import * as Elem from "../runtime/element"
import * as Expr from "../expression"
import * as Kw from "../core/keywords"
import type { Statement } from "./statement"
import * as Idx from "../core/indexes"
import { CommandNotDefined, UnknownExpr } from "../error"

export type CommandTable = Map<
  string,
  (stmt: Statement, exprParser: ExpressionParser) => Cmd.Command
>

export class StatementParser {
  table: CommandTable
  exprParser: ExpressionParser

  constructor(table: CommandTable, exprParser: ExpressionParser) {
    this.table = table
    this.exprParser = exprParser
  }

  readStmt(stmt: Statement): Cmd.Command {
    const kw = stmt[Idx.Statement.Keyword]
    const cmd = this.table.get(kw)?.(stmt, this.exprParser)
    if (cmd === undefined) {
      throw new CommandNotDefined(kw)
    }
    return cmd
  }
}

export class ExpressionParser {
  readArgs(elems: Elem.Any[]): Expr.Expression[] {
    const args: Expr.Expression[] = []
    for (const arg of elems) {
      args.push(this.readExpr(arg))
    }
    return args
  }

  readBinOp(
    operator: string,
    expr: [Elem.BinaryOperator, Elem.Any, Elem.Any]
  ): Expr.BinaryOperator {
    const left = this.readExpr(expr[Idx.BinaryOperator.Left])
    const right = this.readExpr(expr[Idx.BinaryOperator.Right])
    return new Expr.BinaryOperator(operator, left, right)
  }

  readExpr(elem: Elem.Any): Expr.Expression {
    if (
      typeof elem === "string" ||
      typeof elem === "boolean" ||
      elem === null
    ) {
      return elem
    }
    const kw = elem[Idx.Expression.Keyword] as string
    if (kw === Kw.Expression.Num) {
      const value = elem[Idx.Num.Value] as string
      const intValue = parseInt(value)
      if (Number.isNaN(intValue)) {
        return parseFloat(value)
      } else {
        return intValue
      }
    } else if (kw === Kw.Expression.ArrayLiteral) {
      const items = elem[Idx.ArrayLiteral.Elements] as Elem.Any[]
      return items.map((item) => this.readExpr(item))
    } else if (kw === Kw.Expression.ObjectLiteral) {
      const props = elem[Idx.ObjectLiteral.Properties] as Elem.KeyValuePair[]
      const obj: { [key: string]: Expr.Expression } = {}
      for (const [key, value] of props) {
        obj[key] = this.readExpr(value)
      }
      return obj
    } else if (
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
    } else if (Object.values<string>(Kw.BinaryOperator).includes(kw)) {
      return this.readBinOp(
        kw,
        elem as [Elem.BinaryOperator, Elem.Any, Elem.Any]
      )
    } else if (Object.values<string>(Kw.UnaryOperator).includes(kw)) {
      return this.readUnOp(kw, elem as [Elem.UnaryOperator, Elem.Any])
    }
    throw new UnknownExpr()
  }

  readRef(elem: Elem.Reference): Expr.Reference {
    const kw = elem[Idx.Expression.Keyword]
    if (kw === Kw.Reference.Variable) {
      return new Expr.Variable(elem[Idx.Variable.Name] as string)
    } else if (kw === Kw.Reference.Property) {
      const ref = this.readRef(elem[Idx.Property.ReferredObj])
      const propertyName = elem[Idx.Property.PropertyName]
      return new Expr.Property(ref, propertyName)
    } else if (kw === Kw.Reference.Subscript) {
      const referredObj = this.readRef(
        elem[Idx.Subscript.ReferredObj] as Elem.Reference
      )
      const index = this.readExpr(elem[Idx.Subscript.IndexExpr] as Elem.Any)
      return new Expr.Subscript(referredObj, index)
    } else {
      throw new Error("Not implemented")
    }
  }

  readUnOp(
    operator: string,
    elem: [Elem.UnaryOperator, Elem.Any]
  ): Expr.UnaryOperator {
    return new Expr.UnaryOperator(
      operator,
      this.readExpr(elem[Idx.UnaryOperator.Operand])
    )
  }
}
