import * as Blockly from "blockly"
import "./demo-blockly/blocks"
import { calciumGenerator } from "./demo-blockly/generator"
import "./demo-blockly/generator/p"
import "./demo-blockly/generator/text"
import "./demo-blockly/generator/css"

import { blocklyCode } from "./main"

const workspace = Blockly.inject("blockly-div", {
  toolbox: `
    <xml>
      <block type="p"></block>
      <block type="txt"></block>
      <block type="css"></block>
      <block type="for_of"></block>
      <block type="if"></block>
      <block type="assign"></block>
      <block type="variable"></block>
      <block type="num"></block>
      <block type="string"></block>
      <block type="array"></block>
      <block type="bin_op"></block>
    </xml>
  `,
  renderer: "zelos",
  zoom: {
    startScale: 0.8,
  },
  sounds: false,
  move: {
    scrollbars: true,
    drag: true,
    wheel: false,
  },
})

workspace.addChangeListener(() => {
  const code = calciumGenerator.workspaceToCode(workspace)
  blocklyCode.value = code
  console.log(code)
  console.log(Blockly.serialization.workspaces.save(workspace))
})

Blockly.serialization.workspaces.load(
  {
    blocks: {
      languageVersion: 0,
      blocks: [
        {
          type: "assign",
          id: "*d*e=5])m!;`n?*M;zVv",
          x: 33,
          y: 24,
          inputs: {
            VAR: {
              block: {
                type: "variable",
                id: "2adgmaKHxH|7fgf{qQIV",
                fields: {
                  VAR: "contents",
                },
              },
            },
            VALUE: {
              block: {
                type: "array",
                id: "2APrgSx8pGsK=^B(M*DJ",
                inputs: {
                  ELEM0: {
                    block: {
                      type: "string",
                      id: "9!FO:lRsKimYSfQTNmY#",
                      fields: {
                        TEXT: "Hello, World.",
                      },
                    },
                  },
                  ELEM1: {
                    block: {
                      type: "string",
                      id: "o}oVRBfJi]dq7@!B_DJ0",
                      fields: {
                        TEXT: "This is a demo.",
                      },
                    },
                  },
                  ELEM2: {
                    block: {
                      type: "string",
                      id: "hb3A#kY[5~wx}_(u6dGB",
                      fields: {
                        TEXT: "Coming soon...",
                      },
                    },
                  },
                },
              },
            },
          },
          next: {
            block: {
              type: "assign",
              id: "F*3z!ueE6TLxS!zA]J:N",
              inputs: {
                VAR: {
                  block: {
                    type: "variable",
                    id: "y@tJ3u]Ky(cFQMZ,M{_g",
                    fields: {
                      VAR: "i",
                    },
                  },
                },
                VALUE: {
                  block: {
                    type: "num",
                    id: "^U#RLi2RloeHfp.LK?9a",
                    fields: {
                      NUM: "0",
                    },
                  },
                },
              },
            },
          },
        },
        {
          type: "for_of",
          id: "$;F,v8(z6Gfmaq4f,TiR",
          x: 33,
          y: 184,
          fields: {
            VAR: "c",
          },
          inputs: {
            ITER: {
              block: {
                type: "variable",
                id: "pq-~:q@/C;muci(a+vju",
                fields: {
                  VAR: "contents",
                },
              },
            },
            STMTS: {
              block: {
                type: "p",
                id: "R,.+py}Z9FYSQnm^1LAm",
                inputs: {
                  CHILDREN: {
                    block: {
                      type: "if",
                      id: "=}*ArKY)Vdivd|40#dgX",
                      inputs: {
                        COND: {
                          block: {
                            type: "bin_op",
                            id: "2Sz-3ds^bE)KQa..+)ru",
                            fields: {
                              OP: "===",
                            },
                            inputs: {
                              LEFT: {
                                block: {
                                  type: "variable",
                                  id: "GG0w=-=xH1*J0$*0)T!U",
                                  fields: {
                                    VAR: "i",
                                  },
                                },
                              },
                              RIGHT: {
                                block: {
                                  type: "num",
                                  id: "jSBWcj~7S-(TM{IYA+[8",
                                  fields: {
                                    NUM: "1",
                                  },
                                },
                              },
                            },
                          },
                        },
                        STMTS: {
                          block: {
                            type: "css",
                            id: "X.PYe)yn=oT[!TsKvB0G",
                            fields: {
                              PROPERTY: "color",
                              VALUE: "blue",
                            },
                          },
                        },
                      },
                      next: {
                        block: {
                          type: "txt",
                          id: "7G+58^qu/:6h8P/[K49_",
                          inputs: {
                            TEXT: {
                              block: {
                                type: "variable",
                                id: "*~NVZt5EF*tscW0qz%@Y",
                                fields: {
                                  VAR: "c",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                next: {
                  block: {
                    type: "assign",
                    id: "h%Tu)F6f`tMC`~l9n*oi",
                    inputs: {
                      VAR: {
                        block: {
                          type: "variable",
                          id: "^7Y^%M6A;z:_]%WoG[Oy",
                          fields: {
                            VAR: "i",
                          },
                        },
                      },
                      VALUE: {
                        block: {
                          type: "bin_op",
                          id: "kZGn-O..7f.up$V7,ide",
                          fields: {
                            OP: "+",
                          },
                          inputs: {
                            LEFT: {
                              block: {
                                type: "variable",
                                id: "d!pMwcYl(]_}dYt;])+#",
                                fields: {
                                  VAR: "i",
                                },
                              },
                            },
                            RIGHT: {
                              block: {
                                type: "num",
                                id: "/K5Or#(OIS6kvwhiV58i",
                                fields: {
                                  NUM: "1",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
  workspace,
)
