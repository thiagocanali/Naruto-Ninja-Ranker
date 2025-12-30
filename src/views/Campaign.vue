<script setup>
import { BOSSES } from "@/game/bosses"
import { useNinjaStore } from "@/store/ninjaStore"

const store = useNinjaStore()
</script>

<template>
  <h1>Campanha</h1>

  <div v-if="store.campaignStage < BOSSES.length">
    <p>Capítulo {{ store.campaignStage + 1 }}</p>
    <button @click="store.fightBoss(BOSSES[store.campaignStage])">
      Enfrentar Boss
    </button>
  </div>

  <p v-else>🏆 Campanha concluída!</p>
</template>
