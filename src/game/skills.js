// src/game/skills.js

export const SKILLS = {
  FIREBALL: {
    id: "FIREBALL",
    name: "Bola de Fogo",
    cost: 20,
    multiplier: 1.6,
    description: "Um poderoso jutsu de fogo.",
  },

  CHIDORI: {
    id: "CHIDORI",
    name: "Chidori",
    cost: 30,
    multiplier: 2.0,
    description: "Ataque concentrado de chakra elétrico.",
  },

  SHADOW_CLONE: {
    id: "SHADOW_CLONE",
    name: "Clone das Sombras",
    cost: 15,
    multiplier: 1.2,
    description: "Confunde o inimigo e causa dano leve.",
  },
};

export function useSkill(attacker, defender, skill) {
  if (attacker.chakra < skill.cost) return 0;

  attacker.chakra -= skill.cost;
  const base = attacker.stats.ninjutsu * skill.multiplier;
  const damage = Math.floor(base / 10);

  defender.hp -= damage;
  if (defender.hp < 0) defender.hp = 0;

  return damage;
}
