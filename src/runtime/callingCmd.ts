import { Command } from '../command'
import { Address } from './address'

export class CallingCmd {
  addr: Address
  cmd: Command
  constructor(addr: Address, cmd: Command) {
    this.addr = addr.clone()
    this.cmd = cmd
  }
}
