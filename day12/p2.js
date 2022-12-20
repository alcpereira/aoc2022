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

const dijkstra = (adjancyList, start, end) => {
  // console.log([...t in adj])
  const visited = {}
  const dist = {}
  for (const t in adjancyList) {
    visited[t] = false
    dist[t] = Infinity
  }
  dist[start] = 0
  const priorityQueue = [[start, 0]]
  while (priorityQueue.length > 0) {
    const [index, minValue] = priorityQueue.shift()
    visited[index] = true
    if (dist[index] < minValue) { continue }
    for (const edge of adjancyList[index]) {
      if (visited[edge]) {
        continue
      }
      newDistance = dist[index] + 1
      if (newDistance < dist[edge]) {
        dist[edge] = newDistance
        priorityQueue.push([edge, newDistance])
        priorityQueue.sort((a, b) => a[1] - b[1])
      }

    }
    if (index === end) {
      console.log('****************')
      return dist[end]
    }
  }

  return false
}

const l = constructAdjancyList(currentInput)
let best = Infinity
for (let row = 0; row < currentInput.length; row++) {
  for (let col = 0; col < currentInput[0].length; col++) {
    const h = hash(row, col)
    const current = currentInput[row][col]
    if (current === 'a') {
      const d = dijkstra(l, h, 'E')
      console.log(`Currrent: ${h} - ${d}`)
      if (!d) {
        console.log('Impossible path')
      } else {
        if (d <= best) {
          console.log(`   >>> New best! - ${d}`)
          best = d
        }
      }
    }
  }
}
console.log(best)
// console.log(constructAdjancyList(currentInput))


// console.log(typeof l)
// console.log(dijkstra(l, 'S', 'E'))
// console.log(dijkstra(l, 'R0,C0', 'E'))
// console.log(currentInput)
// console.log(constructGraph(currentInput))