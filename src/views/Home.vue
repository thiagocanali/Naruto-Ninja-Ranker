<template>
  <div class="grid">
    <CharacterCard
      v-for="c in store.characters"
      :key="c.id"
      :character="c"
    />
  </div>

  <ComparePanel />
  <TeamBuilder />
</template>

<script setup>
import { useNinjaStore } from "../store/ninjaStore";
import CharacterCard from "../components/CharacterCard.vue";
import ComparePanel from "../components/ComparePanel.vue";
import TeamBuilder from "../components/TeamBuilder.vue";

const store = useNinjaStore();
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
