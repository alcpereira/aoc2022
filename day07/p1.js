const input = require('./input.js')

// console.log(input.input)

testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const inputTest = testData.trim().split('\n').slice(1)
const currentInput = inputTest
// const currentInput = input.input

currentDirectory = ['/']
files = {}
dirSizes = {}

for (const line of currentInput) {
  if (line.startsWith('$ ls')) {
    continue
  }
  if (line.startsWith('$ cd')) {
    if (line === '$ cd ..') {
      currentDirectory.pop()
    } else {
      currentDirectory.push(line.split(' ')[2])
    }
    continue
  }
  if (line.startsWith('dir')) { continue }
  let [size, fileName] = line.split(' ')
  path = currentDirectory.length === 1 ? `/${fileName}` : `/${currentDirectory.slice(1).join('/')}/${fileName}`
  files[path] = parseInt(size)
}

console.log(files)

for (const file in files) {
  const currentSize = files[file]
  const splitted = file.split('/')
  splitted[0] = '/'
  const fileName = splitted[splitted.length - 1]
  const pathDir = splitted.slice(0, -1)
  for (let i = 0; i < pathDir.length; i++) {
    const currentPathDir = pathDir.slice(0, i + 1)
    const path = currentPathDir.length === 1 ? `/` : `/${currentPathDir.slice(1).join('/')}/`
    if (dirSizes[path]) {
      dirSizes[path] += currentSize
    } else {
      dirSizes[path] = currentSize
    }
  }
  // console.log(pathDir)
  // console.log(fileName)
}

let sum = 0
for (const dir in dirSizes) {
  if (dirSizes[dir] <= 100_000) {
    sum += dirSizes[dir]
  }
}


console.log(sum)
console.log(dirSizes)
// console.log(files)

// parseInput(currentInput)
// console.log(currentInput)