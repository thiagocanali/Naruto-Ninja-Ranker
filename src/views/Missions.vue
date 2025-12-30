<script setup>
import { MISSIONS } from "@/game/missions";
import { useNinjaStore } from "@/store/ninjaStore";
import { calculatePower } from "@/game/formulas";

const store = useNinjaStore();

function runMission(ninja, mission) {
  const power = calculatePower(ninja.stats);
  const xp = power >= mission.requiredPower
    ? mission.rewardXP
    : Math.floor(mission.rewardXP / 2);

  store.gainXP(ninja.id, xp);
  alert(`${ninja.name} completou "${mission.name}" e ganhou ${xp} XP!`);
}
</script>

<template>
  <div class="missions-container">
    <h1>🎯 Missões</h1>

    <div v-for="mission in MISSIONS" :key="mission.id" class="mission-card">
      <h3>{{ mission.name }} (Dificuldade: {{ mission.difficulty }})</h3>
      <p>Requisito de Poder: {{ mission.requiredPower }}</p>
      <p>Recompensa: {{ mission.rewardXP }} XP</p>

      <div class="ninja-buttons">
        <button
          v-for="ninja in store.ninjas"
          :key="ninja.id"
          @click="runMission(ninja, mission)"
        >
          Enviar {{ ninja.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.missions-container {
  max-width: 800px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

.mission-card {
  background: #1e293b;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
}

.ninja-buttons {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
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
