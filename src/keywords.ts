export enum BinaryOperator {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Exponentiation = '**',
  Division = '/',
  Remainder = '%',

  Equal = '===',
  NotEqual = '!==',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',

  And = '&&',
  Or = '||',

  BitwiseAnd = '&',
  BitwiseOr = '|',
  BitwiseXor = '^',
  LeftShift = '<<',
  RightShift = '>>',
}

export enum Command {
  Assign = '=',
  Break = 'break',
  Class = 'class',
  Comment = '//',
  Const = 'const',
  Continue = 'continue',
  Else = 'else',
  ElseIf = 'else if',
  End = 'end',
  ExprStmt = 'expr',
  ForIn = 'for in',
  ForOf = 'for of',
  Function = 'function',
  If = 'if',
  Ifs = 'ifs',
  Let = 'let',
  Return = 'return',
  While = 'while',
}

export enum Reference {
  Property = 'prop',
  Subscript = 'sub',
  Variable = 'var',
}

export enum UnaryOperator {
  BitwiseNot = '~',
  DecrementPrefix = '--_',
  DecrementPostfix = '_--',
  IncrementPrefix = '++_',
  IncrementPostfix = '_++',
  Negative = '-_',
  Not = '!',
}

export enum Expression {
  Arrow = '=>',
  Call = 'call',
  Super = 'super',
  This = 'this',
}
