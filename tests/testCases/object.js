const obj = {
  name: "test",
  value: 42,
}

obj["newProp"] = "newValue"
console.log(obj.name, obj["value"], obj.newProp)
