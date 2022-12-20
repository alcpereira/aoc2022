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
  const root = { valves: ['AA'], minutesHuman: 26, minutesElephant: 26, potentialPressure: 0, valvesHuman: ['AA'], valvesElephant: ['AA'] }
  const generateChildren = (arrayNodes) => {
    const children = []
    for (const { valves, minutesHuman, minutesElephant, potentialPressure, valvesHuman, valvesElephant } of arrayNodes) {
      // Finished state of this node => All possible valves are visited
      const filterPossibleValves = flowValves.filter(([name, flow]) => !valves.includes(name))
      if (filterPossibleValves.length === 0) {
        children.push({ valves, minutesHuman, minutesElephant, potentialPressure, valvesHuman, valvesElephant })
        continue
      }

      // HUMAN - Last node
      const lastHumanPointName = valvesHuman[valvesHuman.length - 1]
      const distanceMapFromHuman = routes.get(lastHumanPointName)
      const timeReachableValves = filterPossibleValves.filter(([name]) => distanceMapFromHuman.get(name) + 1 <= minutesHuman)

      if (timeReachableValves.length === 0) {
        // HUMAN - No human move, trying Elephant
        const lastElephantPointName = valvesElephant[valvesElephant.length - 1]
        const distanceMapFromElephant = routes.get(lastElephantPointName)
        const timeReachableValves = filterPossibleValves.filter(([name]) => distanceMapFromElephant.get(name) + 1 <= minutesElephant)
        if (timeReachableValves.length === 0) {
          // HUMAN - No human move, no elephant move -> Finished state?
          children.push({ valves, minutesHuman, minutesElephant, potentialPressure, valvesHuman, valvesElephant })
          continue
        }
        // HUMAN - No human move, found one or more Elephant move
        for (const [newDestinationElephant, addedPressureElephant] of timeReachableValves) {
          const newValves = [...valves, newDestinationElephant]
          const newValvesElephant = [...valvesElephant, newDestinationElephant]
          const newMinutesElephant = minutesElephant - distanceMapFromElephant.get(newDestinationElephant) - 1
          const newPotentialPressure = potentialPressure + addedPressureElephant * newMinutesElephant
          // HUMAN - pushing Elephant move
          children.push(
            {
              valves: newValves,
              minutesHuman,
              minutesElephant: newMinutesElephant,
              potentialPressure: newPotentialPressure,
              valvesHuman,
              valvesElephant: newValvesElephant
            }
          )
        }
      }
      // HUMAN - Found potential human moves
      for (const [newDestinationHuman, addedPressureHuman] of timeReachableValves) {
        const newValves = [...valves, newDestinationHuman]
        const newValvesHuman = [...valvesHuman, newDestinationHuman]
        const newMinutesHuman = minutesHuman - distanceMapFromHuman.get(newDestinationHuman) - 1
        const newPotentialPressureHuman = potentialPressure + addedPressureHuman * newMinutesHuman

        // HUMAN - Found potential human moves, checking Elephant moves
        const lastElephantPointName = valvesElephant[valvesElephant.length - 1]
        const distanceMapFromElephant = routes.get(lastElephantPointName)
        const timeReachableValvesElephant = filterPossibleValves
          .filter(([name]) => !newValves.includes(name))
          .filter(([name]) => distanceMapFromElephant.get(name) + 1 <= minutesElephant)
        if (timeReachableValvesElephant.length === 0) { // HUMAN - Found potential human moves, but no further elephant moves
          children.push({
            valves: newValves,
            minutesHuman: newMinutesHuman,
            minutesElephant,
            potentialPressure: newPotentialPressureHuman,
            valvesHuman: newValvesHuman,
            valvesElephant
          })
          continue
        }
        // Found an elephant destination!
        for (const [newDestinationElephant, addedPressureElephant] of timeReachableValvesElephant) {
          const newDoubleValves = [...valves, newDestinationHuman, newDestinationElephant]
          const newValvesElephant = [...valvesElephant, newDestinationElephant]
          const newMinutesElephant = minutesElephant - distanceMapFromElephant.get(newDestinationElephant) - 1
          const newPotentialPressureHumanElephant = newPotentialPressureHuman + addedPressureElephant * newMinutesElephant
          children.push(
            {
              valves: newDoubleValves,
              minutesHuman: newMinutesHuman,
              minutesElephant: newMinutesElephant,
              potentialPressure: newPotentialPressureHumanElephant,
              valvesHuman: newValvesHuman,
              valvesElephant: newValvesElephant
            }
          )
        }

      }
      // new children: valves[..., ], minutes: minutes - time, potentialPressure +=

      // for (possibleChildren of filterPossibleValves) {
      //   console.log(routes.get(possibleChildren[0]))
      // }
    }

    // Manual filter of the array
    // const output = []
    // const visitedSortedHash = new Map()
    // for (const child of children) {
    //   const hSorted = child.valves.sort().join('')
    //   const hHuman = child.valvesHuman.sort().join('')
    //   const hElephant = child.valvesElephant.sort().join('')
    //   if (visitedSortedHash.has(hSorted)) {
    //     if (visitedSortedHash.get(hSorted).includes(hHuman) || visitedSortedHash.get(hSorted).includes(hElephant)) {
    //       // already got the hash, and the human/elephant one
    //       continue
    //     } else {
    //       visitedSortedHash.set(hSorted, [...visitedSortedHash.get(hSorted), hHuman])
    //       output.push(child)
    //     }
    //   } else {

    //   }
    //   const visited = visitedHumanHash.has(hSorted)
    //   if (visited) {

    //   }
    // }

    return children
    // return children.filter((child, index, array) => array.findIndex(e => e.potentialPressure === child.potentialPressure && e.valves.sort().join('') === child.valves.sort().join('')) === index)


    // console.log(visitedResult)

    // return [...visitedResult.values()]

    // console.log("Visited:", visited)
    console.log("Children:", children.length)

    // return children.filter(child => child.valves.sort().join(''))
    return children
  }
  let l = 0
  let children = generateChildren([root])
  // console.log(children)

  while (l !== children.length) {
    l = children.length
    console.log("Children l:", l)
    if (l === 30) {
      console.log(children)
    }
    children = generateChildren(children)
    // console.log(children.sort((a, b) => b.potentialPressure - a.potentialPressure).slice(0, 5))
  }
  const s = children.sort((a, b) => b.potentialPressure - a.potentialPressure)
  // console.log(s.slice(0, 1))
  return s[0].potentialPressure
}

console.log(compute(currentInput))

// A B - AB, BA
// AB CD - AB, CD