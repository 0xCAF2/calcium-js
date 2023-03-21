import { Environment } from './environment'

export interface Command {
  execute(env: Environment): void
}
