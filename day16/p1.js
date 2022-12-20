const input = require('./input.js')


testData = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

const inputTest = testData.trim().split('\n')

// const currentInput = inputTest
const currentInput = input.input

// const parseData = (array) => {
//   const valves = new Map()
//   // console.log(array)
//   for (const line of array) {
//     const r = /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/g
//     // console.log(line)
//     const result = r.exec(line)
//     // console.log(result)
//     const [, valveName, flowRate, tunnelsTo] = result
//     valves.set(valveName, { flowRate: parseInt(flowRate), tunnelsTo: tunnelsTo.split(', ') })
//   }
//   console.log("Valves:", valves)

//   const routes = new Map()
//   for (const valve of valves) {
//     const route = new Map()
//     console.log("Valve:", valve)
//   }
//   const route = new Map()
//   const queue = [['AA', 0]]
//   while (queue.length > 0) {
//     const [currentNode, currentDistance] = queue.shift()
//     if (!route.has(currentNode)) {
//       route.set(currentNode, currentDistance)
//       const nextTunnels = valves.get(currentNode).tunnelsTo
//       for (const tunnels of nextTunnels) {
//         queue.push([tunnels, currentDistance + 1])
//       }
//     } else {
//       if (route.get(currentNode) <= currentDistance) {
//         continue
//       } else {
//         route.set(currentNode, currentDistance)
//       }
//     }
//   }
//   console.log("Routes:", route)
// }

const compute = (array) => {
  const valves = new Map()
  for (const line of array) {
    const r = /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/g
    const result = r.exec(line)
    const [, valveName, flowRate, tunnelsTo] = result
    valves.set(valveName, { flowRate: parseInt(flowRate), tunnelsTo: tunnelsTo.split(', ') })
  }
  // console.log("Valves:", valves)

  const routes = new Map()
  for (const valve of valves) {
    const route = new Map()
    // console.log("Valve:", valve)

    const queue = [[valve[0], 0]]
    while (queue.length > 0) {
      const [currentNode, currentDistance] = queue.shift()
      if (!route.has(currentNode)) {
        route.set(currentNode, currentDistance)
        const nextTunnels = valves.get(currentNode).tunnelsTo
        for (const tunnels of nextTunnels) {
          queue.push([tunnels, currentDistance + 1])
        }
      } else {
        if (route.get(currentNode) <= currentDistance) {
          continue
        } else {
          route.set(currentNode, currentDistance)
        }
      }
    }
    routes.set(valve[0], route)
    // console.log("Routes:", [...route].sort())
  }

  // filter flow valves
  const flowValves = [...valves].filter(([valveName, valveObj]) => valveObj.flowRate !== 0).map(([valveName, valveObj]) => [valveName, valveObj.flowRate])
  // console.log(flowValves)

  // construct a graph from flow valves
  const root = { valves: ['AA'], minutes: 30, potentialPressure: 0 }
  const generateChildren = (arrayNodes) => {
    const children = []
    for (const { valves, minutes, potentialPressure } of arrayNodes) {
      // Filter non visited valves
      const filterPossibleValves = flowValves.filter(([name, flow]) => !valves.includes(name))
      // Calculate time from last point to new potential valves
      const lastPointName = valves[valves.length - 1]
      const distanceMap = routes.get(lastPointName)
      const timeReachableValves = filterPossibleValves.filter(([name]) => distanceMap.get(name) + 1 <= minutes)

      if (filterPossibleValves.length === 0 || timeReachableValves.length === 0) {
        children.push({ valves, minutes, potentialPressure })
      }

      for (const [newDestination, addedPressure] of timeReachableValves) {
        children.push({
          valves: [...valves, newDestination],
          minutes: minutes - distanceMap.get(newDestination) - 1,
          potentialPressure: potentialPressure + addedPressure * (minutes - distanceMap.get(newDestination) - 1)
        })
      }
      // new children: valves[..., ], minutes: minutes - time, potentialPressure +=

      // for (possibleChildren of filterPossibleValves) {
      //   console.log(routes.get(possibleChildren[0]))
      // }
    }
    return children
  }
  let l = 0
  let children = generateChildren([root])

  while (l !== children.length) {
    l = children.length
    children = generateChildren(children)
  }
  return children.sort((a, b) => b.potentialPressure - a.potentialPressure)[0].potentialPressure
}

console.log(compute(currentInput))