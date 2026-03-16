/**
 * Represents the point of execution.
 */
export class Address {
  /**
   *
   * @param indent corresponds to the indent of a block
   * @param line line number (index in the code array)
   * @param module the name of the module
   * @param calls the counter of function calls
   */
  constructor(
    public indent: number,
    public line: number,
    public module: string,
    public calls: number = 0,
  ) {}

  /**
   * Make a copy
   */
  clone() {
    return new Address(this.indent, this.line, this.module, this.calls)
  }

  /**
   *
   * @param address another address
   * @returns whether two addresses are at same position
   */
  isLocatedAt(address: Address): boolean {
    return (
      this.indent === address.indent &&
      this.line === address.line &&
      this.module === address.module &&
      this.calls === address.calls
    )
  }

  /**
   * jump and go to the specified address
   * @param to
   */
  jump(to: Address) {
    this.indent = to.indent
    this.line = to.line
    this.module = to.module
  }

  /**
   * add the delta to the indent
   * @param deltaX the delta of the indent. Allows a negative value.
   */
  shift(deltaX: number) {
    this.indent += deltaX
  }

  /**
   * add the delta to the line number
   * @param deltaY the delta of the line number. Allows a negative value.
   */
  skip(deltaY: number) {
    this.line += deltaY
  }
}
