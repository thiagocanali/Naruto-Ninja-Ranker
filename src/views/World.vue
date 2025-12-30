<script setup>
import { ref } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
const log = ref([]);
const exploring = ref(false);

const enemies = [
  { name: "Bandido Genin", power: 30, rewardXP: 10, rewardGold: 20 },
  { name: "Ninja Chunin", power: 60, rewardXP: 20, rewardGold: 50 },
  { name: "Ninja Jonin", power: 120, rewardXP: 50, rewardGold: 100 },
  { name: "Sannin Lendário", power: 200, rewardXP: 100, rewardGold: 200 },
];

async function explore() {
  if (store.team.length === 0) return;

  exploring.value = true;
  log.value = [];

  const enemy = enemies[Math.floor(Math.random() * enemies.length)];
  const teamPower = store.team.reduce((sum, ninja) => sum + store.ninjaPower(ninja), 0);

  log.value.push(`🌎 Você encontrou: ${enemy.name} (Poder ${enemy.power})`);
  log.value.push(`💪 Seu time tem poder ${Math.floor(teamPower)}`);

  setTimeout(async () => {
    if (teamPower >= enemy.power) {
      log.value.push(`🎉 Vitória! Todos ganham ${enemy.rewardXP} XP e ${enemy.rewardGold} Gold`);
      store.team.forEach((ninja) => {
        ninja.xp += enemy.rewardXP;
        ninja.level += Math.floor(ninja.xp / 100);
        ninja.xp %= 100;
      });
      store.gold += enemy.rewardGold;

      const newNinja = await store.lootRandomNinja();
      log.value.push(`🆕 Você encontrou um novo ninja: ${newNinja.name}!`);
    } else {
      log.value.push(`💀 Derrota! Perdeu 20 Gold`);
      store.gold = Math.max(store.gold - 20, 0);
    }
    exploring.value = false;
  }, 1500);
}
</script>

<template>
  <div class="world-container">
    <h1>🌍 Mundo Ninja</h1>
    <button @click="explore" :disabled="store.team.length === 0 || exploring">🌟 Explorar</button>

    <ul class="log">
      <li v-for="(msg, idx) in log" :key="idx">{{ msg }}</li>
    </ul>

    <p class="resources">💰 Gold: {{ store.gold }}</p>
  </div>
</template>
