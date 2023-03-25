import * as calcium from '../../api/index'

export type Reference = [string, ...any[]]

export type Expression = calcium.Element | Reference
