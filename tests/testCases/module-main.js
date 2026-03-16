export const code = [
  [
    1,
    [],
    "=",
    ["var", "a"],
    ["call", ["prop", ["var", "module-a"], "add"], [["num", "8"]]],
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
    ["call", ["prop", ["var", "module-b"], "add"], [["num", "10"]]],
  ],
  [
    1,
    [],
    "expr",
    ["call", ["prop", ["var", "console"], "log"], [["var", "b"]]],
  ],
  [1, [], "end"],
]
