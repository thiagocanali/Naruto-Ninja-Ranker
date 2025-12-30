export const ITEMS = [
  {
    id: 1,
    name: "Bandana Ninja",
    rarity: "Comum",
    bonus: { intelligence: 5 }
  },
  {
    id: 2,
    name: "Kunai Reforçada",
    rarity: "Raro",
    bonus: { taijutsu: 10 }
  },
  {
    id: 3,
    name: "Pergaminho Proibido",
    rarity: "Épico",
    bonus: { ninjutsu: 20 }
  }
]

export function rollItem() {
  const roll = Math.random()

  if (roll < 0.6) return ITEMS[0]
  if (roll < 0.9) return ITEMS[1]
  return ITEMS[2]
}
