const input = require('./input.js')


testData = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

const inputTest = testData.trim().split('\n\n').map(pairs => pairs.split('\n')).map(pairs => pairs.map(pair => eval(pair)))

// const currentInput = inputTest
const currentInput = input.input

const compare = (left, right) => {
  const leftIsNum = typeof left === 'number'
  const rightIsNum = typeof right === 'number'
  if (leftIsNum && rightIsNum) {
    if (left < right) {
      return "TRUE"
    }
    if (left === right) {
      return "CONTINUE"
    }
    if (left > right) {
      return "FALSE"
    }
    throw "Error in comparing numbers"
  }

  if (leftIsNum) {
    return compare([left], right)
  }
  if (rightIsNum) {
    return compare(left, [right])
  }

  const queue = [...left]
  const r2 = [...right]
  while (queue.length > 0) {
    const l = queue.shift()
    const r = r2.shift()
    if (r === undefined) { return "FALSE" }
    const c = compare(l, r)
    if (c === "TRUE") {
      return "TRUE"
    }
    if (c === "FALSE") {
      return "FALSE"
    }
    if (c === "CONTINUE") { continue }
  }
  if (r2.length > 0) {
    return "TRUE"
  }
  return "CONTINUE"

}


let sum = 0
for (let index = 0; index < currentInput.length; index++) {
  const [left, right] = currentInput[index]
  c = compare(left, right)
  console.log(index + 1, c)
  if (c === "TRUE") { sum += (index + 1) }

}
console.log(sum)

// If both values are integers, the lower integer should come first. 
// If the left integer is lower than the right integer, the inputs are in the right order. 
// If the left integer is higher than the right integer, the inputs are not in the right order. 
// **** Otherwise, the inputs are the same integer; continue checking the next part of the input. 

// If both values are lists, compare the first value of each list, then the second value, and so on. 
// If the left list runs out of items first, the inputs are in the right order. 
// If the right list runs out of items first, the inputs are not in the right order. 
// If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.


// If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. 
// For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].


// console.log(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]))
// console.log(compare([1, 1, 6], [1, 1, 5]))