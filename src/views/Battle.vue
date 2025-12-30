<script setup>
import { useNinjaStore } from "@/store/ninjaStore";
import { simulateBattle } from "@/game/battle";

const store = useNinjaStore();

function fight() {
  const teamPower = store.team.reduce(
    (sum, ninja) => sum + store.ninjaPower(ninja),
    0
  );

  const enemyPower = 800; // Poder fixo ou depois pode pegar da missão/região

  const win = simulateBattle(teamPower, enemyPower);

  if (win) {
    store.team.forEach(ninja => store.gainXP(ninja.id, 200));
    alert("🏆 Vitória! XP ganho para o time!");
  } else {
    alert("💥 Derrota... Tente treinar mais!");
  }
}
</script>

<template>
  <div class="battle-container">
    <h1>⚔️ Batalha Ninja</h1>

    <div v-if="store.team.length === 0" class="empty-team">
      <p>Você precisa montar um time na tela inicial para batalhar.</p>
    </div>

    <ul v-else>
      <li v-for="ninja in store.team" :key="ninja.id">
        {{ ninja.name }} — Poder: {{ Math.floor(store.ninjaPower(ninja)) }}
      </li>
    </ul>

    <button @click="fight" :disabled="store.team.length === 0">
      Iniciar Batalha
    </button>
  </div>
</template>

<style scoped>
.battle-container {
  max-width: 600px;
  margin: 20px auto;
  background: #111827;
  color: #e5e7eb;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.empty-team {
  margin: 20px 0;
  color: #f87171;
}

ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 20px;
}

li {
  margin-bottom: 8px;
  font-weight: bold;
  color: #f97316;
}

button {
  padding: 10px 20px;
  background: #f97316;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
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
