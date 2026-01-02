import { defineStore } from "pinia";
import { calculatePower, xpToNextLevel } from "@/game/formulas";
import { calculateRank } from "@/game/ranks";

export const useNinjaStore = defineStore("ninjaStore", {
  state: () => ({
    ninjas: [],
    team: [],
    selectedCharacter: null,
    loading: false,
    error: null,
    gold: 0,
  }),

  getters: {
    ninjaPower: () => (ninja) => {
      if (!ninja.stats) return 0;
      return calculatePower(ninja.stats);
    },

    teamPower(state) {
      return state.team.reduce(
        (sum, ninja) => sum + this.ninjaPower(ninja),
        0
      );
    },
  },

  actions: {
    async fetchNinjas(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch(
          `https://dattebayo-api.onrender.com/characters?page=${page}`
        );
        const data = await res.json();

        this.ninjas = data.characters.map((ninja) => ({
          id: ninja.id,
          name: ninja.name,
          image: ninja.images?.[0] || "",
          clan: ninja.clan || "Desconhecido",
          class: "NINJUTSU",
          level: 1,
          xp: 0,
          rank: "Genin",
          skillPoints: 0,
          skills: [],
          equipment: [],
          stats: {
            chakra: 60,
            ninjutsu: 60,
            taijutsu: 60,
            genjutsu: 60,
            intelligence: 60,
          },
        }));
      } catch (err) {
        this.error = "Erro ao carregar ninjas";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    gainXpToNinja(ninja, amount) {
      ninja.xp += amount;

      while (ninja.xp >= xpToNextLevel(ninja.level)) {
        ninja.xp -= xpToNextLevel(ninja.level);
        ninja.level++;
        ninja.skillPoints++;
      }

      ninja.rank = calculateRank(
        ninja.level,
        this.ninjaPower(ninja)
      );
    },

    addToTeam(ninja) {
      if (
        this.team.length < 3 &&
        !this.team.some((n) => n.id === ninja.id)
      ) {
        this.team.push(ninja);
      }
    },

    removeFromTeam(ninja) {
      this.team = this.team.filter((n) => n.id !== ninja.id);
    },

    selectCharacter(character) {
      this.selectedCharacter = character;
    },

    closeCharacter() {
      this.selectedCharacter = null;
    },
  },
});
