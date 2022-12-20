const input = require('./input.js')

// console.log(input.input)

testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const inputTest = testData.split('\n')
  .map(line => line.split(','))
  .map(line => line.map(pairs => pairs.split('-')))
  .map(line => line.map(pairs => pairs.map(val => parseInt(val))))

// console.log(inputTest)

let inclusivePairs = 0

// const currentDataset = inputTest
const currentDataset = input.input
for (const [pair1, pair2] of currentDataset) {
  const [x1, x2] = pair1
  const [y1, y2] = pair2
  const current = { pair1: { left: x1, right: x2 }, pair2: { left: y1, right: y2 } }
  if (current.pair1.right < current.pair2.left || current.pair1.left > current.pair2.right) {
    continue
  } else if (current.pair1.left >= current.pair2.left && current.pair1.right <= current.pair2.right) {
    console.log('pair1 inside pair2!', current)
    inclusivePairs += 1
  } else if (current.pair2.left >= current.pair1.left && current.pair2.right <= current.pair1.right) {
    console.log('pair2 inside pair2!', current)
    inclusivePairs += 1
  }
  // console.log(current)
}

console.log(inclusivePairs)