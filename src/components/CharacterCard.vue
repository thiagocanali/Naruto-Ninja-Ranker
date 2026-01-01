<template>
  <div class="card" @click="openDetails">
    <img :src="character.image" :alt="character.name" />
    <h3>{{ character.name }}</h3>
    <span class="clan">{{ character.clan }}</span>

    <StatBar label="Ninjutsu" :value="character.stats.ninjutsu" />
    <StatBar label="Taijutsu" :value="character.stats.taijutsu" />
    <StatBar label="Genjutsu" :value="character.stats.genjutsu" />
    <StatBar label="Inteligência" :value="character.stats.intelligence" />
    <StatBar label="Chakra" :value="character.stats.chakra" />

    <button @click.stop="store.addToTeam(character)">
      ➕ Adicionar ao Time
    </button>
  </div>
</template>

<script setup>
import { useNinjaStore } from "../store/ninjaStore";
import StatBar from "./StatBar.vue";

const props = defineProps({ character: Object });
const store = useNinjaStore();

function openDetails() {
  store.selectCharacter(props.character);
}
</script>

<style scoped>
.card {
  background: radial-gradient(circle at top, #1e293b, #020617);
  border-radius: 14px;
  padding: 16px;
  width: 260px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px);
}

img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 8px;
}

h3 {
  color: #f97316;
  margin: 8px 0 2px;
}

.clan {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  background: #f97316;
  border: none;
  padding: 6px;
  cursor: pointer;
  width: 100%;
  border-radius: 6px;
  color: white;
  font-weight: bold;
}
</style>
