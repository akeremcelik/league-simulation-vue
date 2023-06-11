<template>
  <div class="flex justify-center">
    <div class="w-1/2">
      <div class="text-2xl mb-2 mt-5">Tournament Teams</div>
      <div class="p-2 font-bold text-white bg-gray-700">Team Name</div>
      <div>
        <ul>
          <li class="p-2 border-b border-gray-300"
              v-for="team in teams">
            {{ team.name }}
          </li>
        </ul>
      </div>
      <Button text="Generate Fixtures"
              textColor="white"
              backgroundColor="blue-700"
              @click="genereateFixtures" />
    </div>
  </div>
</template>

<script setup>
  import {nextTick, ref} from "vue";
  import {useLeagueStore} from "../stores/league";
  import router from "../router";
  import Button from "../components/Button.vue"

  const teams = ref([])
  const leagueStore = useLeagueStore()

  fetch(`${import.meta.env.VITE_API_URL}/teams`)
      .then((response) => response.json())
      .then((data) => teams.value = data)

  const genereateFixtures = () => {
    fetch(`${import.meta.env.VITE_API_URL}/generate-fixtures`, {
      method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          leagueStore.setId(data[0].league_id)
          leagueStore.setFixtures(data)

          nextTick(() => router.push({path: '/fixtures'}))
        })
  }
</script>

<style scoped>

</style>