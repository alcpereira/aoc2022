const input = require('./input.js')


testData = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

const inputTest = testData.trim().split('\n')

// const currentInput = inputTest
const currentInput = input.input

const diamonds = []
const beacons = []

for (const line of currentInput) {
  // console.log(ne.text(line))
  const regex = /Sensor at x=(?<xsensor>-?\d+), y=(?<ysensor>-?\d+): closest beacon is at x=(?<xbeacon>-?\d+), y=(?<ybeacon>-?\d+)/g
  const g = { ...regex.exec(line).groups }
  diamonds.push({ center: { x: parseInt(g.xsensor), y: parseInt(g.ysensor) }, distance: Math.abs(parseInt(g.xbeacon) - parseInt(g.xsensor)) + Math.abs(parseInt(g.ybeacon) - parseInt(g.ysensor)) })
  beacons.push({ x: parseInt(g.xbeacon), y: parseInt(g.ybeacon) })
}

yTarget = 2000000
ranges = []
for (const diamond of diamonds) {
  const d = Math.abs(diamond.center.y - yTarget)
  if (d <= diamond.distance) { // Sensor near ytarget
    newLine = {
      start: diamond.center.x + d - diamond.distance,
      length: 1 + 2 * (diamond.distance - d)
    }
    console.log('Adding', diamond, '->', newLine)
    ranges.push(newLine)
  }
}

// console.log(diamonds)
console.log(ranges)
const result = new Set()

for (const { start, length } of ranges) {
  for (let i = 0; i < length; i++) {
    result.add(start + i)
  }
}
for (const { x, y } of beacons) {
  if (y === yTarget && result.has(x)) { result.delete(x) }
}

console.log(result.size)