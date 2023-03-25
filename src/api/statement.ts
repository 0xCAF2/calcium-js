export type Statement = [number, string, any[], ...any[]]

export enum Index {
  Indent = 0,
  Command = 1,
  Arguments = 2,
  Option = 3,
}
