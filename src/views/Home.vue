<script setup>
import { computed, onMounted } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { useRouter } from "vue-router";
import CharacterDetails from "@/components/CharacterDetails.vue";

const store = useNinjaStore();
const router = useRouter();

// Carregar os ninjas quando o componente montar
onMounted(() => {
  store.fetchNinjas();
});

// Habilita as ações apenas se houver pelo menos 1 ninja no time
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
      <p v-if="store.team.length > 0" class="team-power">
        ⚔️ Poder do Time: {{ Math.floor(store.teamPower) }}
      </p>
    </section>

    <section class="ninja-list">
      <h2>Lista de Ninjas</h2>
      <div v-if="store.loading">Carregando ninjas...</div>
      <div v-if="store.error" style="color: red;">{{ store.error }}</div>

      <div class="ninja-cards" v-if="!store.loading && !store.error">
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
          <progress :value="ninja.xp" :max="100"></progress>
        </div>
      </div>
    </section>

    <section class="actions">
      <h2>Ações</h2>
      <button @click="goTo('/missions')" :disabled="!canFight">🎯 Missões</button>
      <button @click="goTo('/battle')" :disabled="!canFight">⚔️ Batalha</button>
      <button @click="goTo('/world')" :disabled="!canFight">🌍 Mundo Ninja</button>
      <button @click="goTo('/campaign')" :disabled="!canFight">👑 Campanha</button>
      <button @click="goTo('/ranking')">🏆 Ranking</button>
    </section>
  </div>
  <CharacterDetails v-if="store.selectedCharacter" />
</template>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

h1 { color: #f97316; text-align: center; margin-bottom: 30px; }

.team-builder, .ninja-list, .actions {
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
  width: 100px; height: 120px;
  background: #1e293b;
  border-radius: 10px;
  border: 1px dashed #334155;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.3s;
}

.slot:hover { background: #374151; }

.slot img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 6px; }

.empty { color: #64748b; font-size: 14px; display: flex; justify-content: center; text-align: center; }

.team-power { margin-top: 12px; font-size: 18px; color: #f97316; font-weight: bold; text-align: center; }

.ninja-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }

.card {
  background: #1e293b; border-radius: 12px; padding: 12px;
  cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
  text-align: center; box-shadow: 0 0 10px #f97316;
}

.card:hover { transform: translateY(-5px); box-shadow: 0 0 15px #fb923c; }

.card img { width: 90px; height: 90px; object-fit: contain; margin-bottom: 8px; }

.card h3 { margin: 6px 0 2px; color: #f97316; }

.card p { margin: 2px 0; font-size: 14px; color: #cbd5f5; }

.actions { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }

.actions button {
  flex: 1 1 140px; padding: 10px 0;
  background: #f97316; border: none; border-radius: 8px; color: white;
  font-weight: bold; cursor: pointer; transition: background 0.25s;
}

.actions button:disabled { background: #64748b; cursor: not-allowed; }

.actions button:hover:not(:disabled) { background: #fb923c; }
</style>
