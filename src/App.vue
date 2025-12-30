<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/ranking">Ranking</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup></script>

<style>
body {
  background: #020617;
  color: #e5e7eb;
  font-family: Arial, Helvetica, sans-serif;
}
nav {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
a {
  color: #f97316;
}
</style>
