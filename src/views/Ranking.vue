<template>
  <div>
    <button @click="store.calculateRanking()">Gerar Ranking Ninja</button>
    <RankingTable :ranking="store.ranking" />
  </div>
</template>

<script setup>
import { useNinjaStore } from "../store/ninjaStore";
import RankingTable from "../components/RankingTable.vue";

const store = useNinjaStore();
</script>

<style scoped>
button {
  background: linear-gradient(90deg, #f97316, #fb923c);
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
