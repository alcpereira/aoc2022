const input = require('./input.js')

// console.log(input.input)

testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const inputTest = testData.split('\n\n').map(e => e.split('\n')).map(e => e.map(e => parseInt(e))).map(e => e.reduce((acc, v) => acc + v, 0))

console.log(input.input.map(e => e.reduce((acc, v) => acc + v, 0)).sort((a, b) => b - a)[0])