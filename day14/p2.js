const input = require('./input.js')


testData = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

const inputTest = testData.trim().split('\n')
  .map(line => line.split(' -> ').map(pair => pair.split(',').map(v => parseInt(v))))

// const currentInput = inputTest
const currentInput = input.input

const hash = (x, y) => `${x},${y}`

const grid = {}

for (const segment of currentInput) {
  let prevPoint
  for (const [i, point] of segment.entries()) {
    if (i === 0) {
      prevPoint = point
      continue
    }
    const xDist = prevPoint[0] - point[0]
    const yDist = prevPoint[1] - point[1]
    if (xDist === 0) { // UP or DOWN
      for (let y = 0; Math.abs(y) <= Math.abs(yDist); yDist < 0 ? y++ : y--) {
        grid[hash(prevPoint[0], prevPoint[1] + y)] = { x: prevPoint[0], y: prevPoint[1] + y, string: '#' }
      }
    }
    if (yDist === 0) {
      for (let x = 0; Math.abs(x) <= Math.abs(xDist); xDist < 0 ? x++ : x--) {
        grid[hash(prevPoint[0] + x, prevPoint[1])] = { x: prevPoint[0] + x, y: prevPoint[1], string: '#' }
      }
    }
    prevPoint = point
  }
}

let ymax = 0
let xmin = Infinity
let xmax = 0
for (const point in grid) {
  const [x, y] = point.split(',').map(v => parseInt(v))
  if (x < xmin) { xmin = x }
  if (x > xmax) { xmax = x }
  if (y > ymax) { ymax = y }
}
console.log(ymax, xmin, xmax)

// console.log(currentInput)
// console.log(grid)

startPoint = [501, 0]
let stable = false
let iterations = 100
while (!stable) {
  let newDrop = [...startPoint]
  let falling = true
  console.log('New line')
  while (falling) {
    console.log('Falling')
    console.log(newDrop)
    if (grid.hasOwnProperty(hash(newDrop[0], newDrop[1]))) {
      stable = true
      break
    }
    if (newDrop[1] + 1 === 2 + ymax) {
      if (newDrop[0] > xmax) { xmax = newDrop[0] }
      if (newDrop[0] < xmin) { xmin = newDrop[0] }
      grid[hash(newDrop[0], newDrop[1])] = { x: newDrop[0], y: newDrop[1], string: 'o' }
      newDrop = [...startPoint]
    }
    if (grid.hasOwnProperty(hash(newDrop[0], newDrop[1] + 1))) {
      if (grid.hasOwnProperty(hash(newDrop[0] - 1, newDrop[1] + 1)) && grid.hasOwnProperty(hash(newDrop[0] + 1, newDrop[1] + 1))) {
        if (newDrop[0] > xmax) { xmax = newDrop[0] }
        if (newDrop[0] < xmin) { xmin = newDrop[0] }
        grid[hash(newDrop[0], newDrop[1])] = { x: newDrop[0], y: newDrop[1], string: 'o' }
        newDrop = [...startPoint]
      }
      if (!grid.hasOwnProperty(hash(newDrop[0] - 1, newDrop[1] + 1))) {
        newDrop = [newDrop[0] - 1, newDrop[1] + 1]
        continue
      }
      if (!grid.hasOwnProperty(hash(newDrop[0] + 1, newDrop[1] + 1))) {
        newDrop = [newDrop[0] + 1, newDrop[1] + 1]
        continue
      }
    } else {
      newDrop = [newDrop[0], newDrop[1] + 1]
    }
  }
  console.log(newDrop)
  infinity = true
}
console.log(grid)

for (let row = 0; row <= ymax; row++) {
  out = ''
  for (let col = xmin; col <= xmax; col++) {
    const current = hash(col, row)
    if (grid[current]) {
      out += grid[current].string
    } else {
      out += ' '
    }
  }
  console.log(out)
}
console.log("Result", Object.values(grid).filter(line => line.string === 'o').length)