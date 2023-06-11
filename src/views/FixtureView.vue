<template>
  <div class="flex justify-center">
    <div class="w-3/4">
      <div class="text-2xl mb-2 mt-5">Generated Fixtures</div>
      <div class="flex flex-wrap">
        <div class="w-1/4 p-2"
             v-for="(fixtures, week) in leagueStore.grouppedFixtures">
            <h3 class="p-3 text-white bg-gray-700">Week {{week}}</h3>
            <ul>
              <li class="p-2 border-b border-gray-300"
                  v-for="fixture in fixtures">
                {{fixture.home_team.name}} - {{fixture.away_team.name}}
              </li>
            </ul>
        </div>
      </div>

      <div class="p-2">
        <Button text="Start Simulation"
                textColor="white"
                backgroundColor="blue-700"
                @click="startSimulation" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useLeagueStore} from "../stores/league";
  import router from "../router";
  import Button from "../components/Button.vue"

  const leagueStore = useLeagueStore()

  const startSimulation = () => {
    router.push({path: '/simulate'})
  }
</script>

<style scoped>

</style>