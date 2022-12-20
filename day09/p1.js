const input = require('./input.js')

// console.log(input.input)

testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const inputTest = testData.trim().split('\n').map(e => ({ direction: e.split(' ')[0], steps: parseInt(e.split(' ')[1]) }))
const currentInput = inputTest
// const currentInput = input.input

const head = { x: 0, y: 0 }
const tail = { x: 0, y: 0 }
const visited = new Set()

const hashPosition = (obj) => {
  const { x, y } = obj
  return `${x}-${y}`
}

const addPosition = (obj) => {
  visited.add(hashPosition(obj))
}
addPosition(tail)

const moveHead = (direction) => {
  const directions = { R: { x: 1, y: 0 }, U: { x: 0, y: 1 }, L: { x: -1, y: 0 }, D: { x: 0, y: -1 } }
  head.x = head.x + directions[direction].x
  head.y = head.y + directions[direction].y
}

const moveTail = () => {
  const xDistance = Math.abs(head.x - tail.x)
  const yDistance = Math.abs(head.y - tail.y)
  const currentDistance = Math.max(xDistance, yDistance)
  if (currentDistance <= 1) {
    return
  }

  if (xDistance === 0) { // up or down
    if (head.y - tail.y === 2) { // up
      tail.y = tail.y + 1
    } else { // down
      tail.y = tail.y - 1
    }
  } else if (yDistance === 0) { // left or right
    if (head.x - tail.x === 2) { // right
      tail.x = tail.x + 1
    } else { // left
      tail.x = tail.x - 1
    }
  } else { // diagonals
    if (head.x - tail.x > 0 && head.y - tail.y > 0) { // top right
      tail.x = tail.x + 1
      tail.y = tail.y + 1
    } else if (head.x - tail.x > 0 && head.y - tail.y < 0) { // bottom right
      tail.x = tail.x + 1
      tail.y = tail.y - 1
    } else if (head.x - tail.x < 0 && head.y - tail.y > 0) { // top left
      tail.x = tail.x - 1
      tail.y = tail.y + 1
    } else { // bottom left
      tail.x = tail.x - 1
      tail.y = tail.y - 1
    }

  }

  addPosition(tail)

}

for (const instruction of currentInput) {
  const { direction, steps } = instruction
  for (let i = 0; i < steps; i++) {
    moveHead(direction)
    moveTail()
  }
}

console.log(visited.size)
