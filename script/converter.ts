import { readFileSync } from 'fs'
import * as ts from 'typescript'

const fileName = process.argv.at(2)!

let sourceFile = ts.createSourceFile(
  fileName,
  readFileSync(fileName).toString(),
  ts.ScriptTarget.ES2015,
  true
)

for (const stmt of sourceFile.statements) {
  if (ts.isVariableStatement(stmt)) {
    const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
    const name = stmt.declarationList.declarations[0].name.getText()
    console.log(name, isConst)
  }
}
