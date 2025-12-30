<script setup>
import { REGIONS } from "@/game/world"
import { useNinjaStore } from "@/store/ninjaStore"

const store = useNinjaStore()
</script>

<template>
  <h1>Mundo Ninja</h1>

  <div v-for="region in REGIONS" :key="region.id">
    <h3>{{ region.name }}</h3>

    <button
      :disabled="!store.unlockedRegions.includes(region.id)"
      @click="store.exploreRegion(region)"
    >
      Explorar
    </button>
  </div>
</template>
