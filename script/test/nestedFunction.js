function f(a, b) {
  const c = a * b
  function g(m, n) {
    return m % n
  }
  return g(a, b) + c
}

let x = 7
let y = 3
let z = f(x, y)

console.log(z)
