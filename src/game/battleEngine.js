import { SKILLS } from "./skills";

export function basicAttack(attacker, target) {
  const dmg =
    attacker.stats.taijutsu +
    Math.floor(Math.random() * 15);

  target.hp -= dmg;

  return {
    type: "attack",
    damage: dmg,
  };
}

export function skillAttack(attacker, target, skillId) {
  const skill = SKILLS[skillId];

  if (attacker.chakra < skill.chakraCost) {
    return { error: "Chakra insuficiente" };
  }

  const dmg =
    Math.floor(attacker.stats[skill.type] * skill.power) +
    Math.floor(Math.random() * 10);

  attacker.chakra -= skill.chakraCost;
  target.hp -= dmg;

  return {
    type: "skill",
    skill,
    damage: dmg,
  };
}
