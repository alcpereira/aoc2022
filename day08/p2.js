const input = require('./input.js')

// console.log(input.input)

testData = `30373
25512
65332
33549
35390`

const inputTest = testData.trim().split('\n').map(e => e.split('')).map(e => e.map(f => parseInt(f)))
// const currentInput = inputTest
const currentInput = input.input

// const calculateScenic = (array, row, col) => {
//   let output = 1

//   /*
//   const walk = (array, row, col, distance, direction) => {
//     const directions = { left: { row: 0, col: -1 }, right: { row: 0, col: 1 }, top: { row: -1, col: 0 }, bottom: { row: 1, col: 0 } }
//     const newRow = row + (directions[direction].row * distance)
//     const newCol = col + (directions[direction].col * distance)
//     // console.log(newRow, newCol)
//     if (newRow === 0 || newRow === array[0].length || newCol === 0 || newCol === array.length) {
//       console.log(`EDGE || [${row},${col} -> ${newRow},${newCol}] Dir: ${direction}, dist:${distance}`)
//       return distance
//     } else {
//       const newVal = array[newRow][newCol]
//       if (newVal >= array[row][col]) {
//         console.log(`TREE || [${row},${col} -> ${newRow},${newCol}] Dir: ${direction}, dist:${distance} || Tree height ${newVal}`)
//         return distance
//       } else {
//         console.log(`.... || [${row},${col} -> ${newRow},${newCol}] Dir: ${direction}, dist:${distance} || Tree height ${newVal}`)

//         const futureRow = row + (directions[direction].row * (distance + 1))
//         const futureCol = col + (directions[direction].col * (distance + 1))
//         if (futureRow === 0 || futureRow === array[0].length || futureCol === 0 || futureCol === array.length) {
//           console.log(`FUTURE || [${row},${col} -> ${futureRow},${futureCol}] - Dist: ${distance}`)
//           return distance
//         }
//         return walk(array, row, col, distance + 1, direction)
//       }

//     }


//   }*/

//   const walk = (array, row, col, distance, direction) => {
//     const directions = { left: { row: 0, col: -1 }, right: { row: 0, col: 1 }, top: { row: -1, col: 0 }, bottom: { row: 1, col: 0 } }


//   }


//   // left
//   console.log(`>> calculateScenic    || [${row},${col}] Current height: ${array[row][col]}`)
//   let left = walk(array, row, col, 1, "left")
//   console.log(`>> LEFT  -- ${left}`)
//   let right = walk(array, row, col, 1, "right")
//   console.log(`>> RIGHT  -- ${right}`)
//   let top = walk(array, row, col, 1, "top")
//   console.log(`>> TOP  -- ${top}`)
//   let bottom = walk(array, row, col, 1, "bottom")
//   console.log(`>> BOT  -- ${bottom}`)
//   // console.log(`***** [row: ${row}, col: ${col}] ||     ANSWER ${left * right * top * bottom}         ||    Walk: top: ${top}, left: ${left}, right: ${right}, bottom: ${bottom},`)
//   console.log(`***** [row: ${row}, col: ${col}] ||     ANSWER ${left * right * top * bottom}         ||    Walk: left: ${left}, right: ${right}, top: ${top},  bottom: ${bottom},`)
// }


const checkArray = (array) => {
  const [height, ...arrayToCompare] = array

  // console.log(`Complete array: ${array}`)
  // console.log(`Height: ${height}`)
  // console.log(`Array to compare: ${arrayToCompare}`)
  // console.log(`Length: ${array.length}`)

  if (array.length === 2) {
    // console.log("[EDGE] Result: 1")
    return 1
  }
  if (height === Math.max(...array) && array.filter(v => v === height).length === 1) {
    // console.log(`[FULL] Result: ${array.length - 1}`)
    return array.length - 1
  }

  for (let i = 0; i < arrayToCompare.length; i++) {
    const currentVisitedTreeHeight = arrayToCompare[i]
    if (height <= currentVisitedTreeHeight) {
      // console.log(`[TREE] Result: ${1 + i}`)
      return 1 + i
    }
  }


}

const sliceAndCheckDirection = (array, row, col, direction) => {
  // console.log(`Slicing -> ${direction}`)
  let outputArray
  if (direction === 'right') {
    outputArray = array[row].slice(col, array[0].length)
  } else if (direction === 'left') {
    outputArray = array[row].slice(0, col + 1).reverse()
  } else if (direction === 'top') {
    outputArray = array.map(row => row[col]).slice(0, row + 1).reverse()
  } else if (direction === 'bottom') {
    outputArray = array.map(row => row[col]).slice(row, array.length)
  }
  return checkArray(outputArray)
}



const calculateScenic = (array, row, col) => {
  console.log(`>> calculateScenic    || [${row},${col}] Current height: ${array[row][col]}`)
  let left = sliceAndCheckDirection(array, row, col, "left")
  // console.log(`>> LEFT  -- ${left}`)
  let right = sliceAndCheckDirection(array, row, col, "right")
  // console.log(`>> RIGHT  -- ${right}`)
  let top = sliceAndCheckDirection(array, row, col, "top")
  // console.log(`>> TOP  -- ${top}`)
  let bottom = sliceAndCheckDirection(array, row, col, "bottom")
  return (left * right * top * bottom)
  // console.log(`>> BOT  -- ${bottom}`)
  // console.log(`***** [row: ${row}, col: ${col}] ||     ANSWER ${left * right * top * bottom}         ||    Walk: top: ${top}, left: ${left}, right: ${right}, bottom: ${bottom},`)
  // console.log(`***** [row: ${row}, col: ${col}] ||     ANSWER ${left * right * top * bottom}         ||    Walk: left: ${left}, right: ${right}, top: ${top},  bottom: ${bottom},`)
}

// Finding the best tree for elves - to run at the end
let best = 0
for (let rowIndex = 0; rowIndex < currentInput.length; rowIndex++) {
  for (let colIndex = 0; colIndex < currentInput[0].length; colIndex++) {
    if (rowIndex === 0 || colIndex === 0 || rowIndex === currentInput.length - 1 || colIndex === currentInput[0].length - 1) {
      continue
    }
    const scene = calculateScenic(currentInput, rowIndex, colIndex)
    // if (rowIndex === 3 && colIndex === 2) {

    // }
    console.log(`Current: ${scene}`)
    if (scene >= best) {
      console.log(`New best: ${scene}`)
      best = scene
    }
  }
}

// calculateScenic(currentInput, 1, 2)
// calculateScenic(currentInput, 3, 2)

console.log(best)