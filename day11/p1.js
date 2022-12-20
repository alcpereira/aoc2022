const input = require('./input.js')

// console.log(input.input)

testData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

const inputTest = testData.trim().split('\n\n')
// const currentInput = inputTest
const currentInput = input.input

class Monkey {
  constructor(number, items, partsOfOperation, tests) {
    this.number = number
    this.items = items
    this.operation = partsOfOperation // ['*', 'old']
    this.tests = tests // {divisible: 17, true: 0, false: 1}
    this.inspected = 0
  }

  addItem(item) {
    this.items.push(item)
  }

  playWithItem() {
    if (this.items.length === 0) {
      return
    }
    this.inspected += 1
    const item = this.items.shift()
    // console.log(`----------------------`)
    // console.log(`Monkey inspects an item with a worry level of ${item}`)

    let computedValue
    if (this.operation[0] === '*') {
      if (this.operation[1] === 'old') {
        computedValue = item * item
      } else {
        computedValue = item * parseInt(this.operation[1])
      }
    } else {
      computedValue = item + parseInt(this.operation[1])
    }
    // console.log(`New worry level -> ${computedValue}`)
    const worryLevel = Math.floor(computedValue / 3)
    // console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${worryLevel}`)
    if (worryLevel % this.tests.divisible === 0) {
      // console.log(`Is divisible by ${this.tests.divisible}`)
      // console.log(`Item with worry level ${worryLevel} is thrown to monkey ${this.tests.true}`)
      return { worry: worryLevel, to: this.tests.true }
    } else {
      // console.log(`Is NOT divisible by ${this.tests.divisible}`)
      // console.log(`Item with worry level ${worryLevel} is thrown to monkey ${this.tests.false}`)
      return { worry: worryLevel, to: this.tests.false }
    }
  }
}

class PartyOfMonkeys {
  constructor(inputText) {
    this.monkeys = {}
    for (const monkeyText of inputText) {
      const lines = monkeyText.split('\n')
      const number = parseInt(lines[0].split(' ')[1].replace(':', ''))
      const items = lines[1].split(': ')[1].split(', ').map(e => parseInt(e))
      const partsOfOperation = lines[2].split(' = ')[1].split(' ').slice(1)
      const tests = {
        divisible: parseInt(lines[3].split(' by ')[1]),
        true: parseInt(lines[4].split(' monkey ')[1]),
        false: parseInt(lines[5].split(' monkey ')[1])
      }
      this.monkeys[number] = new Monkey(number, items, partsOfOperation, tests)
    }
  }

  playRound() {
    for (const monkeyNumber in this.monkeys) {
      // console.log(`***************************`)
      // console.log(`Monkey ${monkeyNumber}:`)
      const currentMonkey = this.monkeys[monkeyNumber]
      while (currentMonkey.items.length > 0) {
        const { worry, to } = currentMonkey.playWithItem()
        this.monkeys[to].addItem(worry)
      }
    }
  }

  playRounds(n) {
    for (let i = 0; i < n; i++) {
      this.playRound()
    }
  }

  findMonkeyBusiness() {
    const inspectedList = []
    for (const monkeyNumber in this.monkeys) {
      const currentMonkey = this.monkeys[monkeyNumber]
      inspectedList.push(currentMonkey.inspected)
    }
    inspectedList.sort((a, b) => b - a)
    return inspectedList[0] * inspectedList[1]
  }


}


const monkeys = new PartyOfMonkeys(currentInput)
monkeys.playRounds(20)
console.log(monkeys.findMonkeyBusiness())

// console.log(currentInput)

