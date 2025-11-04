import type { Expression } from '../expression'
import { Environment } from '../runtime/environment'
import { Conditional } from './conditional'

/**
 * if statement
 */
export class If extends Conditional {
  /**
   *
   * @param condition an expression to determine whether
   * the statement shoule be executed
   */
  constructor(public readonly condition: Expression) {
    super()
  }
  isSatisfied(env: Environment): boolean {
    const result = env.evaluate(this.condition)
    return result ? true : false
  }
}
