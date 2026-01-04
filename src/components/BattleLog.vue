<script setup>
defineProps({ log: Array });
</script>

<template>
  <ul class="log">
    <li v-for="(m, i) in log" :key="i">{{ m }}</li>
  </ul>
</template>

<style scoped>
.log {
  margin-top: 10px;
  background: #020617;
  padding: 10px;
  border-radius: 8px;
}
</style>
