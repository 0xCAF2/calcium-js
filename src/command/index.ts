import { Environment } from '../runtime/environment'

export interface Command {
  execute(d: Environment): void
}
