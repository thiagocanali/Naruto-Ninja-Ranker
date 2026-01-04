<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import HUD from "@/components/HUD.vue";

const route = useRoute();

/**
 * HUD aparece apenas nas telas de jogo
 * (não aparece no Home nem no TeamBuilder)
 */
const showHUD = computed(() => {
  return !["/", "/team"].includes(route.path);
});
</script>

<template>
  <!-- NAVBAR PRINCIPAL -->
  <nav class="main-nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/ranking">Ranking</RouterLink>
    <RouterLink to="/missions">Missões</RouterLink>
    <RouterLink to="/battle">Batalha</RouterLink>
    <RouterLink to="/world">Mundo</RouterLink>
    <RouterLink to="/boss">Chefões</RouterLink>
    <RouterLink to="/skills">Skills</RouterLink>
    <RouterLink to="/team">Montar Time</RouterLink>
  </nav>

  <!-- HUD FIXO -->
  <HUD v-if="showHUD" />

  <!-- CONTEÚDO DAS ROTAS -->
  <RouterView />
</template>

<style>
body {
  background: #020617;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

/* NAV */
.main-nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #111827;
  position: sticky;
  top: 0;
  z-index: 200;
}

/* LINKS */
a {
  color: #f97316;
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  text-decoration: underline;
}

/* COMPENSAR HUD FIXO */
.router-view {
  padding-top: 70px;
}
</style>
