import { Behavior } from './behavior'
import { Environment } from './environment'
import { Events } from './events'
import { Parser } from './parser'
import { Index, Statement } from './statement'
import { Status } from './status'

export class Runtime {
  breakpoints = new Set<number>()
  env: Environment
  events?: Events
  parser: Parser

  constructor(params: RuntimeParams) {
    this.events = params.events
    this.parser = params.parser
    let stmts: Statement[]
    if (typeof params.code === 'string') {
      stmts = JSON.parse(params.code)
    } else {
      stmts = params.code
    }
    this.env = new Environment({ code: stmts })
  }

  backward() {
    while (this.currentIndex > 0) {
      this.env.address.step(-1)
      if (this.currentIndent === this.currentLine[Index.Indent]) {
        return
      }
    }
  }

  forward() {
    while (this.currentIndex < this.env.code.length) {
      this.env.address.step(1)
      if (this.currentIndex >= this.env.code.length) {
        return
      }
      if (this.currentIndent === this.currentLine[Index.Indent]) {
        return
      }
    }
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
    if (this.currentIndex > this.lastIndex || this.currentIndent === 0) {
      return Status.Terminated
    }

    const cmd = this.parser.readStmt(this.currentLine)
    this.events?.beforeCommandExecuted(cmd, this)
    const result = cmd.execute(this.env)
    this.events?.afterCommandExecuted(cmd, this)

    if (result === Behavior.Loop) {
      this.backward()
    } else {
      this.forward()
    }

    if (this.currentIndex > this.lastIndex || this.currentIndent === 0) {
      return Status.Terminated
    }
    if (this.breakpoints.has(this.currentIndex)) {
      return Status.AtBreakpoint
    }
    return Status.Running
  }

  get currentIndent(): number {
    return this.env.address.indent
  }

  get currentIndex(): number {
    return this.env.address.index
  }

  get currentLine(): Statement {
    return this.env.code[this.env.address.index]
  }

  get lastIndex(): number {
    return this.env.code.length - 1
  }
}

export interface RuntimeParams {
  code: string | Statement[]
  parser: Parser
  events?: Events
}
