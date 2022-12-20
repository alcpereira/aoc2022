const input = require('./input.js')

// console.log(input.input)

testData = `30373
25512
65332
33549
35390`

const inputTest = testData.trim().split('\n').map(e => e.split('')).map(e => e.map(f => parseInt(f)))
// const currentInput = inputTest
const currentInput = input.input

const isVisible = (array, rowInspected, colInspected, value) => {
  // left
  if (array[rowInspected].slice(0, colInspected).every(val => val < value)) { console.log('Left'); return true }
  // right
  if (array[rowInspected].slice(colInspected + 1, array[rowInspected].length).every(val => val < value)) { console.log('Right'); return true }
  // top
  if (array.map(e => e[colInspected]).slice(0, rowInspected).every(val => val < value)) { console.log('Top'); return true }
  // bottom
  if (array.map(e => e[colInspected]).slice(rowInspected + 1, array.length).every(val => val < value)) { console.log('Bottom'); return true }

  console.log('HIDDEN')
  return false
}

let visible = 0
for (let rowIndex = 0; rowIndex < currentInput.length; rowIndex++) {
  for (let colIndex = 0; colIndex < currentInput[0].length; colIndex++) {
    if (rowIndex === 0 || colIndex === 0 || rowIndex === currentInput.length - 1 || colIndex === currentInput[0].length - 1) {
      // console.log('edge')
      visible += 1
    } else {
      if (isVisible(currentInput, rowIndex, colIndex, currentInput[rowIndex][colIndex])) {
        visible += 1
      }
    }
  }
}

console.log(visible)