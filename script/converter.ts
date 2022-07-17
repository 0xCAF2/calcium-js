import { readFileSync } from 'fs'
import * as ts from 'typescript'
import * as Calcium from '../dist'

const fileName = process.argv.at(2)!

let sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  true
)

function parseExpr(n: ts.Node): Calcium.Element.Any {
  if (ts.isIdentifier(n)) {
    return [Calcium.Keyword.Reference.Variable, n.text]
  } else if (ts.isPropertyAccessExpression(n)) {
    const propertyName = n.name.text
    const obj = parseExpr(n.expression)
    if (Array.isArray(obj)) {
      const kw = obj[0]
      if (kw === Calcium.Keyword.Reference.Variable) {
        return [Calcium.Keyword.Reference.Property, obj[1], propertyName]
      } else if (kw === Calcium.Keyword.Reference.Property) {
        return [Calcium.Keyword.Reference.Property, obj, propertyName]
      }
    } else {
      throw new Error('invalid property access')
    }
  } else if (ts.isNumericLiteral(n)) {
    return parseInt(n.text)
  } else if (ts.isStringLiteral(n)) {
    return n.text
  } else if (n.kind === ts.SyntaxKind.FalseKeyword) {
    return false
  } else if (n.kind === ts.SyntaxKind.TrueKeyword) {
    return true
  } else if (ts.isBinaryExpression(n)) {
    return [n.operatorToken.getText(), parseExpr(n.left), parseExpr(n.right)]
  } else if (ts.isPrefixUnaryExpression(n)) {
    switch (n.operator) {
      case ts.SyntaxKind.ExclamationToken:
        return [Calcium.Keyword.UnaryOperator.Not, parseExpr(n.operand)]
    }
  } else if (ts.isArrayLiteralExpression(n)) {
    return [n.elements.map((e) => parseExpr(e))]
  } else if (ts.isExpressionStatement(n)) {
    const expr = n.expression
    if (ts.isCallExpression(expr)) {
      const ref = parseExpr(expr.expression)
      let args = expr.arguments.map((n) => parseExpr(n))
      return [Calcium.Keyword.Expression.Call, ref, args]
    }
  } else if (ts.isParenthesizedExpression(n)) {
    const expr = parseExpr(n.expression)
    return expr
  }
  console.error(n)
  throw new Error('Not implemented')
}

let indent = 1
const code: Calcium.Statement[] = []
function visit(stmt: ts.Node) {
  if (ts.isVariableStatement(stmt)) {
    const name = stmt.declarationList.declarations[0].name.getText()
    const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) === 2
    let rhs: Calcium.Element.Any
    ts.visitNode(stmt.declarationList.declarations[0].initializer!, (n) => {
      rhs = parseExpr(n)
      return n
    })
    let keyword: Calcium.Keyword.Command
    if (isConst) {
      keyword = Calcium.Keyword.Command.Const
    } else {
      keyword = Calcium.Keyword.Command.Let
    }
    code.push([indent, [], keyword, name, rhs!])
  } else if (ts.isExpressionStatement(stmt)) {
    if (
      stmt
        .getChildren()
        .some(
          (n) =>
            n.kind === ts.SyntaxKind.BinaryExpression &&
            n.getChildAt(1).kind === ts.SyntaxKind.FirstAssignment
        )
    ) {
      const keyword = Calcium.Keyword.Command.Assign
      let lhs: Calcium.Element.Reference
      let rhs: Calcium.Element.Any
      ts.visitNode(
        stmt
          .getChildren()
          .filter((n) => n.kind === ts.SyntaxKind.BinaryExpression)[0],
        (n) => {
          const assignment = n as ts.BinaryExpression
          lhs = [
            Calcium.Keyword.Reference.Variable,
            (assignment.left as ts.Identifier).text,
          ]
          rhs = parseExpr(assignment.right)
          return n
        }
      )
      code.push([indent, [], keyword, lhs!, rhs!])
    } else {
      const keyword = Calcium.Keyword.Command.ExprStmt
      code.push([indent, [], keyword, parseExpr(stmt)])
    }
  } else if (ts.isIfStatement(stmt)) {
    const condition = parseExpr(stmt.expression)
    code.push([indent, [], Calcium.Keyword.Command.Ifs])
    ++indent
    code.push([indent, [], Calcium.Keyword.Command.If, condition])
    ++indent
    visit(stmt.thenStatement)
    --indent
    if (stmt.elseStatement !== undefined) {
      const visitElseIf = function (n: ts.Node) {
        if (ts.isIfStatement(n)) {
          // output else if command
          code.push([
            indent,
            [],
            Calcium.Keyword.Command.ElseIf,
            parseExpr(n.expression),
          ])
          ++indent
          visit(n.thenStatement)
          --indent
          if (n.elseStatement !== undefined) {
            visitElseIf(n.elseStatement)
          }
        } else {
          code.push([indent, [], Calcium.Keyword.Command.Else])
          ++indent
          visit(n)
          --indent
        }
      }
      visitElseIf(stmt.elseStatement)
    }
    --indent
  } else if (ts.isForOfStatement(stmt)) {
    const variableName = (
      stmt.initializer as ts.VariableDeclarationList
    ).declarations[0].name.getText()
    const iterable = parseExpr(stmt.expression)
    code.push([
      indent,
      [],
      Calcium.Keyword.Command.ForOf,
      variableName,
      iterable,
    ])
    ++indent
    visit(stmt.statement)
    --indent
  } else if (ts.isWhileStatement(stmt)) {
    const condition = parseExpr(stmt.expression)
    code.push([indent, [], Calcium.Keyword.Command.While, condition])
    ++indent
    visit(stmt.statement)
    --indent
  } else if (ts.isBlock(stmt)) {
    for (const s of stmt.statements) {
      visit(s)
    }
  }
}

for (const stmt of sourceFile.statements) {
  visit(stmt)
}
code.push([1, [], Calcium.Keyword.Command.End])
console.dir(code, { depth: null })
