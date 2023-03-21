import { Statement } from './statement'

export class Environment {
  constructor(public readonly code: Statement[]) {}
}
