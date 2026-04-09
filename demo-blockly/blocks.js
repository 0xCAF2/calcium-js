import * as Blockly from "blockly"

const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    type: "p",
    message0: "<p> %1 ",
    args0: [
      {
        type: "input_statement",
        name: "CHILDREN",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  },
  {
    type: "txt",
    message0: " %1 ",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
  },
  {
    type: "css",
    message0: "%1 :  %2 ;",
    args0: [
      {
        type: "field_input",
        name: "PROPERTY",
        text: "color",
      },
      {
        type: "field_input",
        name: "VALUE",
        text: "blue",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
  },
  {
    type: "for_of",
    message0: "for %1 of %2 : %3 %4",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "i",
      },
      {
        type: "input_value",
        name: "ITER",
        check: ["variable", "String", "Array"],
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "STMTS",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 180,
  },
  {
    type: "if",
    message0: "if %1 : %2 %3",
    args0: [
      {
        type: "input_value",
        name: "COND",
      },
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "STMTS",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 0,
  },
  {
    type: "assign",
    message0: "%1 = %2",
    args0: [
      {
        type: "input_value",
        name: "VAR",
        check: ["variable"],
      },
      {
        type: "input_value",
        name: "VALUE",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 300,
  },
  {
    type: "variable",
    message0: "variable %1",
    args0: [
      {
        type: "field_input",
        name: "VAR",
        text: "i",
      },
    ],
    output: "variable",
    colour: 330,
  },
  {
    type: "num",
    message0: "number %1",
    args0: [
      {
        type: "field_input",
        name: "NUM",
        text: "0",
      },
    ],
    output: "Number",
    colour: 230,
  },
  {
    type: "string",
    message0: "string %1",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
        text: "Hello, World.",
      },
    ],
    output: "String",
    colour: 230,
  },
  {
    type: "array",
    message0: "[ %1 , %2 , %3 ]",
    args0: [
      {
        type: "input_value",
        name: "ELEM0",
      },
      {
        type: "input_value",
        name: "ELEM1",
      },
      {
        type: "input_value",
        name: "ELEM2",
      },
    ],
    output: "Array",
    colour: 260,
  },
  {
    type: "bin_op",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "LEFT",
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["+", "+"],
          ["-", "-"],
          ["*", "*"],
          ["%", "%"],
          ["===", "==="],
          ["!==", "!=="],
          ["<", "<"],
          ["<=", "<="],
          [">", ">"],
          [">=", ">="],
        ],
      },
      {
        type: "input_value",
        name: "RIGHT",
      },
    ],
    inputsInline: true,
    output: null,
    colour: 210,
  },
])

Blockly.common.defineBlocks(definitions)
