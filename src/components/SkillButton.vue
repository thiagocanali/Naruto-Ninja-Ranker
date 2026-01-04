<script setup>
defineProps({
  skill: Object,
  disabled: Boolean,
});
</script>

<template>
  <button :disabled="disabled">
    {{ skill.name }} ({{ skill.chakraCost }} 🔵)
  </button>
</template>

<style scoped>
button {
  margin: 4px;
}
</style>
