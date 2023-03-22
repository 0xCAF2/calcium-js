export type Statement = [number, any, string, any[]]

export enum Index {
  Indent = 0,
  Options = 1,
  Command = 2,
  Arguments = 3,
}
