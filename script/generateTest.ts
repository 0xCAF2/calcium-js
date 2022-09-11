import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { convert } from '../src/converter'

readdirSync('./tests').forEach((fileName) => {
  const file = readFileSync(`./tests/${fileName}`)
  const calciumCode = convert(file.toString())
  const testCode = `
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('${fileName}', () => {
  it('${fileName}', () => {
    const runtime = new calcium.Runtime(
      ${calciumCode}
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)
  })
})
`
  const testName = fileName.replace('.js', '.spec.ts')
  writeFileSync(`../test/${testName}`, testCode)
})
