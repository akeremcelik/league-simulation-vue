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
      <div class="flex flex-col">
        <div v-if="showAllResults">
          <div v-for="week in leagueStore.maxWeek">
            <WeeklyFixture :week="week" :fixtures="leagueStore.grouppedFixtures[week]" />
          </div>
        </div>
        <div v-else>
          <div v-if="week-1 > 0">
            <WeeklyFixture :week="week-1" :fixtures="leagueStore.grouppedFixtures[week-1]" />
          </div>
          <div v-if="week <= leagueStore.maxWeek">
            <WeeklyFixture :week="week" :fixtures="leagueStore.grouppedFixtures[week]" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/4 p-2">
      <table class="w-full">
        <tr class="text-white bg-gray-700">
          <th class="p-2">Championship Predictions</th>
          <th>%</th>
        </tr>
        <tr v-for="teamStats in (scoreboardBeforeFinal.length ? scoreboardBeforeFinal : scoreboard)">
          <td style="text-align: left!important;">{{teamStats.team.name}}</td>
          <td>{{teamStats.prediction}}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="flex justify-evenly mt-3 mb-3">
    <Button text="Play All Weeks"
            textColor="white"
            backgroundColor="blue-700"
            @click="playAllWeeks" />
    <Button text="Play Next Week"
            textColor="white"
            backgroundColor="blue-700"
            @click="playNextWeek" />
    <Button text="Show All Results"
            textColor="white"
            :backgroundColor="week === {...leagueStore}.maxWeek+1 ? 'green-700' : 'gray-700'"
            :disabled="week !== {...leagueStore}.maxWeek+1"
            @click="showAllResults = !showAllResults" />
    <Button text="Reset Data"
            textColor="white"
            backgroundColor="red-400"
            @click="resetData" />
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {useLeagueStore} from "../stores/league";
  import router from "../router";
  import Button from "../components/Button.vue"
  import WeeklyFixture from "../components/WeeklyFixture.vue"

  const week = ref(1)
  const scoreboard = ref([])
  const scoreboardBeforeFinal = ref([])
  const showAllResults = ref(false)
  const leagueStore = useLeagueStore()

  const getScoreboard = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/scoreboard`)
        .then((response) => response.json())
        .then((data) => {
          scoreboard.value = data
        })
  }

  const playNextWeek = () => {
    if (week.value <= leagueStore.maxWeek) {
      fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/play-next-week`, {
        method: 'POST'
      })
          .then((response) => response.json())
          .then((data) => {
            if (week.value === leagueStore.maxWeek)
              scoreboardBeforeFinal.value = scoreboard.value

            data['previous_week_fixtures'].map((updatedFixture) => {
              const fixtureIndex = leagueStore.fixtures.findIndex((fixture) => fixture.id === updatedFixture.id)
              leagueStore.fixtures[fixtureIndex] = {...leagueStore.fixtures[fixtureIndex], home_team_score: updatedFixture.home_team_score, away_team_score: updatedFixture.away_team_score}
            })

            scoreboard.value = data['data']
            week.value++
          })
    }
  }

  const playAllWeeks = () => {
    if (week.value <= leagueStore.maxWeek) {
      fetch(`${import.meta.env.VITE_API_URL}/leagues/${leagueStore.id}/play-all-weeks`, {
        method: 'POST'
      })
          .then((response) => response.json())
          .then((data) => {
            data['previous_week_fixtures'].map((updatedFixture) => {
              const fixtureIndex = leagueStore.fixtures.findIndex((fixture) => fixture.id === updatedFixture.id)
              leagueStore.fixtures[fixtureIndex] = {...leagueStore.fixtures[fixtureIndex], home_team_score: updatedFixture.home_team_score, away_team_score: updatedFixture.away_team_score}
            })

            scoreboard.value = data['data']
            week.value = {...leagueStore}.maxWeek+1
          })
    }
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