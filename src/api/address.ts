export class Address {
  constructor(
    public x: number,
    public y: number,
    public calls = 0,
    public fileId = 0
  ) {}

  clone(): Address {
    return new Address(this.x, this.y, this.calls, this.fileId)
  }

  isLocatedAt(addr: Address): boolean {
    return (
      addr.x === this.x &&
      addr.y === this.y &&
      addr.calls === this.calls &&
      addr.fileId === this.fileId
    )
  }

  jump(to: Address) {
    this.x = to.x
    this.y = to.y
    this.fileId = to.fileId
  }

  shiftX(delta: number) {
    this.x += delta
  }

  stepY(delta: number) {
    this.y += delta
  }
}
