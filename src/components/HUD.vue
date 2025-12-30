<script setup>
import { useNinjaStore } from "@/store/ninjaStore"
const store = useNinjaStore()
</script>

<template>
  <div class="hud">
    <span>Equipe: {{ store.team.length }}/3</span>
  </div>
</template>

<style scoped>
.hud {
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  color: #fff;
  padding: 8px;
  text-align: center;
}
</style>
