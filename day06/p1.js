const input = require('./input.js')

// console.log(input.input)

// testData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`
testData = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`

const inputTest = testData.split('')

// const currentInput = inputTest
const currentInput = input.input

for (let i = 0; i < currentInput.length; i++) {
  const toCompare = currentInput.slice(i, i + 4)
  const setComp = new Set(toCompare)
  if (setComp.size === 4) {
    console.log(i + 4)
    break
  }
}