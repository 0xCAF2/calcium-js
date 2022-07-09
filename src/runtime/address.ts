/**
 * Represents the point of execution.
 */
export default class Address {
  /**
   *
   * @param indent corresponds to the indent of a block
   * @param line line number (index in the code array)
   * @param call the counter of function calls
   */
  constructor(
    public indent: number,
    public line: number,
    public call: number = 0
  ) {}

  /**
   * Make a copy
   */
  clone() {
    return new Address(this.indent, this.line, this.call)
  }

  /**
   *
   * @param address another address
   * @returns whether two addresses are at same position
   */
  isAt(address: Address): boolean {
    return (
      this.indent === address.indent &&
      this.line === address.line &&
      this.call === address.call
    )
  }

  /**
   * jump and go to the specified address
   * @param to
   */
  jump(to: Address) {
    this.indent = to.indent
    this.line = to.line
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
