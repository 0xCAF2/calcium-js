import { Environment } from '../runtime/environment'

export interface Command {
  execute(env: Environment): void
}

export { default as Break } from './break'
export { default as Const } from './const'
export { default as Continue } from './continue'
export { default as Else } from './else'
export { default as ElseIf } from './elseIf'
export { default as End } from './end'
export { default as ExprStmt } from './exprStmt'
export { default as ForOf } from './forOf'
export { default as If } from './if'
export { default as Ifs } from './ifs'
export { default as Let } from './let'
