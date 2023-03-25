export enum Reference {
  Keyword = 0,
}

export enum BinaryOperator {
  Left = 1,
  Right = 2,
}

export enum Call {
  FuncRef = 1,
  Args = 2,
}

export enum New {
  Class = 1,
  Args = 2,
}

export enum Property {
  ReferredObj = 1,
  PropertyName = 2,
}

export enum Subscript {
  ReferredObj = 1,
  IndexExpr = 2,
}

export enum UnaryOperator {
  Operand = 1,
}

export enum Variable {
  Name = 1,
}
