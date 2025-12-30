<script setup>
import { EVENTS } from "@/game/events"
import { useNinjaStore } from "@/store/ninjaStore"

const store = useNinjaStore()

function trigger(event) {
  store.team.forEach(n => store.gainXP(n.id, event.rewardXP))
  alert(`${event.title} concluído!`)
}
</script>

<template>
  <h1>Eventos</h1>

  <div v-for="event in EVENTS" :key="event.id">
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <button @click="trigger(event)">Participar</button>
  </div>
</template>
