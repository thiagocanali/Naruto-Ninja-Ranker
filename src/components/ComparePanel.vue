<template>
  <div class="compare">
    <select v-model="a">
      <option disabled value="">Escolha um ninja</option>
      <option v-for="n in store.characters" :key="n.id" :value="n">
        {{ n.name }}
      </option>
    </select>

    <select v-model="b">
      <option disabled value="">Escolha outro ninja</option>
      <option v-for="n in store.characters" :key="n.id" :value="n">
        {{ n.name }}
      </option>
    </select>

    <div v-if="a && b" class="result">
      🏆 Vencedor:
      <strong>{{ winner.name }}</strong>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useNinjaStore } from "../store/ninjaStore";

const store = useNinjaStore();
const a = ref("");
const b = ref("");

const winner = computed(() => {
  return store.calculateScore(a.value) >
    store.calculateScore(b.value)
    ? a.value
    : b.value;
});
</script>

<style scoped>
.compare {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
select {
  padding: 6px;
}
.result {
  font-size: 18px;
  color: #f97316;
}
</style>
