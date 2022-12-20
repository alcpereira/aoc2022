const input = require('./input.js')


testData = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const inputTest = testData.trim().split('\n').map(row => row.split(''))
// const currentInput = inputTest
const currentInput = input.input

const hash = (row, col) => `R${row},C${col}`

const isLetterReachable = (current, target) => {
  if (current === 'S') {
    current = 'a'
  }
  if (target === 'E') {
    target = 'z'
  }
  return target.charCodeAt(0) - current.charCodeAt(0) <= 1
}

const constructAdjancyList = (array) => {
  const map = {}
  let start = 'S'
  let end = 'E'
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[0].length; col++) {
      const current = array[row][col]
      const possibleCells = []
      for (const [dx, dy] of directions) {
        const x = col + dx
        const y = row + dy
        if (x < 0 || x >= array[0].length || y < 0 || y >= array.length) { continue }
        const target = array[y][x]
        if (isLetterReachable(current, target)) {
          const possibleName = target === start ? start : target === end ? end : hash(y, x)
          possibleCells.push(possibleName)
        }

      }
      const name = current === start ? start : current === end ? end : hash(row, col)
      map[name] = possibleCells
    }
  }
  return map
}

const dijkstra = (adjancyList) => {
  // console.log([...t in adj])
  const visited = {}
  const dist = {}
  for (const t in adjancyList) {
    visited[t] = false
    dist[t] = Infinity
  }
  dist['S'] = 0
  const priorityQueue = [['S', 0]]
  while (priorityQueue.length > 0) {
    const [index, minValue] = priorityQueue.shift()
    visited[index] = true
    if (dist[index] < minValue) { continue }
    for (const edge of adjancyList[index]) {
      if (visited[edge]) {
        console.log(`Already visited: ${edge}`)
        continue
      }
      newDistance = dist[index] + 1
      if (newDistance < dist[edge]) {
        console.log(`NEW EDGE: ${edge} - New distance: ${newDistance} < ${dist[edge]}`)
        dist[edge] = newDistance
        priorityQueue.push([edge, newDistance])
        console.log('SORTING QUEUE ***', priorityQueue)
        priorityQueue.sort((a, b) => a[1] - b[1])
        console.log('SORTED ***', priorityQueue)
      } else {
        console.log(`TOO SLOW | ${edge} - ${newDistance} >= ${dist[edge]}`)
      }

    }
    if (index === 'E') {
      console.log('****************')
      return dist['E']
    }
  }
  console.log('Priority queue:', priorityQueue)
  console.log('Distances:', dist)
  console.log('Visited:', visited)
  for (let r = 0; r < 41; r++) {
    output = ''
    for (let c = 0; c < 83; c++) {
      d = dist[hash(r, c)]
      if (d < 50) {
        output += ' '
      } else if (d < 200) {
        output += 'x'
      } else if (d < 500) {
        output += 'y'
      } else {
        output += '#'
      }
    }
    console.log(output)
  }
  console.log('I failed :(')
  return false
}

// console.log(constructAdjancyList(currentInput))

const l = constructAdjancyList(currentInput)
// console.log(typeof l)
console.log(dijkstra(l))
// console.log(currentInput)
// console.log(constructGraph(currentInput))