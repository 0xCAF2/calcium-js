import type { Command } from '.'
import { Environment } from '../runtime/environment'

export class Comment implements Command {
  constructor(public readonly text: string | undefined) { }

  execute(env: Environment): void {
    // do nothing
  }
}
