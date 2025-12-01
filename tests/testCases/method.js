const array = [1, 2, 3, 4, 5]
function multiplyByTwo(n) {
  return n * 2
}
const doubled = array.map(multiplyByTwo)
console.log(doubled) // [2, 4, 6, 8, 10]
