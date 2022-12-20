const input = require('./input.js')

// console.log(input.input)

testData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`
// testData = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`
// testData = `bvwbjplbgvbhsrlpgdmjqwftvncz`

const inputTest = testData.split('')

// const currentInput = inputTest
const currentInput = input.input

for (let i = 0; i < currentInput.length; i++) {
  const toCompare = currentInput.slice(i, i + 14)
  const setComp = new Set(toCompare)
  // console.log(setComp.size)
  if (setComp.size === 14) {
    console.log(i + 14)
    break
  }
}