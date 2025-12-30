<template>
  <div class="team">
    <h2>🧠 Team Builder</h2>

    <div class="team-slots">
      <div
        v-for="ninja in store.team"
        :key="ninja.id"
        class="slot"
        @click="store.removeFromTeam(ninja)"
      >
        <img :src="ninja.image" />
        <span>{{ ninja.name }}</span>
      </div>

      <div v-if="store.team.length < 3" class="slot empty">
        + Escolha até 3 ninjas
      </div>
    </div>

    <p v-if="store.team.length === 3" class="score">
      ⚔️ Poder do Time: {{ store.calculateTeamScore() }}
    </p>
  </div>
</template>

<script setup>
import { useNinjaStore } from "../store/ninjaStore";
const store = useNinjaStore();
</script>

<style scoped>
.team {
  margin-top: 40px;
}
.team-slots {
  display: flex;
  gap: 12px;
}
.slot {
  width: 120px;
  height: 140px;
  background: #020617;
  border: 1px dashed #334155;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.slot img {
  width: 70px;
}
.empty {
  color: #64748b;
}
.score {
  margin-top: 16px;
  font-size: 18px;
  color: #f97316;
}
</style>
