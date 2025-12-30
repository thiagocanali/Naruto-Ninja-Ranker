export function simulateBattle(attacker, defender) {
  const chance = attacker / (attacker + defender)
  return Math.random() < chance
}
