import * as ts from 'typescript'
import * as calcium from '.'

/**
 * parses a node and generate an expression element for Calcium.
 *
 * @param n a node of TypeScript
 */
function parseExpr(n: ts.Node): calcium.Element.Any {
  if (ts.isIdentifier(n)) {
    // a simple variable reference
    return [calcium.Keyword.Reference.Variable, n.text]
  } else if (ts.isPropertyAccessExpression(n)) {
    // property access chains

    // the last element of property names
    const propertyName = n.name.text

    // the object including other properties
    const obj = parseExpr(n.expression)

    if (Array.isArray(obj)) {
      // obj should be a Calcium expression represented by an array.

      const kw = obj[0] // the keyword in Calcium language

      if (kw === calcium.Keyword.Reference.Variable) {
        // eg. obj.prop, which has only one property access
        return [calcium.Keyword.Reference.Property, obj[1], propertyName]
      } else if (kw === calcium.Keyword.Reference.Property) {
        // eg. obj.propA.propB
        return [...obj, propertyName]
      }
    } else {
      throw new Error('error in property access')
    }
  } else if (ts.isNumericLiteral(n)) {
    if (n.text.includes('.')) {
      // eg. 3.14
      return parseFloat(n.text)
    } else {
      // eg. 42
      return parseInt(n.text)
    }
  } else if (ts.isStringLiteral(n)) {
    // eg. 'Hello, World.'
    return n.text
  } else if (n.kind === ts.SyntaxKind.FalseKeyword) {
    // the false value
    return false
  } else if (n.kind === ts.SyntaxKind.TrueKeyword) {
    // the true value
    return true
  } else if (ts.isBinaryExpression(n)) {
    // eg. 1 + 2
    return [n.operatorToken.getText(), parseExpr(n.left), parseExpr(n.right)]
  } else if (ts.isPrefixUnaryExpression(n)) {
    switch (n.operator) {
      case ts.SyntaxKind.ExclamationToken:
        // eg. !bool
        return [calcium.Keyword.UnaryOperator.Not, parseExpr(n.operand)]
      case ts.SyntaxKind.MinusToken:
        // eg. -num
        return [calcium.Keyword.UnaryOperator.Minus, parseExpr(n.operand)]
      default:
        throw new Error('unary operator not implemented')
    }
  } else if (ts.isArrayLiteralExpression(n)) {
    // An array literal in Calcium is nested. eg. [[1, 2, 3]]
    return [n.elements.map((e) => parseExpr(e))]
  } else if (ts.isExpressionStatement(n)) {
    // an expression statement of calling a function
    const expr = n.expression
    if (ts.isCallExpression(expr)) {
      const ref = parseExpr(expr.expression)
      const args = expr.arguments.map((n) => parseExpr(n))
      return [calcium.Keyword.Expression.Call, ref, args]
    } else {
      throw new Error('expression not supported')
    }
  } else if (ts.isParenthesizedExpression(n)) {
    // Calcium does not have parens.
    // The order of calculation is represented by exprs like ast.
    return parseExpr(n.expression)
  } else if (ts.isCallExpression(n)) {
    // an expression which has the invocation of a function
    const ref = parseExpr(n.expression)
    const args = n.arguments.map((a) => parseExpr(a))
    return [calcium.Keyword.Expression.Call, ref, args]
  } else if (ts.isNewExpression(n)) {
    // eg. new Array()
    const klass = parseExpr(n.expression)
    if (n.arguments !== undefined) {
      const args = n.arguments.map((a) => parseExpr(a))
      return [calcium.Keyword.Expression.New, klass, args]
    } else {
      return [calcium.Keyword.Expression.New, klass]
    }
  } else if (ts.isElementAccessExpression(n)) {
    // eg. obj[prop], which is referred as a subscript in Calcium
    const obj = parseExpr(n.expression)
    const index = parseExpr(n.argumentExpression)
    return [calcium.Keyword.Reference.Subscript, obj, index]
  } else if (ts.isObjectLiteralExpression(n)) {
    // currently supported an empty object literal only
    return {}
  }
  console.error(n)
  throw new Error('not implemented')
}

// function parseStmt(stmt: ts.Node): calcium.Statement {}
