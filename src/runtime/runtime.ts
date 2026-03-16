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
import { Namespace } from "./namespace"

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
   * @param options options for this runtime
   * @param parser a statement parser for this runtime. You can provide a custom parser if you want to extend the language.
   * If not provided, the default parser with the default command table will be used.
   */
  constructor(
    code: string | Statement[],
    options: RuntimeOptions = { canAccessWindow: false, enableGlobal: false },
    parser = new StatementParser(commandTable, new ExpressionParser()),
  ) {
    let codeObj: Statement[]
    if (typeof code === "string") {
      codeObj = JSON.parse(code)
    } else {
      codeObj = code
    }
    this.env = new Environment(parser, options, codeObj)
  }

  /**
   * loads a module into this runtime.
   */
  loadModule(moduleName: string, code: string | Statement[]) {
    // parse the code and save it in the environment
    let codeObj: Statement[]
    if (typeof code === "string") {
      codeObj = JSON.parse(code)
    } else {
      codeObj = code
    }
    this.env.code.set(moduleName, codeObj)

    // create a new context for the module
    const moduleContext = new Namespace()
    const previousContext = this.env.context
    this.env.context = moduleContext

    // store the current address to restore later
    const previousAddress = this.env.address.clone()

    // change the address to the module's entry point
    this.env.address.module = moduleName
    this.env.address.line = 0
    this.env.address.indent = 1

    // execute the module's code and load to the context
    this.run()

    // restore the previous context
    this.env.context = previousContext
    this.env.address = previousAddress

    // register the module in the global context
    this.env.context.register(moduleName, moduleContext.createModule())
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
    const lastIndex = this.env.code.get(this.env.address.module)!.length - 1
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
    while (kw === Kw.Command.IfContainer || kw === Kw.Command.Comment) {
      cmd = this.env.parser.readStmt(nextLine)
      cmd.execute(this.env)
      this.env.skipToNextLine()
      nextLine = this.currentLine
      kw = nextLine[Idx.Statement.Keyword]
    }

    return Status.Executed
  }

  get currentLine(): Statement {
    return this.env.code.get(this.env.address.module)![this.env.address.line]
  }
}
