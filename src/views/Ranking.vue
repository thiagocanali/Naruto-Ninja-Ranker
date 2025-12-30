<script setup>
import { onMounted, computed } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();

// Garantir que os ninjas estão carregados
onMounted(() => {
  if (store.ninjas.length === 0) store.fetchNinjas();
});

// Ninjas ordenados pelo poder
const rankedNinjas = computed(() =>
  [...store.ninjas].sort((a, b) => store.ninjaPower(b) - store.ninjaPower(a))
);
</script>

<template>
  <div class="ranking-container">
    <h1>🏆 Ranking Ninja</h1>

    <ol>
      <li v-for="ninja in rankedNinjas" :key="ninja.id">
        <img :src="ninja.image" alt="" class="ninja-thumb" />
        {{ ninja.name }} — Rank: {{ ninja.rank || "Genin" }} — Poder: {{ Math.floor(store.ninjaPower(ninja)) }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.ranking-container {
  max-width: 700px;
  margin: 20px auto;
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 12px;
  font-weight: bold;
  color: #f97316;
  display: flex;
  align-items: center;
  gap: 12px;
}

.ninja-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #f97316;
}
</style>
