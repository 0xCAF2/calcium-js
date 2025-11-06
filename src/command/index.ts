import { Environment } from "../runtime/environment"

export interface Command {
  execute(env: Environment): void
}

export { Assignment } from "./assignment"
export { Break } from "./break"
export { Comment } from "./comment"
export { Continue } from "./continue"
export { Else } from "./else"
export { ElseIf } from "./elseIf"
export { End } from "./end"
export { ExprStmt } from "./exprStmt"
export { ForOf } from "./forOf"
export { Function } from "./function"
export { If } from "./if"
export { Ifs } from "./ifs"
export { Return } from "./return"
export { While } from "./while"
