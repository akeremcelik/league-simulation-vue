<template>
  <div class="text-2xl mb-5 mt-5 text-center">Simulation</div>
  <div class="flex">
    <div class="w-1/2 p-2">
      <table class="w-full">
        <tr class="text-white bg-gray-700">
          <th class="p-2">Team Name</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>P</th>
        </tr>
        <tr v-for="teamStats in scoreboard">
          <td style="text-align: left!important;">{{teamStats.team.name}}</td>
          <td>{{teamStats.statistics.played}}</td>
          <td>{{teamStats.statistics.won}}</td>
          <td>{{teamStats.statistics.drawn}}</td>
          <td>{{teamStats.statistics.lost}}</td>
          <td>{{teamStats.statistics.goals_for}}</td>
          <td>{{teamStats.statistics.goals_against}}</td>
          <td>{{teamStats.statistics.goal_difference}}</td>
          <td>{{teamStats.statistics.points}}</td>
        </tr>
      </table>
    </div>
    <div class="w-1/4 p-2">
      <h3 class="p-2 text-white bg-gray-700">Week {{week}}</h3>
      <ul>
        <li class="border-b border-gray-300"
            style="padding: 15px;"
            v-for="fixture in leagueStore.grouppedFixtures[week]">
          {{fixture.home_team.name}} - {{fixture.away_team.name}}
        </li>
      </ul>
    </div>
  </div>
  <div class="flex justify-evenly">
    <button type="button"
            class="mt-3 text-white bg-blue-700 p-2 rounded-lg"
            @click="playAllWeeks">
      Play All Weeks
    </button>
    <button type="button"
            class="mt-3 text-white bg-blue-700 p-2 rounded-lg"
            @click="playNextWeek">
      Play Next Week
    </button>
    <button type="button"
            class="mt-3 text-white bg-red-400 p-2 rounded-lg"
            @click="resetData">
      Reset Data
    </button>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {useLeagueStore} from "../stores/league";
  import router from "../router";

  const week = ref(1)
  const scoreboard = ref([])
  const leagueStore = useLeagueStore()

  const getScoreboard = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/scoreboard`)
        .then((response) => response.json())
        .then((data) => {
          scoreboard.value = data
        })
  }

  const playNextWeek = () => {
    fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/play-next-week`, {
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
          scoreboard.value = data
          week.value++
        })
  }

  const playAllWeeks = () => {
    fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/play-all-weeks`, {
      method: 'POST'
    })
        .then((response) => response.json())
        .then((data) => {
          scoreboard.value = data
          week.value = ''
        })
  }

  const resetData = () => {
    leagueStore.resetData()
    router.push({path: '/'})
  }

  getScoreboard()
</script>

<style scoped>
  td {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid rgb(209, 213, 219);
  }
</style>