import * as ts from 'typescript'
import * as calcium from '.'

/**
 * parses a node and generate an expression element for Calcium.
 *
 * @param n a node of TypeScript
 */
export function parseExpr(n: ts.Node): calcium.Element.Any {
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

/**
 *
 * @param sourceCode a string value of the source code
 * written by JavaScript's subset
 */
export function convert(sourceCode: string): calcium.Statement[] {
  // The result is an array of Calcium language's code
  const code: calcium.Statement[] = []
  // Each statement has its indent value that represents
  // the indentation of blocks
  let indent = 1

  function _visit(stmt: ts.Node) {
    if (ts.isVariableStatement(stmt)) {
      // a variable or constant declaration with an initial value

      // an identifier of the variable or constant
      const name = stmt.declarationList.declarations[0].name.getText()

      // confirm that this statement has a const keyword
      const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0

      // the right hand side value
      let rhs: calcium.Element.Any = null

      // get the rhs value
      ts.visitNode(stmt.declarationList.declarations[0].initializer, (n) => {
        rhs = parseExpr(n)
        return n // needs to return Node type?
      })

      // the keyword of this statement
      let keyword: calcium.Keyword.Command = isConst
        ? calcium.Keyword.Command.Const
        : calcium.Keyword.Command.Let

      // push the result of this visit
      code.push([indent, [], keyword, name, rhs])
    } else if (ts.isExpressionStatement(stmt)) {
      // an assignment
      if (
        stmt
          .getChildren()
          .some(
            (n) =>
              n.kind === ts.SyntaxKind.BinaryExpression &&
              n.getChildAt(1).kind === ts.SyntaxKind.FirstAssignment
          )
      ) {
        // Although assigned later, initial value is required
        let lhs: calcium.Element.Reference = [
          calcium.Keyword.Reference.Variable,
          'x',
        ]
        let rhs: calcium.Element.Any = null
        ts.visitNode(
          stmt
            .getChildren()
            .filter((n) => n.kind === ts.SyntaxKind.BinaryExpression)[0],
          (n) => {
            const assignment = n as ts.BinaryExpression
            lhs = parseExpr(assignment.left) as calcium.Element.Reference
            rhs = parseExpr(assignment.right)
            return n // need a return value
          }
        )
        code.push([indent, [], calcium.Keyword.Command.Assign, lhs, rhs])
      } else {
        // an expression statement
        code.push([
          indent,
          [],
          calcium.Keyword.Command.ExprStmt,
          parseExpr(stmt),
        ])
      }
    } else if (ts.isIfStatement(stmt)) {
      // an if statement

      // the condition expression of the if statement
      const condition = parseExpr(stmt.expression)

      // Calcium has nested extra blocks for an if statement
      code.push([indent, [], calcium.Keyword.Command.Ifs])

      // increment the indent
      ++indent

      // The condition value decides whether the block should be executed
      code.push([indent, [], calcium.Keyword.Command.If, condition])

      // increment the indent again
      ++indent

      // visit inside the if block
      _visit(stmt.thenStatement)

      // decrement the indent when the if block ends
      --indent

      // check this if statement is followed by else if or else
      if (stmt.elseStatement !== undefined) {
        function _visitElseIf(n: ts.Node) {
          if (ts.isIfStatement(n)) {
            // output an else if command
            code.push([
              indent,
              [],
              calcium.Keyword.Command.ElseIf,
              parseExpr(n.expression),
            ])

            // increment the indent for the else if block
            ++indent

            // visit inside the else if block
            _visit(n.thenStatement)

            // decrement the indent when the else if block ends
            --indent

            // continuous else if blocks will be regarded as else if commands
            if (n.elseStatement !== undefined) {
              _visitElseIf(n.elseStatement)
            }
          } else {
            // output an else command
            code.push([indent, [], calcium.Keyword.Command.Else])
            ++indent
            _visit(n)
            --indent
          }
        }
        _visitElseIf(stmt.elseStatement)
      }
      // decrement the indent for the ifs command
      --indent
    } else if (ts.isForOfStatement(stmt)) {
      // eg. for (const s of stmts) { ... }

      // A single variable name is supported only.
      const variableName = (
        stmt.initializer as ts.VariableDeclarationList
      ).declarations[0].name.getText()

      const iterable = parseExpr(stmt.expression)

      // push the for of command
      code.push([
        indent,
        [],
        calcium.Keyword.Command.ForOf,
        variableName,
        iterable,
      ])

      // visit inside the block
      ++indent
      _visit(stmt.statement)
      --indent
    } else if (ts.isContinueStatement(stmt)) {
      code.push([indent, [], calcium.Keyword.Command.Continue])
    } else if (ts.isBreakStatement(stmt)) {
      code.push([indent, [], calcium.Keyword.Command.Break])
    } else if (ts.isFunctionDeclaration(stmt)) {
      // a function name
      const name = stmt.name!.text
      // the parameters
      const params = stmt.parameters.map((p) => p.name.getText())

      code.push([indent, [], calcium.Keyword.Command.Function, name, params])

      // visit inside the function
      ++indent
      if (stmt.body !== undefined) {
        _visit(stmt.body)
      }
      --indent
    } else if (ts.isReturnStatement(stmt)) {
      if (stmt.expression === undefined) {
        // No return value exists.
        code.push([indent, [], calcium.Keyword.Command.Return])
      } else {
        // There is the return value.
        code.push([
          indent,
          [],
          calcium.Keyword.Command.Return,
          parseExpr(stmt.expression),
        ])
      }
    } else if (ts.isBlock(stmt)) {
      for (const s of stmt.statements) {
        _visit(s)
      }
    }
  }

  // parse the source code and start to visit nodes
  for (const stmt of ts.createSourceFile(
    'converted.cajs',
    sourceCode,
    ts.ScriptTarget.ES2015,
    true
  ).statements) {
    _visit(stmt)
  }

  // conclude with an end command
  code.push([indent, [], calcium.Keyword.Command.End])

  return code
}
