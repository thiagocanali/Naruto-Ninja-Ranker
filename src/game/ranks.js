export const RANKS = [
  { name: "Genin", minLevel: 1, minPower: 0 },
  { name: "Chunin", minLevel: 10, minPower: 400 },
  { name: "Jonin", minLevel: 20, minPower: 800 },
  { name: "Anbu", minLevel: 30, minPower: 1300 },
  { name: "Kage", minLevel: 40, minPower: 2000 }
]

export function calculateRank(level, power) {
  let currentRank = "Genin"

  RANKS.forEach(rank => {
    if (level >= rank.minLevel && power >= rank.minPower) {
      currentRank = rank.name
    }
  })

  return currentRank
}
