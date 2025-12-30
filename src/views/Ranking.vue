<script setup>
import { useNinjaStore } from "@/store/ninjaStore"
import { calculatePower } from "@/game/formulas"

const store = useNinjaStore()
</script>

<template>
  <h1>Ranking Ninja</h1>

  <ol>
    <li v-for="ninja in store.rankedNinjas" :key="ninja.id">
      {{ ninja.name }} —
      {{ ninja.rank }} —
      Power: {{ Math.floor(calculatePower(ninja.stats)) }}
    </li>
  </ol>
</template>
