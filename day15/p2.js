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
// const MIN = 0
// const MAX = 20

const currentInput = input.input
const MIN = 0
const MAX = 4000000

const diamonds = []




for (const line of currentInput) {
  // console.log(ne.text(line))
  const regex = /Sensor at x=(?<xsensor>-?\d+), y=(?<ysensor>-?\d+): closest beacon is at x=(?<xbeacon>-?\d+), y=(?<ybeacon>-?\d+)/g
  const g = { ...regex.exec(line).groups }
  diamonds.push({ center: { x: parseInt(g.xsensor), y: parseInt(g.ysensor) }, distance: Math.abs(parseInt(g.xbeacon) - parseInt(g.xsensor)) + Math.abs(parseInt(g.ybeacon) - parseInt(g.ysensor)) })
}

console.log(diamonds)

class Range {
  constructor(start, end) {
    this.start = start
    this.end = end
  }
}

class ComplexRange {
  constructor(...ranges) {
    this.ranges = this.mergeIntervals([...ranges])
  }

  mergeIntervals(intervals) {
    intervals.sort((a, b) => a.start - b.start)
    // console.log(intervals)
    let merged = [intervals[0]]
    for (const interval of intervals.slice(1)) {
      const { start, end } = interval
      let last = merged[merged.length - 1].end
      if (last >= start) {
        merged[merged.length - 1].end = Math.max(end, last)
      } else {
        merged.push(interval)
      }
    }
    // if (merged.length > 1) { console.log("!!!", merged) }
    return merged
  }
}


for (let y = MIN; y <= MAX; y++) {
  // console.log(y)
  ranges = []

  for (const diamond of diamonds) {
    const d = Math.abs(diamond.center.y - y)
    if (d <= diamond.distance) { // Sensor near ytarget
      let start = diamond.center.x + d - diamond.distance
      let end = start + 1 + 2 * (diamond.distance - d)
      if (start <= 0) { start = 0 }
      if (start >= MAX) { continue }
      if (end <= 0) { continue }
      if (end >= MAX) { end = MAX }
      ranges.push([start, end])
    }
  }
  const c = new ComplexRange(...ranges.map(array => new Range(array[0], array[1])))
  if (c.ranges.length > 1) {
    console.log("Result:", y + (c.ranges[0].end * 4000000))
  }
}



// console.log(result.size)