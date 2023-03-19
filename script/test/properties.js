const obj = {}

const inner = {}
inner.prop = 7

obj.inner = inner

console.log(obj.inner.prop)
