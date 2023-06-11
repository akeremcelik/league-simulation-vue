<template>
  <div class="flex justify-center">
    <div class="w-3/4">
      <div class="text-2xl mb-2 mt-5">Generated Fixtures</div>
      <div class="flex flex-wrap">
        <div class="w-1/4 p-2"
             v-for="(fixtures, week) in grouppedFixtures">
            <h3 class="p-3 text-white bg-black">Week {{week}}</h3>
            <ul>
              <li class="p-2 border-b border-gray-700"
                  v-for="fixture in fixtures">
                {{fixture.home_team.name}} - {{fixture.away_team.name}}
              </li>
            </ul>
        </div>
      </div>

      <div class="p-2">
        <button type="button"
                class="mt-3 text-white bg-blue-700 p-2 rounded-lg"
                @click="startSimulation">
          Start Simulation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {useLeagueStore} from "../stores/league";
  import {ref} from "vue";
  import _ from 'lodash';
  import router from "../router";

  const leagueStore = useLeagueStore()
  const grouppedFixtures = ref(_.groupBy(leagueStore.fixtures, 'week'))

  const startSimulation = () => {
    router.push({path: '/simulate'})
  }
</script>

<style scoped>

</style>