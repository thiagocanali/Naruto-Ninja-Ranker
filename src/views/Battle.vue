<template>
  <div class="battle">
    <h1>⚔️ Batalha</h1>

    <div v-if="!battleStarted" class="start">
      <p>Escolha seu time para iniciar a batalha.</p>
      <button :disabled="store.team.length === 0" @click="startBattle">
        Iniciar Batalha
      </button>
    </div>

    <div v-else class="arena">
      <div class="side">
        <h2>Seu Time</h2>
        <div v-for="ninja in playerTeam" :key="ninja.id" class="fighter">
          <strong>{{ ninja.name }}</strong>
          <div>HP: {{ ninja.hp }} / {{ ninja.maxHp }}</div>
        </div>
      </div>

      <div class="side">
        <h2>Inimigos</h2>
        <div v-for="enemy in enemies" :key="enemy.id" class="fighter enemy">
          <strong>{{ enemy.name }}</strong>
          <div>HP: {{ enemy.hp }} / {{ enemy.maxHp }}</div>
        </div>
      </div>
    </div>

    <div v-if="battleStarted && !battleEnded" class="actions">
      <button @click="playerAttack">⚔️ Atacar</button>
    </div>

    <div v-if="battleEnded" class="result">
      <h2 v-if="playerWon">🎉 Vitória!</h2>
      <h2 v-else>💀 Derrota...</h2>

      <button @click="resetBattle">Voltar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { createEnemy, attack } from "@/game/battle";

const store = useNinjaStore();

const battleStarted = ref(false);
const battleEnded = ref(false);
const playerWon = ref(false);

const playerTeam = ref([]);
const enemies = ref([]);

function startBattle() {
  battleStarted.value = true;

  playerTeam.value = store.team.map((ninja) => ({
    ...ninja,
    hp: 100 + ninja.level * 20,
    maxHp: 100 + ninja.level * 20,
  }));

  enemies.value = store.team.map((ninja) =>
    createEnemy(ninja.level)
  );
}

function playerAttack() {
  // Jogador ataca
  playerTeam.value.forEach((ninja, index) => {
    const enemy = enemies.value[index];
    if (enemy && enemy.hp > 0) {
      attack(ninja, enemy);
    }
  });

  // Remove inimigos derrotados
  enemies.value = enemies.value.filter((e) => e.hp > 0);

  // Inimigos atacam
  enemies.value.forEach((enemy, index) => {
    const ninja = playerTeam.value[index];
    if (ninja && ninja.hp > 0) {
      attack(enemy, ninja);
    }
  });

  // Remove ninjas derrotados
  playerTeam.value = playerTeam.value.filter((n) => n.hp > 0);

  checkBattleResult();
}

function checkBattleResult() {
  if (enemies.value.length === 0) {
    endBattle(true);
  } else if (playerTeam.value.length === 0) {
    endBattle(false);
  }
}

function endBattle(victory) {
  battleEnded.value = true;
  playerWon.value = victory;

  if (victory) {
    store.team.forEach((ninja) => {
      store.gainXpToNinja(ninja, 100);
    });
  }
}

function resetBattle() {
  battleStarted.value = false;
  battleEnded.value = false;
  playerWon.value = false;
  playerTeam.value = [];
  enemies.value = [];
}
</script>

<style scoped>
.battle {
  padding: 20px;
  color: white;
  text-align: center;
}

.start button,
.actions button,
.result button {
  background: #f97316;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
}

.arena {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.side {
  width: 40%;
}

.fighter {
  background: #020617;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}

.enemy {
  border: 1px solid #ef4444;
}
</style>
