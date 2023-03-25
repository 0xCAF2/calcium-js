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
  Comment = '//',
  Const = 'const',
  Continue = 'continue',
  Else = 'else',
  ElseIf = 'else if',
  End = 'end', // end of the program
  // end of blocks
  EndElseIf = 'end else if',
  EndElse = 'end else',
  EndForOf = 'end for of',
  EndFunction = 'end function',
  EndIf = 'end if',
  EndIfs = 'end ifs',
  EndWhile = 'end while',
  //
  ExprStmt = 'expr',
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
  Minus = '-_',
  Not = '!',
}

export enum Expression {
  Call = 'call',
  New = 'new',
  This = 'this',
}
