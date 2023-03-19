import { Environment } from '../runtime/environment'

export interface Command {
  execute(env: Environment): void
}

export { Assign } from './assign'
export { Break } from './break'
export { Comment } from './comment'
export { Const } from './const'
export { Continue } from './continue'
export { Else } from './else'
export { ElseIf } from './elseIf'
export { End } from './end'
export { ExprStmt } from './exprStmt'
export { ForOf } from './forOf'
export { Function } from './function'
export { If } from './if'
export { Ifs } from './ifs'
export { Let } from './let'
export { Return } from './return'
export { While } from './while'
