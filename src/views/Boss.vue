<template>
  <div class="boss">
    <h1>☠️ Chefes</h1>

    <div v-for="boss in bosses" :key="boss.id" class="boss-card">
      <h2>{{ boss.name }}</h2>
      <p>Nível: {{ boss.level }}</p>
      <p>HP: {{ boss.hp }}</p>

      <button
        :disabled="store.team.length === 0"
        @click="fightBoss(boss)"
      >
        Enfrentar
      </button>
    </div>
  </div>
</template>

<script setup>
import { BOSSES } from "@/game/bosses";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
const bosses = BOSSES;

function fightBoss(boss) {
  const teamPower = store.team.reduce(
    (sum, n) => sum + n.level * 100,
    0
  );

  if (teamPower >= boss.hp) {
    store.team.forEach((n) =>
      store.gainXpToNinja(n, boss.rewardXp)
    );
    store.gold += boss.rewardGold;
    alert("Chefe derrotado!");
  } else {
    alert("Derrota... fortaleça seu time!");
  }
}
</script>

<style scoped>
.boss {
  padding: 20px;
  color: white;
}

.boss-card {
  background: #020617;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 14px;
}
</style>
