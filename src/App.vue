<template>
  <nav class="main-nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/ranking">Ranking</RouterLink>
    <RouterLink to="/missions">Missões</RouterLink>
    <RouterLink to="/battle">Batalha</RouterLink>
    <RouterLink to="/world">Mundo</RouterLink>
    <RouterLink to="/boss">Chefões</RouterLink>
    <RouterLink to="/team">Montar Time</RouterLink> <!-- Novo -->
  </nav>
  <RouterView />
</template>

<script setup></script>

<style>
body {
  background: #020617;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

.main-nav {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #111827;
}

a {
  color: #f97316;
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  text-decoration: underline;
}
</style>
