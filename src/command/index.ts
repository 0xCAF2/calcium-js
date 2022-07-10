import { Environment } from '../runtime/environment'

export interface Command {
  execute(env: Environment): void
}

export { Const } from './const'
export { End } from './end'
export { ExprStmt } from './exprStmt'
export { Let } from './let'
