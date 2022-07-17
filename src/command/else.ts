import { Environment } from '../runtime/environment'
import Conditional from './conditional'

export default class Else extends Conditional {
  isSatisfied(env: Environment): boolean {
    // When an else command becomes the current line,
    // the runtime should always enter this else block.
    return true
  }
}
