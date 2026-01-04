<script setup>
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
</script>

<template>
  <div class="hud">
    <div class="team">
      <div
        v-for="ninja in store.team"
        :key="ninja.id"
        class="ninja"
      >
        <strong>{{ ninja.name }}</strong>
        <small>{{ ninja.rank }}</small>

        <div class="bar hp">
          <div
            class="fill"
            :style="{ width: '100%' }"
          ></div>
        </div>

        <div class="bar chakra">
          <div
            class="fill"
            :style="{ width: '100%' }"
          ></div>
        </div>
      </div>
    </div>

    <span class="count">
      Equipe: {{ store.team.length }}/3
    </span>
  </div>
</template>

<style scoped>
.hud {
  position: fixed;
  top: 0;
  width: 100%;
  background: #020617;
  color: #e5e7eb;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.team {
  display: flex;
  gap: 12px;
}

.ninja {
  background: #1e293b;
  padding: 6px 10px;
  border-radius: 8px;
  min-width: 140px;
}

.bar {
  height: 6px;
  background: #334155;
  border-radius: 4px;
  margin-top: 4px;
}

.bar.hp .fill {
  background: #ef4444;
  height: 100%;
}

.bar.chakra .fill {
  background: #3b82f6;
  height: 100%;
}

.count {
  font-weight: bold;
}
</style>
