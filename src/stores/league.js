import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLeagueStore = defineStore('league', () => {
    const id = ref()
    const fixtures = ref([])

    function setId (incomingId) {
        id.value = incomingId
    }

    function setFixtures (incomingFixtures) {
        fixtures.value = incomingFixtures
    }

    return { id, fixtures, setId, setFixtures }
})
