export class Address {
  constructor(
    public indent: number,
    public index: number,
    public calls = 0,
    public fileName = 'main'
  ) {}

  clone(): Address {
    return new Address(this.indent, this.index, this.calls, this.fileName)
  }

  isLocatedAt(addr: Address): boolean {
    return (
      addr.indent === this.indent &&
      addr.index === this.index &&
      addr.calls === this.calls &&
      addr.fileName === this.fileName
    )
  }

  jump(to: Address) {
    this.indent = to.indent
    this.index = to.index
    this.fileName = to.fileName
  }

  shift(deltaIndent: number) {
    this.indent += deltaIndent
  }

  step(deltaIndex: number) {
    this.index += deltaIndex
  }
}
