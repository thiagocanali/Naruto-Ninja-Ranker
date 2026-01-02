<template>
  <div class="world">
    <h1>🌍 Mundo</h1>

    <div v-for="zone in zones" :key="zone.id" class="zone">
      <h2>{{ zone.name }}</h2>
      <p>Nível mínimo: {{ zone.minLevel }}</p>

      <span v-if="canEnter(zone)">✅ Disponível</span>
      <span v-else>🔒 Bloqueado</span>
    </div>
  </div>
</template>

<script setup>
import { ZONES } from "@/game/world";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
const zones = ZONES;

function canEnter(zone) {
  return store.team.some((n) => n.level >= zone.minLevel);
}
</script>

<style scoped>
.world {
  padding: 20px;
  color: white;
}

.zone {
  background: #020617;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
