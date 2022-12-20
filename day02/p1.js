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
  X: 1,
  Y: 2,
  Z: 3
}

const gamePoints = {
  loose: 0,
  draw: 3,
  win: 6
}

const gameConditions = {
  A: { X: 'draw', Y: 'win', Z: 'loose' },
  B: { X: 'loose', Y: 'draw', Z: 'win' },
  C: { X: 'win', Y: 'loose', Z: 'draw' }
}

for (const [opponent, you] of input.input) {
  const windrawloose = gameConditions[opponent][you]
  const winPoints = gamePoints[windrawloose]
  const shapeWinPoints = shapePoints[you]
  // console.log(windrawloose, winPoints, shapeWinPoints)
  const totalPoints = shapeWinPoints + winPoints
  score += totalPoints
}

console.log(score)

// console.log(inputTest)

// console.log(input.input.map(e => e.reduce((acc, v) => acc + v, 0)).sort((a, b) => b - a)[0])