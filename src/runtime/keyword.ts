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
  End = 'end',
  ExprStmt = 'expr',
  For = 'for',
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
  Call = 'call',
  Property = 'prop',
  Subscript = 'sub',
  Variable = 'var',
}

export enum UnaryOperator {
  BitwiseNot = '~',
  Negative = '-_',
  Not = '!',
}
