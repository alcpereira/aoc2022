const input = require('./input.js')

// console.log(input.input)

testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const inputTest = testData.trim()
  .split('\n')

let sum = 0

for (const line of input.input) {
  const firstHalf = line.slice(0, line.length / 2)
  const secondHalf = line.slice(line.length / 2, line.length).split('')
  for (const letter of firstHalf.split('')) {
    if (secondHalf.includes(letter)) {
      let value = letter.charCodeAt(0) - 96
      if (value < 1) { value += 58 }
      sum += value
      // console.log('found', letter, value)
      break
    }
  }
}
console.log(sum)
// console.log(inputTest)
