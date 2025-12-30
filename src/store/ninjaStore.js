import { defineStore } from "pinia";
import { characters } from "@/data/characters";
import { applyBonuses, calculatePower, xpToNextLevel } from "@/game/formulas";
import { calculateRank } from "@/game/ranks";
import { BOSSES } from "@/game/bosses";
import { simulateBattle } from "@/game/battle";
import { REGIONS } from "@/game/world";

export const useNinjaStore = defineStore("ninja", {
  state: () => ({
    ninjas: JSON.parse(localStorage.getItem("ninjas")) || characters,
    team: [],
    campaignStage: 0,
    unlockedRegions: [1], // Começa desbloqueado com a primeira região
  }),

  getters: {
    ninjaPower: () => (ninja) =>
      calculatePower(
        applyBonuses(ninja.stats, ninja.equipment, ninja.skills, ninja.class)
      ),
  },

  actions: {
    save() {
      localStorage.setItem("ninjas", JSON.stringify(this.ninjas));
      localStorage.setItem("unlockedRegions", JSON.stringify(this.unlockedRegions));
      localStorage.setItem("team", JSON.stringify(this.team));
      localStorage.setItem("campaignStage", this.campaignStage);
    },

    load() {
      const ninjas = localStorage.getItem("ninjas");
      if (ninjas) this.ninjas = JSON.parse(ninjas);

      const unlocked = localStorage.getItem("unlockedRegions");
      if (unlocked) this.unlockedRegions = JSON.parse(unlocked);

      const team = localStorage.getItem("team");
      if (team) this.team = JSON.parse(team);

      const stage = localStorage.getItem("campaignStage");
      if (stage) this.campaignStage = Number(stage);
    },

    gainXP(id, amount) {
      const ninja = this.ninjas.find((n) => n.id === id);
      if (!ninja) return;

      ninja.xp += amount;

      while (ninja.xp >= xpToNextLevel(ninja.level)) {
        ninja.xp -= xpToNextLevel(ninja.level);
        ninja.level++;
        ninja.skillPoints++;
      }

      ninja.rank = calculateRank(ninja.level, this.ninjaPower(ninja));

      this.save();
    },

    addToTeam(ninja) {
      if (this.team.find((n) => n.id === ninja.id)) return;
      if (this.team.length >= 3) {
        alert("Seu time já está cheio (3 ninjas).");
        return;
      }
      this.team.push(ninja);
      this.save();
    },

    removeFromTeam(ninja) {
      this.team = this.team.filter((n) => n.id !== ninja.id);
      this.save();
    },

    exploreRegion(region) {
      if (!this.unlockedRegions.includes(region.id)) {
        alert("Região bloqueada.");
        return;
      }
      this.team.forEach((ninja) => this.gainXP(ninja.id, region.rewardXP));

      // Desbloqueia próxima região automaticamente (se existir)
      const nextRegionId = region.id + 1;
      if (REGIONS.find((r) => r.id === nextRegionId) && !this.unlockedRegions.includes(nextRegionId)) {
        this.unlockedRegions.push(nextRegionId);
      }

      this.save();
    },

    fightBoss(boss) {
      let teamPower = this.team.reduce((sum, n) => sum + this.ninjaPower(n), 0);

      for (const phase of boss.phases) {
        const win = simulateBattle(teamPower, phase.power);
        if (!win) {
          alert("Derrota na batalha!");
          return;
        }
        this.team.forEach((n) => this.gainXP(n.id, phase.rewardXP));
      }

      this.campaignStage++;
      alert("Boss derrotado! Campanha avançou!");

      this.save();
    },
  },
});
