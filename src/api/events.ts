import { Command } from './command'
import { Runtime } from './runtime'

export interface Events {
  beforeCommandExecuted(command: Command, runtime: Runtime): void
  afterCommandExecuted(command: Command, runtime: Runtime): void
}
