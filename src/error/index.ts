export class NameNotFound extends Error {
  constructor(public readonly name: string) {
    super(`${name} not found.`)
    this.name = name
  }
}
