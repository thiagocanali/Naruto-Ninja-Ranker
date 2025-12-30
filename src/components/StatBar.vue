<template>
  <div class="stat">
    <small>{{ label }}</small>
    <div class="bar">
      <div class="fill" :style="{ width: value * 10 + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: Number
});
</script>

<style scoped>
.stat {
  margin-bottom: 8px;
}
.bar {
  height: 8px;
  background: #1e293b;
  border-radius: 6px;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316, #fb923c);
  transition: width 0.6s ease;
}
small {
  color: #cbd5f5;
}
</style>
