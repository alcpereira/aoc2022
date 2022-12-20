const input = require('./input.js')

// console.log(input.input)

testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const inputTest = testData.split('\n\n')


const parseHeader = (header, numberOfStacks = 9) => {
  let lines = header.split('\n')
  const stacks = Array(numberOfStacks).fill().map(e => [])
  lines = lines.slice(0, lines.length - 1)
  for (let i = lines.length - 1; i >= 0; i--) {
    const currentLine = lines[i]
    for (let j = 0; j < numberOfStacks; j++) {
      // 1 5 9 13 (j * 4) + 1
      const currenStack = currentLine[(j * 4) + 1]
      if (currenStack !== ' ') {
        stacks[j].push(currenStack)
      }
    }
  }
  return stacks
}

const parseData = (data) => {
  return data.split('\n').map(e => e.split(' ')).map(e => [e[1], e[3], e[5]]).map(e => e.map(f => parseInt(f)))
}

const move = (stacks, number, from, to) => {
  from = from - 1
  to = to - 1
  const currentItems = stacks[from].slice(stacks[from].length - number)
  stacks[from] = stacks[from].slice(0, stacks[from].length - number)
  stacks[to] = [...stacks[to], ...currentItems]
  return stacks
}

// const [header, data] = inputTest
// let stacks = parseHeader(header, numberOfStacks = 3)
// const moves = parseData(data)

const [header, data] = input.input
let stacks = parseHeader(header, numberOfStacks = 9)
const moves = parseData(data)

for (const [number, from, to] of moves) {
  stacks = move(stacks, number, from, to)
  // console.log(stacks)
}

console.log(stacks.map(e => e[e.length - 1]).join(''))