<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <button class="close" @click="close">✖</button>

      <img :src="ninja.image" />
      <h2>{{ ninja.name }}</h2>
      <p class="meta">
        Classe: {{ ninja.class }} • Rank: {{ ninja.rank }} • Nível {{ ninja.level }}
      </p>

      <p class="xp">XP: {{ ninja.xp }}</p>

      <StatBar label="Chakra" :value="ninja.stats.chakra" />
      <StatBar label="Ninjutsu" :value="ninja.stats.ninjutsu" />
      <StatBar label="Taijutsu" :value="ninja.stats.taijutsu" />
      <StatBar label="Genjutsu" :value="ninja.stats.genjutsu" />
      <StatBar label="Inteligência" :value="ninja.stats.intelligence" />

      <div class="actions">
        <button v-if="!inTeam" @click="store.addToTeam(ninja)">
          ➕ Adicionar ao Time
        </button>
        <button v-else @click="store.removeFromTeam(ninja)">
          ❌ Remover do Time
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import StatBar from "./StatBar.vue";

const store = useNinjaStore();
const ninja = computed(() => store.selectedCharacter);

const inTeam = computed(() =>
  store.team.some((n) => n.id === ninja.value.id)
);

function close() {
  store.closeCharacter();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #020617;
  border-radius: 14px;
  padding: 20px;
  width: 360px;
  color: #e5e7eb;
  position: relative;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #f87171;
  font-size: 18px;
  cursor: pointer;
}

img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 10px;
}

h2 {
  color: #f97316;
  margin-bottom: 6px;
}

.meta {
  font-size: 14px;
  color: #94a3b8;
}

.xp {
  margin: 10px 0;
}

.actions button {
  margin-top: 12px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: #f97316;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
