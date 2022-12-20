const input = require('./input.js')

// console.log(input.input)

const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const testData2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

// const inputTest = testData.trim().split('\n').map(e => ({ direction: e.split(' ')[0], steps: parseInt(e.split(' ')[1]) }))
// const currentInput = inputTest

// const inputTest2 = testData2.trim().split('\n').map(e => ({ direction: e.split(' ')[0], steps: parseInt(e.split(' ')[1]) }))
// const currentInput = inputTest2

const currentInput = input.input

const nodes = Array.from({ length: 10 }, (v) => ({ x: 0, y: 0 }));

const visited = new Set()

const hashPosition = (obj) => {
  const { x, y } = obj
  return `${x}-${y}`
}

const addPosition = (obj) => {
  visited.add(hashPosition(obj))
}
addPosition(nodes[nodes.length - 1])

const moveHead = (direction) => {
  const directions = { R: { x: 1, y: 0 }, U: { x: 0, y: 1 }, L: { x: -1, y: 0 }, D: { x: 0, y: -1 } }
  nodes[0].x = nodes[0].x + directions[direction].x
  nodes[0].y = nodes[0].y + directions[direction].y
}

const moveElement = (index) => {
  const xDistance = Math.abs(nodes[index - 1].x - nodes[index].x)
  const yDistance = Math.abs(nodes[index - 1].y - nodes[index].y)
  const currentDistance = Math.max(xDistance, yDistance)
  if (currentDistance <= 1) {
    return
  }

  if (xDistance === 0) { // up or down
    if (nodes[index - 1].y - nodes[index].y === 2) { // up
      nodes[index].y = nodes[index].y + 1
    } else { // down
      nodes[index].y = nodes[index].y - 1
    }
  } else if (yDistance === 0) { // left or right
    if (nodes[index - 1].x - nodes[index].x === 2) { // right
      nodes[index].x = nodes[index].x + 1
    } else { // left
      nodes[index].x = nodes[index].x - 1
    }
  } else { // diagonals
    if (nodes[index - 1].x - nodes[index].x > 0 && nodes[index - 1].y - nodes[index].y > 0) { // top right
      nodes[index].x = nodes[index].x + 1
      nodes[index].y = nodes[index].y + 1
    } else if (nodes[index - 1].x - nodes[index].x > 0 && nodes[index - 1].y - nodes[index].y < 0) { // bottom right
      nodes[index].x = nodes[index].x + 1
      nodes[index].y = nodes[index].y - 1
    } else if (nodes[index - 1].x - nodes[index].x < 0 && nodes[index - 1].y - nodes[index].y > 0) { // top left
      nodes[index].x = nodes[index].x - 1
      nodes[index].y = nodes[index].y + 1
    } else { // bottom left
      nodes[index].x = nodes[index].x - 1
      nodes[index].y = nodes[index].y - 1
    }

  }

  if (index === nodes.length - 1) {
    addPosition(nodes[index])
  }

}

const moveAllElements = () => {
  for (let i = 1; i < nodes.length; i++) {
    moveElement(i)
  }
}

for (const instruction of currentInput) {
  const { direction, steps } = instruction
  for (let i = 0; i < steps; i++) {
    moveHead(direction)
    moveAllElements()
  }
}

console.log(visited.size)
