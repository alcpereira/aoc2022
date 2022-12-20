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

for (let i = 0; i < input.input.length; i += 3) {
  const firstGroup = input.input[i].split('')
  const secondGroup = input.input[i + 1].split('')
  const thirdGroup = input.input[i + 2].split('')
  // console.log(firstGroup, secondGroup, thirdGroup)
  for (const letter of firstGroup) {
    if (secondGroup.includes(letter) && thirdGroup.includes(letter)) {
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
