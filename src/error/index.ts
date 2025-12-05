export class CannotAccessElement extends Error {}

export class CommandNotDefined extends Error {
  constructor(public readonly keyword: string) {
    super(`${keyword} not defined.`)
  }
}

/**
 * Used as a "GOTO"-like control flow mechanism when the function is called
 */
export class FunctionCalled extends Error {}

export class InconsistentBlock extends Error {}

export class InvalidBreak extends Error {}

export class InvalidContinue extends Error {}

export class InvalidEnd extends Error {}

export class NameNotFound extends Error {
  constructor(public readonly name: string) {
    super(`${name} not found.`)
  }
}

export class NotCallable extends Error {}

export class PropertyDoesNotExist extends Error {
  constructor(public readonly name: string) {
    super(`${name} does not exist.`)
  }
}

export class UnknownExpr extends Error {}
