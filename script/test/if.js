const condition = true
if (!condition) {
  console.log('NG')
} else if (condition) {
  console.log('OK')
} else if (!!condition) {
  console.log('NG3')
} else {
  console.log('NG2')
}
