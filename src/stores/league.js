import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLeagueStore = defineStore('league', () => {
    const id = ref(null)
    const fixtures = ref([])
    const grouppedFixtures = ref([])

    function setId (incomingId) {
        id.value = incomingId
    }

    function setFixtures (incomingFixtures) {
        fixtures.value = incomingFixtures
    }

    function setGrouppedFixtures (incomingGrouppedFixtures) {
        grouppedFixtures.value = incomingGrouppedFixtures
    }

    function resetData () {
        id.value = null
        fixtures.value = []
        grouppedFixtures.value = []
    }

    return { id, fixtures, grouppedFixtures, setId, setFixtures, setGrouppedFixtures, resetData }
})
