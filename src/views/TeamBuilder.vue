<script setup>
import { computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

// Ninjas que ainda não estão no time
const availableNinjas = computed(() =>
  store.ninjas.filter(
    (ninja) => !store.team.some((member) => member.id === ninja.id)
  )
);

// Funções para adicionar e remover do time
function addNinja(ninja) {
  store.addToTeam(ninja);
}

function removeNinja(ninja) {
  store.removeFromTeam(ninja);
}

// Calcula poder total do time
const teamPower = computed(() =>
  store.team.reduce((sum, ninja) => sum + store.ninjaPower(ninja), 0)
);
</script>

<template>
  <div class="team-builder">
    <h1>🛡️ Monte seu Time Ninja</h1>

    <section class="team">
      <h2>Time Atual ({{ store.team.length }}/3)</h2>
      <div v-if="store.team.length === 0">Nenhum ninja no time.</div>

      <ul>
        <li v-for="ninja in store.team" :key="ninja.id">
          <strong>{{ ninja.name }}</strong> - Nível {{ ninja.level }} - Poder: {{ store.ninjaPower(ninja) }}
          <button @click="removeNinja(ninja)">Remover</button>
        </li>
      </ul>
    </section>

    <section class="available">
      <h2>Ninjas Disponíveis</h2>
      <div v-if="availableNinjas.length === 0">Todos os ninjas estão no seu time.</div>

      <ul>
        <li v-for="ninja in availableNinjas" :key="ninja.id">
          <strong>{{ ninja.name }}</strong> - Nível {{ ninja.level }} - Poder: {{ store.ninjaPower(ninja) }}
          <button @click="addNinja(ninja)" :disabled="store.team.length >= 3">Adicionar</button>
        </li>
      </ul>
    </section>

    <section class="summary">
      <h2>Poder Total do Time: {{ teamPower }}</h2>
    </section>
  </div>
</template>

<style scoped>
.team-builder {
  max-width: 700px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

h1, h2 {
  margin-bottom: 10px;
}

section {
  margin-bottom: 25px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #1e293b;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background: #f97316;
  border: none;
  padding: 6px 12px;
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
