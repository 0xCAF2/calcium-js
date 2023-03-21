import { Environment } from './environment'
import { Parser } from './parser'
import { Statement } from './statement'

export class Runtime {
  env: Environment

  constructor(code: string | Statement[], readonly parser: Parser) {
    let stmts: Statement[]
    if (typeof code === 'string') {
      stmts = JSON.parse(code)
    } else {
      stmts = code
    }
    this.env = new Environment(stmts)
  }
}
