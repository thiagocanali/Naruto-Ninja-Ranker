<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Ninja</th>
        <th>Clã</th>
        <th>Poder</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(n, i) in ranking" :key="n.id">
        <td>{{ i + 1 }}</td>
        <td>{{ n.name }}</td>
        <td>{{ n.clan }}</td>
        <td class="power">{{ n.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ ranking: Array });
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  color: #f97316;
  border-bottom: 1px solid #334155;
  padding: 8px;
}
td {
  padding: 8px;
  border-bottom: 1px solid #1e293b;
}
.power {
  font-weight: bold;
  color: #fb923c;
}
</style>
