// src/game/battle.js
import { calculatePower } from "./formulas";

export function createEnemy(level = 1) {
  return {
    id: Math.random().toString(36),
    name: "Ninja Inimigo",
    level,
    hp: 100 + level * 20,
    maxHp: 100 + level * 20,
    stats: {
      chakra: 50 + level * 5,
      ninjutsu: 50 + level * 5,
      taijutsu: 50 + level * 5,
      genjutsu: 40 + level * 4,
      intelligence: 40 + level * 4,
    },
  };
}

export function calculateDamage(attacker, defender) {
  const attackPower = calculatePower(attacker.stats);
  const defense = defender.stats.intelligence * 0.5;

  const baseDamage = attackPower / 20;
  const damage = Math.max(5, Math.floor(baseDamage - defense / 10));

  return damage;
}

export function attack(attacker, defender) {
  const damage = calculateDamage(attacker, defender);
  defender.hp -= damage;
  if (defender.hp < 0) defender.hp = 0;

  return damage;
}
