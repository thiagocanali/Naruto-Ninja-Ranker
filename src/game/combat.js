export function calculateDamage(attacker, jutsu) {
  const base =
    jutsu.power +
    (attacker.stats[jutsu.type] || 0) * 0.5;

  return Math.floor(base + Math.random() * 10);
}
