<template>
  <div class="missions">
    <h1>📜 Missões</h1>

    <div
      v-for="mission in missions"
      :key="mission.id"
      class="mission"
    >
      <h3>{{ mission.name }}</h3>
      <p>Nível recomendado: {{ mission.level }}</p>
      <p>Inimigos: {{ mission.enemies }}</p>
      <p>XP: {{ mission.xp }} | Ouro: {{ mission.gold }}</p>

      <button
        :disabled="store.team.length === 0"
        @click="completeMission(mission)"
      >
        Iniciar Missão
      </button>
    </div>
  </div>
</template>

<script setup>
import { MISSIONS } from "@/game/missions";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
const missions = MISSIONS;

function completeMission(mission) {
  store.team.forEach((ninja) => {
    store.gainXpToNinja(ninja, mission.xp);
  });

  store.gold += mission.gold;
  alert(`Missão concluída! +${mission.gold} ouro`);
}
</script>

<style scoped>
.missions {
  padding: 20px;
  color: white;
}

.mission {
  background: #020617;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 12px;
}

button {
  background: #22c55e;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
