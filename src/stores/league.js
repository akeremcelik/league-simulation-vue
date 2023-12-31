import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import _ from "lodash";

export const useLeagueStore = defineStore('league', () => {
    const id = ref(null)
    const fixtures = ref([])
    const maxWeek = ref(6)

    const grouppedFixtures = computed(() => _.groupBy(fixtures.value, 'week'))

    function setId (incomingId) {
        id.value = incomingId
    }

    function setFixtures (incomingFixtures) {
        fixtures.value = incomingFixtures
    }

    function resetData () {
        id.value = null
        fixtures.value = []
    }

    return { id, fixtures, maxWeek, grouppedFixtures, setId, setFixtures, resetData }
})
