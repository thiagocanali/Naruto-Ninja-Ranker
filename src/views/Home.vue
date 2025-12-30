<script setup>
import { useNinjaStore } from "@/store/ninjaStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useNinjaStore();
const router = useRouter();

const canFight = computed(() => store.team.length > 0);

function goTo(path) {
  router.push(path);
}
</script>

<template>
  <div class="home-container">
    <h1>🏠 Hub Ninja</h1>

    <section class="team-builder">
      <h2>Equipe ({{ store.team.length }}/3)</h2>
      <div class="team-slots">
        <div
          v-for="ninja in store.team"
          :key="ninja.id"
          class="slot"
          @click="store.removeFromTeam(ninja)"
          title="Clique para remover"
        >
          <img :src="ninja.image" alt="" />
          <span>{{ ninja.name }}</span>
        </div>
        <div v-if="store.team.length < 3" class="slot empty">
          + Clique nos ninjas para adicionar (máx 3)
        </div>
      </div>
      <p v-if="store.team.length === 3" class="team-power">
        ⚔️ Poder do Time: {{ Math.floor(store.teamPower) }}
      </p>
    </section>

    <section class="ninja-list">
      <h2>Lista de Ninjas</h2>
      <div class="ninja-cards">
        <div
          v-for="ninja in store.ninjas"
          :key="ninja.id"
          class="card"
          @click="store.addToTeam(ninja)"
          :title="'Adicionar ' + ninja.name + ' ao time'"
        >
          <img :src="ninja.image" alt="" />
          <h3>{{ ninja.name }}</h3>
          <p>Rank: {{ ninja.rank || "Genin" }}</p>
          <p>Level: {{ ninja.level }}</p>
          <p>Poder: {{ Math.floor(store.ninjaPower(ninja)) }}</p>
          <progress
            :value="ninja.xp"
            :max="xpToNextLevel(ninja.level)"
          ></progress>
        </div>
      </div>
    </section>

    <section class="actions">
      <h2>Ações</h2>
      <button @click="goTo('/missions')" :disabled="store.team.length === 0">
        🎯 Missões
      </button>
      <button @click="goTo('/battle')" :disabled="store.team.length === 0">
        ⚔️ Batalha
      </button>
      <button @click="goTo('/world')" :disabled="store.team.length === 0">
        🌍 Mundo Ninja
      </button>
      <button @click="goTo('/campaign')" :disabled="store.team.length === 0">
        👑 Campanha
      </button>
      <button @click="goTo('/ranking')">🏆 Ranking</button>
    </section>
  </div>
</template>

<script>
import { xpToNextLevel } from "@/game/formulas";
</script>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  color: #f97316;
  text-align: center;
  margin-bottom: 30px;
}

.team-builder,
.ninja-list,
.actions {
  margin-bottom: 30px;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
}

.team-slots {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.slot {
  width: 100px;
  height: 120px;
  background: #1e293b;
  border-radius: 10px;
  border: 1px dashed #334155;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}

.slot:hover {
  background: #374151;
}

.slot img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 6px;
}

.empty {
  color: #64748b;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: default;
}

.team-power {
  margin-top: 12px;
  font-size: 18px;
  color: #f97316;
  font-weight: bold;
  text-align: center;
}

.ninja-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.card {
  background: #1e293b;
  border-radius: 12px;
  width: 160px;
  padding: 12px;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 0 10px #f97316;
  text-align: center;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 15px #fb923c;
}

.card img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 8px;
}

.card h3 {
  margin: 6px 0 2px;
  color: #f97316;
}

.card p {
  margin: 2px 0;
  font-size: 14px;
  color: #cbd5f5;
}

progress {
  width: 100%;
  height: 12px;
  margin-top: 6px;
  border-radius: 8px;
  overflow: hidden;
  appearance: none;
}

progress::-webkit-progress-bar {
  background-color: #334155;
  border-radius: 8px;
}

progress::-webkit-progress-value {
  background: linear-gradient(90deg, #f97316, #fb923c);
  border-radius: 8px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}

.actions button {
  flex: 1 1 120px;
  padding: 10px 0;
  background: #f97316;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.25s;
}

.actions button:disabled {
  background: #64748b;
  cursor: not-allowed;
}
</style>
