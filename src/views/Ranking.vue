<script setup>
import { computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

const rankedNinjas = computed(() =>
  [...store.ninjas].sort(
    (a, b) => store.ninjaPower(b) - store.ninjaPower(a)
  )
);

// Função para retornar medalha/top visual
function medal(index) {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
}
</script>

<template>
  <div class="ranking-container">
    <h1>🏆 Ranking Ninja</h1>

    <div v-if="rankedNinjas.length === 0">Nenhum ninja cadastrado ainda.</div>

    <ul v-else>
      <li v-for="(ninja, index) in rankedNinjas" :key="ninja.id" class="ninja-item">
        <div class="ninja-info">
          <span class="medal">{{ medal(index) }}</span>
          <span class="name">{{ ninja.name }}</span>
          <span class="rank">({{ ninja.rank || "Genin" }})</span>
        </div>
        <div class="power-bar">
          <div class="fill" :style="{ width: Math.min(store.ninjaPower(ninja), 100) + '%' }"></div>
          <span class="power">{{ Math.floor(store.ninjaPower(ninja)) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ranking-container {
  max-width: 700px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 12px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
  color: #f97316;
  margin-bottom: 25px;
}

ul {
  list-style: none;
  padding: 0;
}

.ninja-item {
  background: #1e293b;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ninja-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #f97316;
}

.medal {
  font-size: 1.3rem;
}

.name {
  font-size: 1rem;
}

.rank {
  font-size: 0.9rem;
  color: #cbd5f5;
}

.power-bar {
  background: #334155;
  height: 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.fill {
  background: linear-gradient(90deg, #f97316, #fb923c);
  height: 100%;
  transition: width 0.3s;
}

.power {
  position: absolute;
  right: 8px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: #e5e7eb;
  font-weight: bold;
  font-size: 12px;
}
</style>
