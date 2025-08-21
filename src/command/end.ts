import type { Command } from './'
import { Environment } from '../runtime/environment'

/**
 * terminate a program
 */
export class End implements Command {
  /**
   * do nothing
   * @param env
   */
  execute(env: Environment) { }
}
