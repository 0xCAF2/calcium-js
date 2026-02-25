let n = 42

function isGreaterThan(num, threshold) {
  if (num > threshold) {
    console.log("n is greater than " + threshold)
  } else {
    console.log("n is not greater than " + threshold)
  }
}

function isEven(num) {
  if (num % 2 === 0) {
    console.log("n is even")
  } else {
    console.log("n is odd")
  }
}

isGreaterThan(n, 50)
isEven(n)

n = 777
isGreaterThan(n, 100)
isEven(n)
