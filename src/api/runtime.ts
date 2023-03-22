import { Environment } from './environment'
import { Parser } from './parser'
import { Statement } from './statement'
import { Status } from './status'

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

  run(): Status {
    while (true) {
      const result = this.step()
      if (result === Status.Running) {
        continue
      } else {
        return result
      }
    }
  }

  step(): Status {
    const lastIndex = this.env.code.length - 1
    if (this.env.address.index > lastIndex || this.env.address.indent === 0) {
      return Status.Terminated
    }

    const cmd = this.parser.readStmt(this.currentLine)
    cmd.execute(this.env)
    return Status.Running
  }

  get currentLine(): Statement {
    return this.env.code[this.env.address.index]
  }
}
