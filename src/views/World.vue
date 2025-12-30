<script setup>
import { REGIONS } from "@/game/world";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

function explore(region) {
  if (!store.unlockedRegions.includes(region.id)) {
    alert("Região bloqueada! Complete as anteriores.");
    return;
  }
  store.exploreRegion(region);
  alert(`Você explorou a região: ${region.name} e ganhou ${region.rewardXP} XP!`);
}
</script>

<template>
  <div class="world-container">
    <h1>🌍 Mundo Ninja</h1>

    <div v-for="region in REGIONS" :key="region.id" class="region-card">
      <h3>{{ region.name }}</h3>
      <p>Poder inimigo: {{ region.enemyPower }}</p>

      <button
        :disabled="!store.unlockedRegions.includes(region.id)"
        @click="explore(region)"
      >
        Explorar
      </button>
    </div>
  </div>
</template>

<style scoped>
.world-container {
  max-width: 600px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

.region-card {
  background: #1e293b;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
}

button {
  background: #f97316;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

button:disabled {
  background: #64748b;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #fb923c;
}
</style>
