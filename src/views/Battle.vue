<script setup>
import { ref, computed, onMounted } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { JUTSUS } from "@/game/jutsus";
import { calculateDamage } from "@/game/combat";

const store = useNinjaStore();

const player = ref(null);
const enemy = ref(null);
const log = ref([]);
const turn = ref("player");

onMounted(() => {
  if (store.team.length === 0) {
    store.fetchNinjas().then(() => {
      store.addToTeam(store.ninjas[0]);
      startBattle();
    });
  } else {
    startBattle();
  }
});

function startBattle() {
  player.value = {
    ...store.team[0],
    hp: 120,
    chakra: 100,
  };

  enemy.value = { ...store.currentMission.enemy };

  log.value = ["⚔️ A batalha começou!"];
  turn.value = "player";
}

function useJutsu(jutsu) {
  if (turn.value !== "player") return;
  if (player.value.chakra < jutsu.cost) return;

  player.value.chakra -= jutsu.cost;
  const dmg = calculateDamage(player.value, jutsu);
  enemy.value.hp -= dmg;

  log.value.push(
    `🌀 ${player.value.name} usou ${jutsu.name} causando ${dmg} de dano`
  );

  if (enemy.value.hp <= 0) {
    victory();
    return;
  }

  turn.value = "enemy";
  setTimeout(enemyTurn, 800);
}

function enemyTurn() {
  const dmg = Math.floor(20 + Math.random() * 15);
  player.value.hp -= dmg;

  log.value.push(`💥 Inimigo atacou causando ${dmg} de dano`);

  if (player.value.hp <= 0) {
    log.value.push("☠️ Você foi derrotado...");
    return;
  }

  turn.value = "player";
}

function victory() {
  log.value.push("🏆 Missão concluída!");
  store.gainXpToNinja(store.team[0], store.currentMission.reward.xp);
  store.finishMission(store.currentMission.reward);
}

</script>

<template>
  <div class="battle">
    <h1>⚔️ Batalha</h1>

    <div class="arena" v-if="player && enemy">
      <div class="fighter">
        <h2>{{ player.name }}</h2>
        <p>❤️ HP: {{ player.hp }}</p>
        <p>🔵 Chakra: {{ player.chakra }}</p>

        <div class="jutsus">
          <button v-for="jutsu in JUTSUS" :key="jutsu.id" @click="useJutsu(jutsu)"
            :disabled="turn !== 'player' || player.chakra < jutsu.cost">
            {{ jutsu.name }} ({{ jutsu.cost }})
          </button>
        </div>
      </div>

      <div class="fighter enemy">
        <h2>{{ enemy.name }}</h2>
        <p>❤️ HP: {{ enemy.hp }}</p>
      </div>
    </div>

    <div class="log">
      <p v-for="(l, i) in log" :key="i">{{ l }}</p>
    </div>
  </div>
</template>

<style scoped>
.battle {
  max-width: 900px;
  margin: auto;
  padding: 24px;
  color: #e5e7eb;
}

.arena {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.fighter {
  background: #020617;
  padding: 20px;
  border-radius: 16px;
  width: 45%;
}

.enemy {
  opacity: 0.9;
}

.jutsus button {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  background: #38bdf8;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #475569;
  cursor: not-allowed;
}

.log {
  background: #0f172a;
  padding: 16px;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
}
</style>
