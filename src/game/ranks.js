// src/game/ranks.js

export const RANKS = [
  { name: "Genin", minLevel: 1 },
  { name: "Chunin", minLevel: 10 },
  { name: "Jonin", minLevel: 25 },
  { name: "ANBU", minLevel: 40 },
  { name: "Kage", minLevel: 60 },
];

export function calculateRank(level) {
  return [...RANKS]
    .reverse()
    .find((rank) => level >= rank.minLevel)?.name || "Genin";
}
