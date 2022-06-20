/**
 * a primitive type in JSON.
 */
export type Primitive = number | string | boolean | null | undefined

/**
 * an array type in JSON.
 */
export type ArrayLiteral = [Any[]]

/**
 * an object type in JSON.
 */
export type ObjectLiteral = {}

/**
 * a reference expression.
 */
export type Reference = Call | Property | Subscript | Variable

/**
 * a binary operator.
 */
export type BinaryOperator = [
  (
    | '+'
    | '-'
    | '*'
    | '**'
    | '/'
    | '%'
    | '==='
    | '!=='
    | '>'
    | '>='
    | '<'
    | '<='
    | '&&'
    | '||'
    | '&'
    | '|'
    | '^'
    | '<<'
    | '>>'
  ),
  Any,
  Any
]

/**
 * a unary operator.
 */
export type UnaryOperator = ['~' | '-_' | '!', Any]

/**
 * a function call.
 */
export type Call = ['call', Reference, Any[]]

/**
 * used for the key of a subscript
 */
export type IndexOrKey = number | string | Variable | Property

/**
 * property access with . syntax.
 */
export type Property = ['prop', Reference, string]

/**
 * subscript access with ['key'] syntax.
 */
export type Subscript = ['sub', Reference, IndexOrKey]

/**
 * uses a variable (or a constant).
 */
export type Variable = ['var', string]

/**
 * any element of a JSON code
 */
export type Any =
  | Primitive
  | ArrayLiteral
  | ObjectLiteral
  | Reference
  | BinaryOperator
  | UnaryOperator
