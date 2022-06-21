import Parser from './parser'
import Statement from './statement'
import Status from './status'

export class Runtime {
  /**
   * used for the step execution of each line.
   */
  breakpoints = new Set<number>()

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
  }

  /**
   * pauses this runtime.
   */
  pause() {
    this.isPaused = true
  }

  /**
   * resume this runtime.
   */
  resume() {
    this.isPaused = false
  }

  /**
   * executes the code until terminated.
   */
  run(): Status {
    return Status.Terminated
  }
}

export { Status }
