export enum BinaryOperator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Exponentiation = "**",
  Division = "/",
  Remainder = "%",

  Equal = "===",
  NotEqual = "!==",
  GreaterThan = ">",
  GreaterThanOrEqual = ">=",
  LessThan = "<",
  LessThanOrEqual = "<=",

  And = "&&",
  Or = "||",

  BitwiseAnd = "&",
  BitwiseOr = "|",
  BitwiseXor = "^",
  LeftShift = "<<",
  RightShift = ">>",
}

export enum Command {
  Assignment = "=",
  Break = "break",
  Comment = "//",
  Continue = "continue",
  Else = "else",
  ElseIf = "else if",
  End = "end",
  ExprStmt = "expr",
  ForOf = "for of",
  Function = "function",
  If = "if",
  Ifs = "ifs",
  Return = "return",
  While = "while",
}

export enum Reference {
  Property = "prop",
  Subscript = "sub",
  Variable = "var",
}

export enum UnaryOperator {
  BitwiseNot = "~",
  Minus = "-_",
  Not = "!",
}

export enum Expression {
  ArrayLiteral = "array",
  Call = "call",
  New = "new",
  Num = "num",
  ObjectLiteral = "object",
  This = "this",
}
