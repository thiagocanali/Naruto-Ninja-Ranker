<script setup>
import { BOSSES } from "@/game/bosses"
import { useNinjaStore } from "@/store/ninjaStore"

const store = useNinjaStore()
</script>

<template>
  <h1>Chefões</h1>

  <div v-for="boss in BOSSES" :key="boss.id">
    <h3>{{ boss.name }}</h3>
    <button @click="store.fightBoss(boss)">
      Lutar
    </button>
  </div>
</template>
