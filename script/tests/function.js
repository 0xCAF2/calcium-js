function f(a, b) {
  if (a === b) {
    return 0
  } else {
    if (a > b) {
      return 1
    } else {
      return -1
    }
  }
}
const l = [5, 3, 6]
const l2 = l.sort(f)
console.log(l2)
