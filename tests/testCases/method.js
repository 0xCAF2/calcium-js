const array = [1, 2, 3, 4, 5]
function multiplyByTwo(n) {
  return n * 2
}
function createMapper() {
  function _multiplyByThree(n) {
    return n * 3
  }
  return _multiplyByThree
}
const doubled = array.map(multiplyByTwo)
console.log(doubled) // [2, 4, 6, 8, 10]

const mapper = createMapper()
const tripled = array.map(mapper)
console.log(tripled) // [3, 6, 9, 12, 15]
