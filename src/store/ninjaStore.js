import { defineStore } from "pinia";
import { characters } from "../data/characters";

export const useNinjaStore = defineStore("ninja", {
  state: () => ({
    characters,
    ranking: JSON.parse(localStorage.getItem("ranking")) || [],
    team: []
  }),

  actions: {
    calculateScore(ninja) {
      let score =
        ninja.stats.ninjutsu * 1.2 +
        ninja.stats.taijutsu * 1.1 +
        ninja.stats.genjutsu +
        ninja.stats.intelligence * 1.1 +
        ninja.stats.chakra * 1.3;

      if (ninja.clan === "Uchiha") score += 5;
      if (ninja.clan === "Uzumaki") score += 6;

      if (ninja.elements.includes("Fogo")) score += 2;
      if (ninja.elements.includes("Vento")) score += 2;

      return Math.round(score);
    },

    calculateRanking() {
      this.ranking = this.characters
        .map(n => ({ ...n, total: this.calculateScore(n) }))
        .sort((a, b) => b.total - a.total);

      localStorage.setItem("ranking", JSON.stringify(this.ranking));
    },

    addToTeam(ninja) {
      if (this.team.length < 3 && !this.team.includes(ninja)) {
        this.team.push(ninja);
      }
    },

    removeFromTeam(ninja) {
      this.team = this.team.filter(n => n !== ninja);
    },

    calculateTeamScore() {
      let base = this.team.reduce(
        (sum, n) => sum + this.calculateScore(n),
        0
      );

      const clans = this.team.map(n => n.clan);
      const elements = this.team.flatMap(n => n.elements);

      // 🔥 sinergias
      if (new Set(clans).size === 1) base += 15; // mesmo clã
      if (new Set(elements).size >= 3) base += 10; // diversidade

      return base;
    }
  }
});
