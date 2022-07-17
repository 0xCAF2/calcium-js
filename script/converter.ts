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
  } else if (ts.isBinaryExpression(n)) {
    return [n.operatorToken.getText(), parseExpr(n.left), parseExpr(n.right)]
  } else if (ts.isExpressionStatement(n)) {
    const expr = n.expression
    if (ts.isCallExpression(expr)) {
      const ref = parseExpr(expr.expression)
      let args = expr.arguments.map((n) => parseExpr(n))
      return [Calcium.Keyword.Expression.Call, ref, args]
    }
  }
  throw new Error('not implemented')
}

let indent = 1
const code: Calcium.Statement[] = []
for (const stmt of sourceFile.statements) {
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
  }
}

code.push([1, [], Calcium.Keyword.Command.End])
console.dir(code, { depth: null })
