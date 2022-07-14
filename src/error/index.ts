export class CannotAssignToConst extends Error {
  constructor(public readonly name: string) {
    super(`${name} is declared as const.`)
  }
}

export class CommandNotDefined extends Error {
  constructor(public readonly keyword: string) {
    super(`${keyword} not defined.`)
  }
}

/**
 * Used for "GOTO" like control flow when the function is called
 */
export class FunctionCalled extends Error {}

export class InconsistentBlock extends Error {}

export class InvalidBreak extends Error {}

export class InvalidContinue extends Error {}

export class NameNotFound extends Error {
  constructor(public readonly name: string) {
    super(`${name} not found.`)
  }
}

export class NotCallable extends Error {}

export class PropertyNotExist extends Error {
  constructor(public readonly name: string) {
    super(`${name} not exist.`)
  }
}
