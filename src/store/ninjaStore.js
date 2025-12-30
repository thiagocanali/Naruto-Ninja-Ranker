import { defineStore } from "pinia"
import { characters } from "@/data/characters"
import { applyBonuses, calculatePower, xpToNextLevel } from "@/game/formulas"
import { calculateRank } from "@/game/ranks"
import { BOSSES } from "@/game/bosses"
import { simulateBattle } from "@/game/battle"

export const useNinjaStore = defineStore("ninja", {
  state: () => ({
    ninjas: JSON.parse(localStorage.getItem("ninjas")) || characters,
    team: [],
    campaignStage: 0
  }),

  getters: {
    ninjaPower: () => ninja =>
      calculatePower(
        applyBonuses(
          ninja.stats,
          ninja.equipment,
          ninja.skills,
          ninja.class
        )
      )
  },

  actions: {
    save() {
      localStorage.setItem("ninjas", JSON.stringify(this.ninjas))
    },

    gainXP(id, amount) {
      const ninja = this.ninjas.find(n => n.id === id)
      if (!ninja) return

      ninja.xp += amount

      while (ninja.xp >= xpToNextLevel(ninja.level)) {
        ninja.xp -= xpToNextLevel(ninja.level)
        ninja.level++
        ninja.skillPoints++
      }

      ninja.rank = calculateRank(
        ninja.level,
        this.ninjaPower(ninja)
      )

      this.save()
    },

    fightBoss(boss) {
      let teamPower = this.team.reduce(
        (sum, n) => sum + this.ninjaPower(n),
        0
      )

      for (const phase of boss.phases) {
        const win = simulateBattle(teamPower, phase.power)
        if (!win) {
          alert("Derrota na batalha!")
          return
        }
        this.team.forEach(n => this.gainXP(n.id, phase.rewardXP))
      }

      this.campaignStage++
      alert("Boss derrotado! Campanha avançou!")
    }
  }
})
