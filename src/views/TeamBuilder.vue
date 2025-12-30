<script setup>
import { computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

const availableNinjas = computed(() =>
  store.ninjas.filter(ninja => !store.team.some(member => member.id === ninja.id))
);

const teamPower = computed(() =>
  store.team.reduce((sum, ninja) => sum + store.ninjaPower(ninja), 0)
);

function addNinja(ninja) { store.addToTeam(ninja); }
function removeNinja(ninja) { store.removeFromTeam(ninja); }
</script>

<template>
  <div class="team-builder-page">
    <h1>🛡️ Monte seu Time Ninja</h1>

    <section>
      <h2>Time Atual ({{ store.team.length }}/3)</h2>
      <ul>
        <li v-for="ninja in store.team" :key="ninja.id">
          <img :src="ninja.image" alt="" />
          <span>{{ ninja.name }} - Nível {{ ninja.level }} - Poder: {{ Math.floor(store.ninjaPower(ninja)) }}</span>
          <button @click="removeNinja(ninja)">Remover</button>
        </li>
      </ul>
      <p v-if="store.team.length > 0">⚔️ Poder Total do Time: {{ Math.floor(teamPower) }}</p>
    </section>

    <section>
      <h2>Ninjas Disponíveis</h2>
      <ul>
        <li v-for="ninja in availableNinjas" :key="ninja.id">
          <img :src="ninja.image" alt="" />
          <span>{{ ninja.name }} - Nível {{ ninja.level }} - Poder: {{ Math.floor(store.ninjaPower(ninja)) }}</span>
          <button @click="addNinja(ninja)" :disabled="store.team.length >= 3">Adicionar</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.team-builder-page {
  max-width: 800px; margin: 20px auto; padding: 20px;
  background: #111827; border-radius: 10px; color: #e5e7eb;
}

section { margin-bottom: 25px; }

ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }

li { background: #1e293b; padding: 10px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; }

li img { width: 80px; height: 80px; object-fit: contain; margin-bottom: 6px; }

button { margin-top: 6px; background: #f97316; border: none; padding: 6px 12px; border-radius: 6px; color: white; cursor: pointer; font-weight: bold; }

button:disabled { background: #64748b; cursor: not-allowed; }

button:hover:not(:disabled) { background: #fb923c; }
</style>
