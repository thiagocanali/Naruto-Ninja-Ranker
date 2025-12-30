<script setup>
import { BOSSES } from "@/game/bosses";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

function fightBoss(boss) {
  if (store.team.length === 0) {
    alert("Monte seu time para enfrentar o boss!");
    return;
  }
  store.fightBoss(boss);
}
</script>

<template>
  <div class="boss-container">
    <h1>🔥 Chefões</h1>

    <div v-for="boss in BOSSES" :key="boss.id" class="boss-card">
      <h3>{{ boss.name }}</h3>
      <p>Fases: {{ boss.phases.length }}</p>

      <button @click="fightBoss(boss)">Lutar</button>
    </div>
  </div>
</template>

<style scoped>
.boss-container {
  max-width: 600px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

.boss-card {
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

button:hover {
  background: #fb923c;
}
</style>
