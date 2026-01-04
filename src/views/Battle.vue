<script setup>
import { ref, computed, onMounted } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { characters } from "@/data/characters";

const store = useNinjaStore();

/* =====================
   STATE
===================== */
const log = ref([]);
const turn = ref("player");

const playerIndex = ref(0);
const enemyIndex = ref(0);
const enemies = ref([]);

/* =====================
   HELPERS
===================== */
const maxHp = n => 100 + n.level * 10;
const maxChakra = n => 100 + n.stats.chakra * 0.2;

function animateValue(obj, key, displayKey) {
  if (!obj) return;
  const interval = setInterval(() => {
    if (obj[displayKey] === obj[key]) {
      clearInterval(interval);
      return;
    }
    obj[displayKey] += obj[displayKey] < obj[key] ? 1 : -1;
  }, 10);
}

/* =====================
   COMPUTEDS
===================== */
const safeTeam = computed(() =>
  store.team.map(n => ({
    ...n,
    battle: n.battle ?? {
      hp: maxHp(n),
      hpDisplay: maxHp(n),
      chakra: maxChakra(n),
      chakraDisplay: maxChakra(n),
      ultimateUsed: false,
    },
  }))
);

const activePlayer = computed(() => safeTeam.value[playerIndex.value]);
const activeEnemy = computed(() => enemies.value[enemyIndex.value]);

/* =====================
   INIT
===================== */
onMounted(resetBattle);

/* =====================
   RESET
===================== */
function resetBattle() {
  log.value = [];
  turn.value = "player";
  playerIndex.value = 0;
  enemyIndex.value = 0;

  // Player
  store.team.forEach(n => {
    n.battle = {
      hp: maxHp(n),
      hpDisplay: maxHp(n),
      chakra: maxChakra(n),
      chakraDisplay: maxChakra(n),
      ultimateUsed: false,
    };
  });

  // Enemies (reais, excluindo o time)
  const teamIds = store.team.map(n => n.id);

  enemies.value = characters
    .filter(c => !teamIds.includes(c.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(c => {
      const hp = 90 + c.level * 8;
      return {
        ...c,
        battle: {
          hp,
          hpDisplay: hp,
          maxHp: hp,
          power: 18 + c.level * 3,
        },
      };
    });
}

/* =====================
   ACTIONS
===================== */
function basicAttack() {
  if (turn.value !== "player") return;

  const dmg =
    activePlayer.value.stats.taijutsu +
    Math.floor(Math.random() * 12);

  activeEnemy.value.battle.hp -= dmg;
  animateValue(activeEnemy.value.battle, "hp", "hpDisplay");

  log.value.push(`🗡️ ${activePlayer.value.name} causou ${dmg} de dano`);
  endPlayerTurn();
}

function ultimateAttack() {
  const n = activePlayer.value;
  if (n.battle.ultimateUsed) return;

  const dmg =
    n.stats.ninjutsu * 2 +
    n.level * 5 +
    Math.floor(Math.random() * 25);

  n.battle.ultimateUsed = true;

  activeEnemy.value.battle.hp -= dmg;
  animateValue(activeEnemy.value.battle, "hp", "hpDisplay");

  log.value.push(`☄️ ${n.name} usou um JUTSU SUPREMO! (${dmg})`);
  endPlayerTurn();
}

/* =====================
   TURN FLOW
===================== */
function endPlayerTurn() {
  if (activeEnemy.value.battle.hp <= 0) {
    log.value.push(`💀 ${activeEnemy.value.name} foi derrotado`);
    enemyIndex.value++;
    if (enemyIndex.value >= enemies.value.length) return victory();
  }

  turn.value = "enemy";
  setTimeout(enemyTurn, 900);
}

function enemyTurn() {
  const dmg =
    activeEnemy.value.battle.power +
    Math.floor(Math.random() * 8);

  activePlayer.value.battle.hp -= dmg;
  animateValue(activePlayer.value.battle, "hp", "hpDisplay");

  log.value.push(`💥 ${activeEnemy.value.name} atacou (${dmg})`);

  if (activePlayer.value.battle.hp <= 0) {
    log.value.push(`☠️ ${activePlayer.value.name} caiu`);
    playerIndex.value++;
  }

  turn.value = "player";
}

function victory() {
  log.value.push("🎉 VITÓRIA!");
  store.team.forEach(n => store.gainXP(n, 80));
  store.gold += 120;
}
</script>

<template>
  <div class="battle">
    <h1>⚔️ Batalha</h1>

    <!-- PLAYER -->
    <section class="side">
      <h2>Seu Time</h2>
      <div class="cards">
        <div
          v-for="(n, i) in safeTeam"
          :key="n.id"
          class="card"
          :class="{ active: i === playerIndex }"
        >
          <img :src="n.image" />
          <h3>{{ n.name }}</h3>

          <div class="bar hp">
            <div
              class="fill"
              :style="{ width: (n.battle.hpDisplay / maxHp(n)) * 100 + '%' }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ENEMIES -->
    <section class="side">
      <h2>Inimigos</h2>
      <div class="cards">
        <div
          v-for="(e, i) in enemies"
          :key="e.id"
          class="card enemy"
          :class="{ active: i === enemyIndex }"
        >
          <img :src="e.image" />
          <h3>{{ e.name }}</h3>

          <div class="bar hp">
            <div
              class="fill"
              :style="{ width: (e.battle.hpDisplay / e.battle.maxHp) * 100 + '%' }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ACTIONS -->
    <div class="actions">
      <button @click="basicAttack" :disabled="turn !== 'player'">
        Ataque Básico
      </button>
      <button
        @click="ultimateAttack"
        :disabled="turn !== 'player' || activePlayer?.battle.ultimateUsed"
      >
        ☄️ Ultimate
      </button>
    </div>

    <ul class="log">
      <li v-for="(m, i) in log" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<style scoped>
.battle {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  color: #e5e7eb;
}

.side {
  margin-bottom: 30px;
}

.cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.card {
  background: radial-gradient(circle at top, #1e293b, #020617);
  border-radius: 14px;
  padding: 14px;
  width: 180px;
  text-align: center;
  box-shadow: 0 0 10px #f97316;
  opacity: 0.5;
  transition: transform 0.3s, opacity 0.3s;
}

.card.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 0 18px #fb923c;
}

.card img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.bar {
  height: 8px;
  background: #334155;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 8px;
}

.bar.hp .fill {
  background: #ef4444;
  height: 100%;
}

.actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin: 20px 0;
}
</style>
