export type Primitive = number | string | boolean | null

export type ArrayLiteral = [Element[]]

export type ObjectLiteral = { [key: string]: Element }

export type Operation = [string, ...Element[]]

export type Element = Primitive | ArrayLiteral | ObjectLiteral | Operation
