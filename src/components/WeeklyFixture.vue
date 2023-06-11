<template>
  <h3 class="p-3 text-white bg-gray-700">Week {{week}}</h3>
  <ul>
    <li class="p-2 border-b border-gray-300"
        v-for="fixture in fixtures">
      {{fixture.home_team.name}} <span class="font-bold">{{fixture.home_team_score}} - {{fixture.away_team_score}}</span> {{fixture.away_team.name}}
    </li>
  </ul>
</template>

<script setup>
  const props = defineProps(['week', 'fixtures'])
</script>

<style scoped>

</style>