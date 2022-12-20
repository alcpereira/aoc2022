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

const c = [...currentInput.flat(), [[2]], [[6]]]

c.sort((a, b) => compare(a, b) === "TRUE" ? -1 : 1)
x = c.findIndex(v => v.length === 1 && v[0].length === 1 && v[0][0] === 2) + 1
y = c.findIndex(v => v.length === 1 && v[0].length === 1 && v[0][0] === 6) + 1
console.log(x * y)
// console.log(c)