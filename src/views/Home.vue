<script setup>
import { useNinjaStore } from "@/store/ninjaStore"
import { calculatePower, xpToNextLevel } from "@/game/formulas"

const store = useNinjaStore()
</script>

<template>
  <h1>Ninjas</h1>

  <div v-for="ninja in store.ninjas" :key="ninja.id" class="card">
    <h2>{{ ninja.name }}</h2>
    <p>Rank: {{ ninja.rank || "Genin" }}</p>
    <p>Level: {{ ninja.level }}</p>
    <p>Power: {{ Math.floor(calculatePower(ninja.stats)) }}</p>

    <progress
      :value="ninja.xp"
      :max="xpToNextLevel(ninja.level)"
    />

    <br />
    <button @click="store.gainXP(ninja.id, 50)">
      Treinar (+50 XP)
    </button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #444;
  padding: 12px;
  margin-bottom: 12px;
}
</style>
