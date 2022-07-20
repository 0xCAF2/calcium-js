import * as Calcium from '../src'
import 'jest-environment-jsdom'

describe('nestedFunction.spec.ts', () => {
  it('create and execute nested functions', () => {
    const runtime = new Calcium.Runtime([
      [1, [], 'function', 'f', ['a', 'b']],
      [2, [], 'const', 'c', ['*', ['var', 'a'], ['var', 'b']]],
      [2, [], 'function', 'g', ['m', 'n']],
      [3, [], 'return', ['%', ['var', 'm'], ['var', 'n']]],
      [
        2,
        [],
        'return',
        [
          '+',
          [
            'call',
            ['var', 'g'],
            [
              ['var', 'a'],
              ['var', 'b'],
            ],
          ],
          ['var', 'c'],
        ],
      ],
      [1, [], 'let', 'x', 7],
      [1, [], 'let', 'y', 3],
      [
        1,
        [],
        'let',
        'z',
        [
          'call',
          ['var', 'f'],
          [
            ['var', 'x'],
            ['var', 'y'],
          ],
        ],
      ],
      [1, [], 'expr', ['call', ['prop', 'console', 'log'], [['var', 'z']]]],
      [1, [], 'end'],
    ])
    expect(runtime.run()).toBe(Calcium.Status.Terminated)
  })
})
