export class CommandNotDefined extends Error {
  constructor(readonly keyword: string) {
    super(`${keyword} is not implemented as a command.`)
  }
}
