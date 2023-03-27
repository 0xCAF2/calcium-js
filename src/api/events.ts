import { Runtime } from './runtime'
import { Statement } from './statement'

export interface Events {
  skip(next: Statement, runtime: Runtime): boolean
}
