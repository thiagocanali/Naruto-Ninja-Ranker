<script setup>
import { ref, computed, onMounted } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { SKILLS } from "@/game/skills";

const store = useNinjaStore();
const selectedId = ref("");

// garante que os ninjas existam ao abrir a tela
onMounted(() => {
  if (store.ninjas.length === 0) {
    store.fetchNinjas();
  }
});

const selectedNinja = computed(() =>
  store.ninjas.find((n) => n.id === selectedId.value)
);

function buySkill(skill) {
  if (!selectedNinja.value) return;

  const ninja = selectedNinja.value;

  if (ninja.skillPoints < skill.cost) return;
  if (ninja.skills.some((s) => s.id === skill.id)) return;

  ninja.skillPoints -= skill.cost;
  ninja.skills.push(skill);

  Object.entries(skill.bonus).forEach(([stat, value]) => {
    ninja.stats[stat] += value;
  });
}
</script>

<template>
  <div class="skills">
    <h1>🧠 Habilidades Ninja</h1>

    <!-- SELECT -->
    <select
      v-model="selectedId"
      :disabled="store.loading || store.ninjas.length === 0"
    >
      <option disabled value="">
        {{
          store.loading
            ? "Carregando ninjas..."
            : store.ninjas.length === 0
            ? "Nenhum ninja disponível"
            : "Escolha um ninja"
        }}
      </option>

      <option
        v-for="ninja in store.ninjas"
        :key="ninja.id"
        :value="ninja.id"
      >
        {{ ninja.name }} — Lv {{ ninja.level }} ({{ ninja.rank }})
      </option>
    </select>

    <!-- PAINEL DO NINJA -->
    <div v-if="selectedNinja" class="panel">
      <h2>{{ selectedNinja.name }}</h2>

      <div class="info">
        <span>Rank: <strong>{{ selectedNinja.rank }}</strong></span>
        <span>Level: {{ selectedNinja.level }}</span>
        <span>XP: {{ selectedNinja.xp }}</span>
        <span>⭐ Pontos: {{ selectedNinja.skillPoints }}</span>
      </div>

      <!-- STATS -->
      <h3>📊 Status</h3>
      <ul class="stats">
        <li v-for="(value, key) in selectedNinja.stats" :key="key">
          {{ key }}: <strong>{{ value }}</strong>
        </li>
      </ul>

      <!-- SKILLS -->
      <h3>✨ Habilidades</h3>

      <div class="skill-list">
        <div
          v-for="skill in SKILLS"
          :key="skill.id"
          class="skill-card"
          :class="{
            owned: selectedNinja.skills.some((s) => s.id === skill.id),
          }"
        >
          <h4>{{ skill.name }}</h4>
          <p>{{ skill.description }}</p>

          <small>
            Custo: {{ skill.cost }} ponto(s)
          </small>

          <button
            @click="buySkill(skill)"
            :disabled="
              selectedNinja.skillPoints < skill.cost ||
              selectedNinja.skills.some((s) => s.id === skill.id)
            "
          >
            {{
              selectedNinja.skills.some((s) => s.id === skill.id)
                ? "Aprendida"
                : "Aprender"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills {
  max-width: 960px;
  margin: auto;
  padding: 24px;
  color: #e5e7eb;
}

h1 {
  margin-bottom: 16px;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  background: #020617;
  color: #e5e7eb;
  border: 1px solid #334155;
}

.panel {
  background: #020617;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.skill-card {
  background: #0f172a;
  padding: 16px;
  border-radius: 14px;
  transition: transform 0.25s ease;
}

.skill-card:hover {
  transform: translateY(-4px);
}

.skill-card.owned {
  opacity: 0.55;
}

.skill-card h4 {
  margin-bottom: 6px;
}

button {
  margin-top: 10px;
  width: 100%;
  background: #f97316;
  border: none;
  padding: 8px;
  border-radius: 10px;
  font-weight: bold;
  color: #020617;
  cursor: pointer;
}

button:disabled {
  background: #475569;
  cursor: not-allowed;
}
</style>
