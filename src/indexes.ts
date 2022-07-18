/**
 * import * as Index from 'path_to_indexes.ts'
 */

export enum Statement {
  Indent = 0,
  Options = 1,
  Keyword = 2,
}

// commands

export enum Assign {
  Lhs = 3,
  Rhs = 4,
}

export enum Comment {
  Text = 3,
}

export enum Conditional {
  Expr = 3,
}

export enum ExprStmt {
  Expr = 3,
}

export enum For {
  VariableName = 3,
  InitialValue = 4,
  Condition = 5,
  Stepper = 6,
}

export enum ForIn {
  VariableName = 3,
  Iterable = 4,
}

export enum ForOf {
  VariableName = 3,
  Iterable = 4,
}

export enum Function {
  Name = 3,
  Parameters = 4,
}

export enum Return {
  Expr = 3,
}

// expressions

export enum Expression {
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
  VariableName = 1,
  FirstPropertyName = 2,
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
