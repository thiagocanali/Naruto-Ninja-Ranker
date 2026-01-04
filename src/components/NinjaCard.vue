<script setup>
defineProps({
  ninja: Object,
  active: Boolean,
});
</script>

<template>
  <div class="card" :class="{ active }">
    <img :src="ninja.image" />
    <h4>{{ ninja.name }}</h4>

    <p>Lv {{ ninja.level }} — {{ ninja.rank }}</p>
    ❤️ {{ ninja.battle.hp }} | 🔵 {{ ninja.battle.chakra }}
  </div>
</template>

<style scoped>
.card {
  background: #1e293b;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.card.active {
  border: 2px solid #f97316;
}

img {
  width: 80px;
}
</style>
