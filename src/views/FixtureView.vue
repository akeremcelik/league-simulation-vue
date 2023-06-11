<template>
  <div class="flex justify-center">
    <div class="w-3/4">
      <div class="text-2xl mb-2 mt-5">Generated Fixtures</div>
      <div class="flex flex-wrap">
        <div class="w-1/4 p-2"
             v-for="(fixtures, week) in leagueStore.grouppedFixtures">
            <WeeklyFixture :week="week" :fixtures="fixtures" />
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
  import WeeklyFixture from "../components/WeeklyFixture.vue"

  const leagueStore = useLeagueStore()

  const startSimulation = () => {
    router.push({path: '/simulate'})
  }
</script>

<style scoped>

</style>