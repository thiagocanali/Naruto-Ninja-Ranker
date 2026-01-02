<script setup>
import { computed, onMounted, ref } from "vue";
import { useNinjaStore } from "@/store/ninjaStore";
import { SKILLS } from "@/game/skills";

const store = useNinjaStore();

const selectedNinjaId = ref("");
const selectedSkillId = ref("");

/* =====================
   LOAD GARANTIDO
===================== */
onMounted(async () => {
  if (store.ninjas.length === 0) {
    await store.fetchNinjas();
  }
});

/* =====================
   COMPUTEDS
===================== */
const selectedNinja = computed(() =>
  store.ninjas.find(n => n.id === Number(selectedNinjaId.value))
);

const selectedSkill = computed(() =>
  SKILLS.find(s => s.id === selectedSkillId.value)
);

const canLearn = computed(() => {
  if (!selectedNinja.value || !selectedSkill.value) return false;

  return (
    selectedNinja.value.skillPoints >= selectedSkill.value.cost &&
    !selectedNinja.value.skills.some(s => s.id === selectedSkill.value.id)
  );
});

/* =====================
   ACTION
===================== */
function learnSkill() {
  if (!canLearn.value) return;

  selectedNinja.value.skills.push(selectedSkill.value);

  Object.entries(selectedSkill.value.bonus).forEach(([key, value]) => {
    selectedNinja.value.stats[key] += value;
  });

  selectedNinja.value.skillPoints -= selectedSkill.value.cost;

  alert(
    `✅ ${selectedNinja.value.name} aprendeu ${selectedSkill.value.name}!`
  );

  selectedSkillId.value = "";
}
</script>

<template>
  <div class="skills-container">
    <h1>🌀 Árvores de Habilidades</h1>

    <div v-if="store.loading">Carregando ninjas...</div>

    <div v-else class="panel">
      <!-- SELECT NINJA -->
      <div class="box">
        <h3>Ninja</h3>
        <select v-model="selectedNinjaId">
          <option disabled value="">Selecione um ninja</option>
          <option
            v-for="ninja in store.ninjas"
            :key="ninja.id"
            :value="ninja.id"
          >
            {{ ninja.name }} (SP: {{ ninja.skillPoints }})
          </option>
        </select>
      </div>

      <!-- SELECT SKILL -->
      <div class="box" v-if="selectedNinja">
        <h3>Habilidade</h3>
        <select v-model="selectedSkillId">
          <option disabled value="">Selecione uma skill</option>
          <option
            v-for="skill in SKILLS"
            :key="skill.id"
            :value="skill.id"
            :disabled="
              selectedNinja.skills.some(s => s.id === skill.id)
            "
          >
            {{ skill.name }} ({{ skill.cost }} SP)
          </option>
        </select>

        <p v-if="selectedSkill" class="desc">
          {{ selectedSkill.description }}
        </p>

        <button @click="learnSkill" :disabled="!canLearn">
          Aprender Skill
        </button>
      </div>

      <!-- STATS -->
      <div class="box" v-if="selectedNinja">
        <h3>Status</h3>
        <ul>
          <li v-for="(value, key) in selectedNinja.stats" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #111827;
  border-radius: 12px;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  color: #f97316;
  text-align: center;
  margin-bottom: 30px;
}

.panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.box {
  background: #1e293b;
  padding: 15px;
  border-radius: 10px;
}

select {
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border-radius: 6px;
}

button {
  margin-top: 10px;
  width: 100%;
  background: #f97316;
  border: none;
  padding: 8px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  background: #64748b;
  cursor: not-allowed;
}

.desc {
  font-size: 14px;
  margin-top: 8px;
  color: #cbd5f5;
}

ul {
  padding-left: 16px;
}
</style>
