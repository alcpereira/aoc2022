const input = require('./input.js')


testData = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

const inputTest = testData.trim().split('')

// const currentInput = inputTest
const currentInput = input.input

class Shape {
  constructor(type, position) {
    this.pos = position // Bottom left
    this.type = type
    if (this.type === '_') {
      this.shape = [[0, 0], [1, 0], [2, 0], [3, 0]]
    } else if (this.type === 'L') {
      this.shape = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]]
    } else if (this.type === 'I') {
      this.shape = [[0, 0], [0, 1], [0, 2], [0, 3]]
    } else if (this.type === '+') {
      this.shape = [[0, 1], [0, 2], [0, 3], [1, 0], [3, 0]]
    } else if (this.type === 's') {
      this.shape = [[0, 0], [0, 1], [1, 0], [2, 0]]
    }
    this.full_position = this.shape.map(([x, y]) => [x + this.pos[0], y + this.pos[1]])
  }
}

class Cave {
  constructor() {
    this.shapes = []
    this.currentShape = 0
    this.possibleShapes = ['_', '+', 'L', 'I', 's']
    this.currentCols = [...Array(7).fill([])]
  }

}

const cave = new Cave()
console.log(cave.currentCols)