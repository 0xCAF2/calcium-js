import { readFileSync } from 'fs'
import * as ts from 'typescript'

const fileName = process.argv.at(2)!

let sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  true
)

let o = {}
o = {}
Reflect.get(o, 'toString')

for (const stmt of sourceFile.statements) {
  if (ts.isVariableStatement(stmt)) {
    const name = stmt.declarationList.declarations[0].name.getText()
    const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) === 2
    if (isConst) {
      console.log('Const')
      continue
    } else {
      console.log('Let')
      continue
    }
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
      console.log('Assign')
      continue
    } else {
      console.log('Expr')
      continue
    }
  }
}
