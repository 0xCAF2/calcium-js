export const code = [
  [
    1,
    [],
    "=",
    ["var", "a"],
    ["call", ["prop", ["var", "moduleA"], "add"], [["num", "8"]]],
  ],
  [
    1,
    [],
    "expr",
    ["call", ["prop", ["var", "console"], "log"], [["var", "a"]]],
  ],
  [
    1,
    [],
    "=",
    ["var", "b"],
    ["call", ["prop", ["var", "moduleB"], "add"], [["num", "10"]]],
  ],
  [
    1,
    [],
    "expr",
    ["call", ["prop", ["var", "console"], "log"], [["var", "b"]]],
  ],
  [1, [], "end"],
]
