<script setup>
import { ref, computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

// Lista de missões (simples RPG)
const missions = ref([
  { id: 1, name: "Treinar no campo", rewardXP: 10, rewardGold: 50 },
  { id: 2, name: "Proteger vila", rewardXP: 20, rewardGold: 100 },
  { id: 3, name: "Caçar bandidos", rewardXP: 30, rewardGold: 150 },
]);

function doMission(mission) {
  // Distribui XP para cada ninja do time
  store.team.forEach(ninja => {
    ninja.xp += mission.rewardXP;
    ninja.level += Math.floor(ninja.xp / 100);
    ninja.xp = ninja.xp % 100;
  });
  alert(`Missão "${mission.name}" completada! Cada ninja ganhou ${mission.rewardXP} XP`);
}
</script>

<template>
  <div class="missions-container">
    <h1>🎯 Missões Ninja</h1>

    <div class="missions-list">
      <div v-for="mission in missions" :key="mission.id" class="mission-card">
        <h3>{{ mission.name }}</h3>
        <p>XP: {{ mission.rewardXP }} | Gold: {{ mission.rewardGold }}</p>
        <button @click="doMission(mission)" :disabled="store.team.length === 0">
          Iniciar Missão
        </button>
      </div>
    </div>

    <p v-if="store.team.length === 0" class="alert">Adicione ninjas ao time antes de iniciar missões!</p>
  </div>
</template>

<style scoped>
.missions-container {
  max-width: 700px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 12px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

.missions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.mission-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  flex: 1 1 200px;
}

.mission-card button {
  margin-top: 10px;
  background: #f97316;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.mission-card button:disabled {
  background: #64748b;
  cursor: not-allowed;
}

.mission-card button:hover:not(:disabled) {
  background: #fb923c;
}

.alert {
  text-align: center;
  margin-top: 20px;
  color: #f87171;
}
</style>
