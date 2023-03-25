import { Element } from './element'

export type Statement = [number, any, string, ...Element[]]

export enum Index {
  Indent = 0,
  Option = 1,
  Command = 2,
  Arguments = 3,
}
