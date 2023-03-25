import { Behavior } from './behavior'
import { Environment } from './environment'

export interface Command {
  execute(env: Environment): Behavior
}
