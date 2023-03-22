import { Primitive } from './element'
import { Environment } from './environment'
import { Any } from './type'

export interface Reference {
  assign(value: Any, env: Environment): void
  evaluate(env: Environment): Any
}

export type Expression = Primitive | Reference | Expression[] | object
