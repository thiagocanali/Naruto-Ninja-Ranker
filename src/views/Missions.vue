<script setup>
import { MISSIONS } from "@/game/missions";
import { useNinjaStore } from "@/store/ninjaStore";
import { useRouter } from "vue-router";

const store = useNinjaStore();
const router = useRouter();

function start(mission) {
  store.startMission(mission);
  router.push("/battle");
}
</script>

<template>
  <div class="missions">
    <h1>📜 Missões</h1>

    <div class="list">
      <div
        v-for="m in MISSIONS"
        :key="m.id"
        class="mission"
        :class="{ boss: m.boss }"
      >
        <h3>{{ m.name }}</h3>
        <p>{{ m.description }}</p>
        <small>XP: {{ m.reward.xp }} | Gold: {{ m.reward.gold }}</small>

        <button @click="start(m)">Iniciar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.missions {
  max-width: 800px;
  margin: auto;
  padding: 24px;
  color: #e5e7eb;
}

.list {
  display: grid;
  gap: 16px;
}

.mission {
  background: #020617;
  padding: 16px;
  border-radius: 14px;
}

.mission.boss {
  border: 2px solid #ef4444;
}

button {
  margin-top: 10px;
  background: #22c55e;
  border: none;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}
</style>
