const input = require('./input.js')

// console.log(input.input)

testData = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

// testData = `noop
// addx 3
// addx -5`

const inputTest = testData.trim().split('\n')
// const currentInput = inputTest
const currentInput = input.input

const values = Array(240).fill(1)

const completeCycle = (cycle, add = 0) => {
  values[cycle] = values[cycle - 1] + add
}

const completeTwoCycles = (cycle, add = 0) => {
  values[cycle] = values[cycle - 2] + add
  values[cycle - 1] = values[cycle - 2]
}



let cycle = 1
for (const line of currentInput) {
  if (line === 'noop') {
    cycle += 1
    completeCycle(cycle)
  } else {
    const add = parseInt(line.split(' ')[1])
    cycle += 2
    completeTwoCycles(cycle, add)
  }
}

for (let y = 0; y < 6; y++) {
  let currentLine = ''
  for (let x = 0; x < 40; x++) {
    const currentCycle = y * 40 + x
    const spritePosition = values[currentCycle + 1]
    // console.log(spritePosition)
    if (Math.abs(spritePosition - x) <= 1) {
      currentLine += '⬜'
    } else {
      currentLine += '⬛'
    }
  }
  console.log(currentLine)
}

// points = [20, 60, 100, 140, 180, 220]
// total = 0
// for (const point of points) {
//   total += point * values[point]
// }

// console.log(values)
// n ou n+1

// FJUBULRZ
// FJUBULRZ