import { Primitive } from './element'
import { Environment } from './environment'
import { Any } from './type'

export interface Assignable {
  assign(value: Any, env: Environment): void
}

export interface Reference {
  evaluate(env: Environment): Any
}

export type Expression =
  | Primitive
  | Assignable
  | Reference
  | Expression[]
  | object
