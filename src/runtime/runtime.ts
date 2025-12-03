import * as Cmd from "../command"
import * as Err from "../error"
import { CallingCmd } from "./callingCmd"
import { Environment } from "./environment"
import * as Idx from "../core/indexes"
import * as Kw from "../core/keywords"
import { StatementParser } from "./parser"
import type { Statement } from "./statement"
import { Status } from "./status"
import { commandTable } from "../core/table"
import { ExpressionParser } from "./parser"

export type RuntimeOptions = {
  /**
   * a flag to allow accessing the window object in browser environment.
   * This is useful for code that needs to control the interaction with the DOM.
   */
  canAccessWindow: boolean

  /**
   * a flag to enable global variables in Node environment.
   * Set to true when you want to test code that relies on global variables
   * such as "console.log()".
   */
  enableGlobal: boolean
}

export class Runtime {
  env: Environment

  /**
   * a flag for a Worker.
   */
  isPaused = false

  /**
   *
   * @param code a JSON string or an array
   */
  constructor(
    code: string | Statement[],
    options: RuntimeOptions = { canAccessWindow: false, enableGlobal: false },
    parser = new StatementParser(commandTable, new ExpressionParser())
  ) {
    let codeObj: Statement[]
    if (typeof code === "string") {
      codeObj = JSON.parse(code)
    } else {
      codeObj = code
    }
    this.env = new Environment(codeObj, parser, options)
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
      if (status === Status.Executed) {
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
    let cmd = this.env.parser.readStmt(line)

    const callerAddr = this.env.address.clone()
    if (
      this.env.calls.length > 0 &&
      callerAddr.isLocatedAt(this.env.calls.at(-1)!.addr)
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
      cmd = this.env.parser.readStmt(nextLine)
      cmd.execute(this.env)
      this.env.skipToNextLine()
      nextLine = this.currentLine
      kw = nextLine[Idx.Statement.Keyword]
    }

    return Status.Executed
  }

  get currentLine(): Statement {
    return this.env.code[this.env.address.line]
  }
}
