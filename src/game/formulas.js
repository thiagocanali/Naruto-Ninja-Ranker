import { CLASSES } from "@/game/classes"

export function applyBonuses(stats, equipment = [], skills = [], ninjaClass) {
  const finalStats = { ...stats }

  equipment.forEach(item => {
    Object.entries(item.bonus).forEach(([k, v]) => finalStats[k] += v)
  })

  skills.forEach(skill => {
    Object.entries(skill.bonus).forEach(([k, v]) => finalStats[k] += v)
  })

  if (CLASSES[ninjaClass]) {
    Object.entries(CLASSES[ninjaClass].bonus).forEach(
      ([k, v]) => finalStats[k] += v
    )
  }

  return finalStats
}

export function calculatePower(stats) {
  return (
    stats.chakra * 1.2 +
    stats.ninjutsu * 1.3 +
    stats.taijutsu * 1.1 +
    stats.genjutsu * 0.8 +
    stats.intelligence
  )
}

export function xpToNextLevel(level) {
  return level * 150
}
