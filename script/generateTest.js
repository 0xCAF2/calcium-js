"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const converter_1 = require("../src/converter");
fs_1.readdirSync('./tests').forEach((fileName) => {
    const file = fs_1.readFileSync(`./tests/${fileName}`);
    const calciumCode = converter_1.convert(file.toString());
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
`;
    const testName = fileName.replace('.js', '.spec.ts');
    fs_1.writeFileSync(`../test/${testName}`, testCode);
});
