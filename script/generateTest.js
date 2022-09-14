"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const converter_1 = require("../src/converter");
fs_1.readdirSync('./tests').forEach((fileName) => {
    const jsCode = fs_1.readFileSync(`./tests/${fileName}`).toString();
    const calciumCode = converter_1.convert(jsCode);
    const testCode = `
import * as calcium from '../src'
import 'jest-environment-jsdom'

describe('${fileName}', () => {
  it('${fileName}', () => {
    const consoleLog = console.log
    let result1 = ''
    const capture1 = (...chunk: any[]) => {
      result1 += chunk.join(' ').toString() + '\\n'
    }
    console.log = capture1
    const runtime = new calcium.Runtime(
      ${calciumCode}
    )
    expect(runtime.run()).toBe(calcium.Status.Terminated)

    let result2 = ''
    const capture2 = (...chunk: any[]) => {
      result2 += chunk.join(' ').toString() + '\\n'
    }
    console.log = capture2
    {
    ${jsCode}
    }

    console.log = consoleLog
    expect(result1).toBe(result2)
  })
})
`;
    const testName = fileName.replace('.js', '.spec.ts');
    fs_1.writeFileSync(`../test/${testName}`, testCode);
});
