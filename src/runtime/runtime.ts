import * as Cmd from '../command'
import * as Err from '../error'
import { CallingCmd } from './callingCmd'
import { Environment } from './environment'
import * as Idx from '../indexes'
import * as Kw from '../keywords'
import Parser from './parser'
import Statement from './statement'
import Status from './status'

export default class Runtime {
  /**
   * used for the step execution of each line.
   */
  breakpoints = new Set<number>()

  env: Environment

  /**
   * a flag for a Worker.
   */
  isPaused = false

  /**
   * consumes a statement and returns a command.
   */
  parser: Parser

  /**
   *
   * @param code a JSON string or an array
   */
  constructor(code: string | Statement[]) {
    this.parser = new Parser()
    let codeObj: Statement[]
    if (typeof code === 'string') {
      codeObj = JSON.parse(code)
    } else {
      codeObj = code
    }
    this.env = new Environment(codeObj)
  }

  /**
   * pauses this runtime.
   */
  pause() {
    this.isPaused = true
  }

  /**
   * resumes this runtime.
   */
  resume() {
    this.isPaused = false
  }

  /**
   * executes the code until terminated or breakpoints.
   */
  run(): Status {
    while (true) {
      const status = this.step()
      if (status === Status.Running) {
        continue
      } else {
        return status
      }
    }
  }

  step(): Status {
    const lastIndex = this.env.code.length - 1
    if (this.env.address.indent === 0) {
      return Status.Terminated
    }

    if (this.env.address.line > lastIndex) {
      return Status.Terminated
    }

    let line = this.currentLine
    let cmd = this.parser.readStmt(line)

    const callerAddr = this.env.address.clone()
    if (
      this.env.calls.length > 0 &&
      callerAddr.isAt(this.env.calls[this.env.calls.length - 1].addr)
    ) {
      cmd = this.env.calls.pop()!.cmd
    }

    try {
      cmd.execute(this.env)
    } catch (e) {
      if (e instanceof Err.FunctionCalled) {
        this.env.calls.push(new CallingCmd(callerAddr, cmd))
      } else {
        throw e
      }
    }

    if (cmd instanceof Cmd.End) {
      return Status.Terminated
    }

    this.env.skipToNextLine()
    let nextLine = this.currentLine
    let kw = nextLine[Idx.Statement.Keyword]
    while (kw === Kw.Command.Ifs || kw === Kw.Command.Comment) {
      cmd = this.parser.readStmt(nextLine)
      cmd.execute(this.env)
      this.env.skipToNextLine()
      nextLine = this.currentLine
      kw = nextLine[Idx.Statement.Keyword]
    }

    if (this.breakpoints.has(this.env.address.line)) {
      return Status.AtBreakpoint
    } else {
      return Status.Running
    }
  }

  get currentLine(): Statement {
    return this.env.code[this.env.address.line]
  }
}
