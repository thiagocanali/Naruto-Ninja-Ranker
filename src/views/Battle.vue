<script setup>
import { ref } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";

const store = useNinjaStore();
const log = ref([]);
const fighting = ref(false);

const bosses = [
  { name: "Kage da Vila", power: 250 },
  { name: "Orochimaru", power: 400 },
  { name: "Madara Uchiha", power: 600 },
];

function fightBoss() {
  if (store.team.length === 0) return;
  fighting.value = true;
  log.value = [];

  const boss = bosses[Math.floor(Math.random() * bosses.length)];
  const teamPower = store.team.reduce((sum, ninja) => sum + store.ninjaPower(ninja), 0);

  log.value.push(`⚔️ Enfrentando: ${boss.name} (Poder ${boss.power})`);
  log.value.push(`💪 Seu time tem poder ${Math.floor(teamPower)}`);

  setTimeout(() => {
    if (teamPower >= boss.power) {
      log.value.push(`🎉 Vitória! Você derrota ${boss.name} e ganha 200 Gold`);
      store.gold += 200;
    } else {
      log.value.push(`💀 Derrota! Perdeu 50 Gold`);
      store.gold = Math.max(store.gold - 50, 0);
    }
    fighting.value = false;
  }, 1500);
}
</script>

<template>
  <div class="battle-container">
    <h1>⚔️ Batalha contra Chefes</h1>
    <button @click="fightBoss" :disabled="store.team.length === 0 || fighting">Batalhar</button>
    <ul class="log">
      <li v-for="(msg, idx) in log" :key="idx">{{ msg }}</li>
    </ul>
  </div>
</template>
