/**
 * a primitive type in JSON
 */
export type Primitive = string | boolean | null

/**
 * an array type in JSON
 */
export type ArrayLiteral = ["array", Any[]]

export type KeyValuePair = [string, Any]
/**
 * an object type in JSON
 */
export type ObjectLiteral = ["object", KeyValuePair[]]

/**
 * a reference expression
 */
export type Reference = Property | Subscript | Variable

/**
 * a binary operator
 */
export type BinaryOperator =
  | "+"
  | "-"
  | "*"
  | "**"
  | "/"
  | "%"
  | "==="
  | "!=="
  | ">"
  | ">="
  | "<"
  | "<="
  | "&&"
  | "||"
  | "&"
  | "|"
  | "^"
  | "<<"
  | ">>"

/**
 * a unary operator
 */
export type UnaryOperator = "~" | "-_" | "!"

/**
 * a function call
 */
export type Call = ["call", Reference, Any[]]

export type Num = ["num", string]
/**
 * used for the key of a subscript
 */
export type IndexOrKey = Num | string | Variable | Property

/**
 * property access with . syntax.
 */
export type Property = ["prop", Reference, string]

/**
 * subscript access with ['key'] syntax
 */
export type Subscript = ["sub", Reference, IndexOrKey]

/**
 * reference a variable (or a constant)
 */
export type Variable = ["var", string]

/**
 * any element of a JSON code
 */
export type Any =
  | Num
  | Call
  | Primitive
  | Primitive[]
  | ArrayLiteral
  | ObjectLiteral
  | Reference
  | [BinaryOperator, Any, Any]
  | [UnaryOperator, Any]
