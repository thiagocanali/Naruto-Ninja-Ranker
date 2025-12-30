<script setup>
import { useNinjaStore } from "@/store/ninjaStore"
import { simulateBattle } from "@/game/battle"

const store = useNinjaStore()

function fight() {
  const teamPower = store.team.reduce(
    (sum, ninja) => sum + store.ninjaPower(ninja),
    0
  )

  const enemyPower = 800
  const win = simulateBattle(teamPower, enemyPower)

  if (win) {
    store.team.forEach(n => store.gainXP(n.id, 200))
    alert("Vitória! XP ganho!")
  } else {
    alert("Derrota...")
  }
}
</script>

<template>
  <h1>Batalha</h1>

  <p>Equipe:</p>
  <ul>
    <li v-for="n in store.team" :key="n.id">{{ n.name }}</li>
  </ul>

  <button @click="fight" :disabled="store.team.length === 0">
    Iniciar Batalha
  </button>
</template>
