<script setup>
import { MISSIONS } from "@/game/missions"
import { useNinjaStore } from "@/store/ninjaStore"
import { calculatePower } from "@/game/formulas"

const store = useNinjaStore()

function runMission(ninja, mission) {
  const power = calculatePower(ninja.stats)
  const xp = power >= mission.requiredPower
    ? mission.rewardXP
    : Math.floor(mission.rewardXP / 2)

  store.gainXP(ninja.id, xp)
  alert(`${ninja.name} ganhou ${xp} XP`)
}
</script>

<template>
  <h1>Missões</h1>

  <div v-for="mission in MISSIONS" :key="mission.id">
    <h3>{{ mission.name }} ({{ mission.difficulty }})</h3>

    <button
      v-for="ninja in store.ninjas"
      :key="ninja.id"
      @click="runMission(ninja, mission)"
    >
      Enviar {{ ninja.name }}
    </button>
  </div>
</template>
