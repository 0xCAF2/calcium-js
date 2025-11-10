import * as Element from "./element"

type Keyword =
  | "="
  | "break"
  | "class"
  | "//"
  | "const"
  | "continue"
  | "else"
  | "else if"
  | "end"
  | "expr"
  | "for of"
  | "function"
  | "if"
  | "ifs"
  | "let"
  | "return"
  | "while"

/**
 * a JSON array that represents one line
 */
export type Statement<Any = Element.Any> = [
  number,
  unknown[],
  Keyword,
  ...Any[]
]
