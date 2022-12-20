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
// const currentInput = inputTest
const currentInput = input.input

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
  size = parseInt(size)
  path = currentDirectory.length === 1 ? `/${fileName}` : `/${currentDirectory.slice(1).join('/')}/${fileName}`
  files[path] = size
  // console.log(size, fileName, path)
}

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

const TOTAL_DISK_PLACE = 70000000
const NEEDED_FREE_PLACE = 30000000

const free_place = TOTAL_DISK_PLACE - dirSizes['/']
const needed_place = Math.abs(NEEDED_FREE_PLACE - free_place)
console.log(`Current FreePlace: ${free_place} || Needed space to free: ${needed_place}`)


let smallest = TOTAL_DISK_PLACE
for (const dir in dirSizes) {
  const current = dirSizes[dir]
  console.log(`Current ${dir} - Size: ${Math.floor(current / 1_000_000)}`)
  if (current >= needed_place && current <= smallest) {
    console.log(`*** New best option: Current ${dir} - Size: ${current}`)
    smallest = current
  }
}

console.log(smallest)


// console.log(sum)
// // console.log(files)

// parseInput(currentInput)
// console.log(currentInput)