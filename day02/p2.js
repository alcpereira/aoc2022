const input = require('./input.js')

// console.log(input.input)

testData = `A Y
B X
C Z`

const inputTest = testData.trim()
  .split('\n')
  .map(e => e.split(' '))


let score = 0

const shapePoints = {
  A: 1,
  B: 2,
  C: 3
}

const gamePoints = {
  X: 0,
  Y: 3,
  Z: 6
}

const gameConditions = {
  A: { X: 'C', Y: 'A', Z: 'B' },
  B: { X: 'A', Y: 'B', Z: 'C' },
  C: { X: 'B', Y: 'C', Z: 'A' }
}

for (const [opponent, result] of input.input) {
  const you = gameConditions[opponent][result]
  const winPoints = gamePoints[result]
  const shapeWinPoints = shapePoints[you]
  // console.log(windrawloose, winPoints, shapeWinPoints)
  const totalPoints = shapeWinPoints + winPoints
  score += totalPoints
}

console.log(score)

// console.log(inputTest)

// console.log(input.input.map(e => e.reduce((acc, v) => acc + v, 0)).sort((a, b) => b - a)[0])