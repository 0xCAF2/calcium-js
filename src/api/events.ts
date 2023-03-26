import { Command } from './command'
import { Runtime } from './runtime'
import { Statement } from './statement'

export interface Events {
  afterCommandExecuted?(command: Command, runtime: Runtime): void
  beforeCommandExecuted?(command: Command, runtime: Runtime): void
  skip?(next: Statement, runtime: Runtime): boolean
}
