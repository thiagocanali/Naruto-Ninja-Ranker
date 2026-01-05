<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { SKILLS } from "@/game/skills";

const store = useNinjaStore();

/* =====================
   ESTADO
===================== */
const log = ref([]);
const turn = ref("player");

const playerIndex = ref(0);
const enemyIndex = ref(0);

const enemies = ref([]);
const battleReady = ref(false);

/* =====================
   HELPERS
===================== */
function maxHp(ninja) {
  return 100 + ninja.level * 10;
}

function maxChakra(ninja) {
  return 100 + ninja.stats.chakra * 0.2;
}

function ensureBattle(ninja) {
  if (!ninja.battle) {
    const hp = maxHp(ninja);
    const chakra = maxChakra(ninja);

    ninja.battle = {
      hp,
      hpDisplay: hp,
      chakra,
      chakraDisplay: chakra,
      ultimateUsed: false,
    };
  }
}

function animateValue(obj, key, displayKey) {
  if (!obj) return;

  const interval = setInterval(() => {
    if (obj[displayKey] === obj[key]) {
      clearInterval(interval);
      return;
    }
    obj[displayKey] += obj[displayKey] < obj[key] ? 1 : -1;
  }, 8);
}

/* =====================
   COMPUTEDS
===================== */
const playerTeam = computed(() => store.team);

const activePlayer = computed(() => {
  if (!battleReady.value) return null;
  const ninja = playerTeam.value[playerIndex.value];
  if (!ninja) return null;
  ensureBattle(ninja);
  return ninja;
});

const activeEnemy = computed(() => {
  if (!battleReady.value) return null;
  return enemies.value[enemyIndex.value] || null;
});

/* =====================
   INIT
===================== */
onMounted(async () => {
  if (store.ninjas.length === 0) {
    await store.fetchNinjas();
  }

  if (store.team.length > 0) {
    resetBattle();
  }
});

/* =====================
   WATCH TEAM
===================== */
watch(
  () => store.team,
  (team) => {
    if (team.length > 0) {
      resetBattle();
    } else {
      battleReady.value = false;
    }
  },
  { deep: true }
);

/* =====================
   RESET BATTLE
===================== */
function resetBattle() {
  if (store.team.length === 0) return;

  log.value = [];
  turn.value = "player";
  playerIndex.value = 0;
  enemyIndex.value = 0;
  battleReady.value = true;

  store.team.forEach(ensureBattle);

  const teamIds = store.team.map(n => n.id);

  enemies.value = store.ninjas
    .filter(n => !teamIds.includes(n.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(n => {
      const hp = 80 + n.level * 12;
      return {
        ...n,
        battle: {
          hp,
          hpDisplay: hp,
          maxHp: hp,
          power: Math.floor(store.ninjaPower(n) * 0.6),
        },
      };
    });
}

/* =====================
   PLAYER ACTIONS
===================== */
function basicAttack() {
  if (turn.value !== "player" || !activePlayer.value) return;

  const dmg =
    activePlayer.value.stats.taijutsu +
    Math.floor(Math.random() * 15);

  dealDamage(dmg, "🗡️ Ataque básico");
}

function useSkill(skillId) {
  if (turn.value !== "player" || !activePlayer.value) return;

  const ninja = activePlayer.value;
  const skill = SKILLS[skillId];

  if (ninja.battle.chakra < skill.chakraCost) {
    log.value.push("❌ Chakra insuficiente");
    return;
  }

  const base =
    ninja.stats[skill.type] || ninja.stats.ninjutsu;

  const dmg =
    Math.floor(base * skill.power) +
    Math.floor(Math.random() * 20);

  ninja.battle.chakra -= skill.chakraCost;
  animateValue(ninja.battle, "chakra", "chakraDisplay");

  dealDamage(dmg, `🔥 ${skill.name}`);
}

function ultimateAttack() {
  const ninja = activePlayer.value;
  if (
    turn.value !== "player" ||
    !ninja ||
    ninja.battle.ultimateUsed
  ) return;

  const dmg =
    Math.floor(store.ninjaPower(ninja) * 1.8) +
    Math.floor(Math.random() * 30);

  ninja.battle.ultimateUsed = true;
  dealDamage(dmg, "💥 JUTSU SUPREMO");
}

function switchNinja(index) {
  if (turn.value !== "player") return;

  const ninja = playerTeam.value[index];
  if (!ninja) return;

  ensureBattle(ninja);
  if (ninja.battle.hp <= 0) return;

  playerIndex.value = index;
  log.value.push(`🔁 ${ninja.name} entrou`);
  endPlayerTurn();
}

/* =====================
   FLOW DE DANO
===================== */
function dealDamage(dmg, label) {
  if (!activeEnemy.value) return;

  activeEnemy.value.battle.hp -= dmg;
  animateValue(activeEnemy.value.battle, "hp", "hpDisplay");

  log.value.push(
    `${label}: ${activePlayer.value.name} causou ${dmg}`
  );

  endPlayerTurn();
}

function endPlayerTurn() {
  if (activeEnemy.value?.battle.hp <= 0) {
    log.value.push(`💀 ${activeEnemy.value.name} derrotado`);
    enemyIndex.value++;

    if (enemyIndex.value >= enemies.value.length) {
      return victory();
    }
  }

  turn.value = "enemy";
  setTimeout(enemyTurn, 800);
}

function enemyTurn() {
  if (!activeEnemy.value || !activePlayer.value) return;

  const dmg =
    activeEnemy.value.battle.power +
    Math.floor(Math.random() * 10);

  const ninja = activePlayer.value;

  ninja.battle.hp -= dmg;
  animateValue(ninja.battle, "hp", "hpDisplay");

  log.value.push(`💥 ${activeEnemy.value.name} atacou (${dmg})`);

  if (ninja.battle.hp <= 0) {
    log.value.push(`💀 ${ninja.name} caiu`);

    const next = playerTeam.value.findIndex(
      n => n.battle && n.battle.hp > 0
    );

    if (next === -1) return defeat();
    playerIndex.value = next;
  }

  turn.value = "player";
}

/* =====================
   RESULTADOS
===================== */
function victory() {
  log.value.push("🎉 VITÓRIA!");
  store.team.forEach(n => store.gainXP(n, 80));
  store.gold += 120;
}

function defeat() {
  log.value.push("☠️ DERROTA...");
}
</script>

<template>
  <div class="battle" v-if="battleReady">
    <h1>⚔️ Batalha</h1>

    <div class="arena">
      <!-- PLAYER -->
      <div class="side">
        <h3>Seu Time</h3>

        <div
          v-for="(n, i) in playerTeam"
          :key="n.id"
          class="card"
          :class="{ active: i === playerIndex }"
        >
          <img :src="n.image" />
          <strong>{{ n.name }}</strong>

          <div class="bar hp">
            <div
              class="fill"
              :style="{ width: (n.battle.hpDisplay / maxHp(n)) * 100 + '%' }"
            />
          </div>

          <div class="bar chakra">
            <div
              class="fill"
              :style="{ width: (n.battle.chakraDisplay / maxChakra(n)) * 100 + '%' }"
            />
          </div>

          <button @click="switchNinja(i)" :disabled="turn !== 'player'">
            Trocar
          </button>
        </div>
      </div>

      <!-- ENEMY -->
      <div class="side">
        <h3>Inimigos</h3>

        <div
          v-for="(e, i) in enemies"
          :key="e.id"
          class="card enemy"
          :class="{ active: i === enemyIndex }"
        >
          <img :src="e.image" />
          <strong>{{ e.name }}</strong>

          <div class="bar hp">
            <div
              class="fill"
              :style="{ width: (e.battle.hpDisplay / e.battle.maxHp) * 100 + '%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <button @click="basicAttack" :disabled="turn !== 'player'">
        Ataque Básico
      </button>

      <button
        v-for="s in activePlayer?.skills || []"
        :key="s"
        @click="useSkill(s)"
        :disabled="turn !== 'player'"
      >
        {{ SKILLS[s].name }}
      </button>

      <button
        @click="ultimateAttack"
        :disabled="turn !== 'player' || activePlayer?.battle.ultimateUsed"
      >
        💥 Ultimate
      </button>
    </div>

    <ul class="log">
      <li v-for="(m, i) in log" :key="i">{{ m }}</li>
    </ul>
  </div>

  <div v-else class="battle">
    <h2>⚠️ Selecione seu time antes de iniciar a batalha</h2>
  </div>
</template>

<style scoped>
.battle {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #020617;
  color: #e5e7eb;
  border-radius: 12px;
}

.arena {
  display: flex;
  gap: 20px;
}

.side {
  width: 50%;
}

.card {
  background: #1e293b;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: center;
}

.card img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.card.active {
  border: 2px solid #f97316;
}

.enemy {
  border: 2px solid #ef4444;
}

.bar {
  height: 8px;
  background: #0f172a;
  border-radius: 999px;
  overflow: hidden;
  margin: 6px 0;
}

.bar .fill {
  height: 100%;
  transition: width 0.3s ease;
}

.bar.hp .fill {
  background: linear-gradient(90deg, #ef4444, #f97316);
}

.bar.chakra .fill {
  background: linear-gradient(90deg, #3b82f6, #06b6d4);
}

.actions {
  margin: 10px 0;
}

.log {
  margin-top: 10px;
  font-size: 14px;
}
</style>
