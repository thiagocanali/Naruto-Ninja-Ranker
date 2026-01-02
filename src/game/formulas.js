// src/game/formulas.js

export function xpToNextLevel(level) {
  return Math.floor(100 * Math.pow(level, 1.5));
}

export function calculatePower(stats) {
  return (
    stats.chakra * 1.2 +
    stats.ninjutsu * 1.5 +
    stats.taijutsu * 1.3 +
    stats.genjutsu * 1.4 +
    stats.intelligence * 1.1
  );
}

export function gainXp(ninja, amount) {
  ninja.xp += amount;

  while (ninja.xp >= xpToNextLevel(ninja.level)) {
    ninja.xp -= xpToNextLevel(ninja.level);
    ninja.level++;
    ninja.skillPoints += 1;

    // bônus por level
    ninja.stats.chakra += 5;
    ninja.stats.ninjutsu += 3;
    ninja.stats.taijutsu += 3;
    ninja.stats.genjutsu += 3;
    ninja.stats.intelligence += 2;
  }
}
