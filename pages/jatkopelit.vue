<template>
  <section class="text-white px-8 py-6 flex flex-col items-center bg-coal">
    <div>
      <nuxt-link to="/">Etusivulle</nuxt-link>
    </div>

    <div class="w-full md:w-4/5 lg:w-3/5">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl md:text-2xl text-cta">Jatkopelit</h2>
        <button class="px-4 py-2 border border-pig hover:bg-lightSmoke text-cta bg-coal ml-2" @click="resetAll">Tyhjennä kaikki</button>
      </div>

      <!-- PUOLIVÄLIERÄT -->
      <div class="mb-8">
        <h3 class="text-lg md:text-xl mb-3 text-cta">Puolivälierät</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(match, index) in quarterFinals" :key="'qf-' + index" class="border border-pig p-4 bg-coal">
            <h4 class="font-semibold mb-3">Puolivälierä {{ index + 1 }}</h4>
            <div class="flex flex-col gap-3">
              <input
                v-model="match.team1"
                @change="saveMatch('quarterfinal', index, match)"
                placeholder="Joukkue 1"
                class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="match.team2"
                @change="saveMatch('quarterfinal', index, match)"
                placeholder="Joukkue 2"
                class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              />
              <div class="flex gap-2">
                <input
                  v-model.number="match.score1"
                  @change="saveMatch('quarterfinal', index, match)"
                  type="number"
                  placeholder="Tulos 1"
                  class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
                />
                <input
                  v-model.number="match.score2"
                  @change="saveMatch('quarterfinal', index, match)"
                  type="number"
                  placeholder="Tulos 2"
                  class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- VÄLIERÄT -->
      <div class="mb-8">
        <h3 class="text-lg md:text-xl mb-3 text-cta">Välierät</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(match, index) in semiFinals" :key="'sf-' + index" class="border border-pig p-4 bg-coal">
            <h4 class="font-semibold mb-3">Välierä {{ index + 1 }}</h4>
            <div class="flex flex-col gap-3">
              <input
                v-model="match.team1"
                @change="saveMatch('semifinal', index, match)"
                placeholder="Joukkue 1"
                class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model="match.team2"
                @change="saveMatch('semifinal', index, match)"
                placeholder="Joukkue 2"
                class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              />
              <div class="flex gap-2">
                <input
                  v-model.number="match.score1"
                  @change="saveMatch('semifinal', index, match)"
                  type="number"
                  placeholder="Tulos 1"
                  class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
                />
                <input
                  v-model.number="match.score2"
                  @change="saveMatch('semifinal', index, match)"
                  type="number"
                  placeholder="Tulos 2"
                  class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FINAALI -->
      <div class="mb-8">
        <h3 class="text-lg md:text-xl mb-3 text-cta">Finaali</h3>
        <div class="border border-pig p-4 bg-coal">
          <div class="flex flex-col gap-3">
            <input
              v-model="finalMatch.team1"
              @change="saveMatch('final', 0, finalMatch)"
              placeholder="Joukkue 1"
              class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              v-model="finalMatch.team2"
              @change="saveMatch('final', 0, finalMatch)"
              placeholder="Joukkue 2"
              class="bg-smoke border border-pig px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
            />
            <div class="flex gap-2">
              <input
                v-model.number="finalMatch.score1"
                @change="saveMatch('final', 0, finalMatch)"
                type="number"
                placeholder="Tulos 1"
                class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
              />
              <input
                v-model.number="finalMatch.score2"
                @change="saveMatch('final', 0, finalMatch)"
                type="number"
                placeholder="Tulos 2"
                class="bg-smoke border border-pig px-3 py-1 w-1/2 text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 🔹 TULOKSET ALAS -->
      <div class="w-full mt-10 border-t border-pig pt-6">
        <h3 class="text-lg md:text-xl mb-3 text-cta">Tallennetut tulokset</h3>

        <div v-if="allMatches.length > 0" class="space-y-3">
          <div v-for="(match, index) in allMatches" :key="'result-' + index" class="border border-pig p-4 bg-smoke text-white">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-semibold">{{ getRoundName(index) }}</p>
                <p>{{ match.team1 || '–' }} vs {{ match.team2 || '–' }}</p>
              </div>
              <div class="text-cta text-lg font-bold">
                <span v-if="match.score1 !== null && match.score2 !== null"> {{ match.score1 }} - {{ match.score2 }} </span>
                <span v-else>Ei tulosta</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-gray-400">Ei tallennettuja tuloksia vielä.</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useFetch } from '#app'

const quarterFinals = reactive([
  { id: null, team1: '', team2: '', score1: null, score2: null },
  { id: null, team1: '', team2: '', score1: null, score2: null },
])

const semiFinals = reactive([
  { id: null, team1: '', team2: '', score1: null, score2: null },
  { id: null, team1: '', team2: '', score1: null, score2: null },
])

const finalMatch = reactive({
  id: null,
  team1: '',
  team2: '',
  score1: null,
  score2: null,
})

const allMatches = computed(() => [...quarterFinals, ...semiFinals, finalMatch])

// 🔹 Hae ottelut Firestoresta
onMounted(async () => {
  try {
    const data = await $fetch('/api/playoffs') // ✅ Käytä $fetch, ei useFetch

    if (Array.isArray(data)) {
      data.forEach((m) => {
        const num = Number(m.matchNumber) || 1

        if (m.round === 'quarterfinal' && quarterFinals[num - 1]) {
          Object.assign(quarterFinals[num - 1], m)
        }

        if (m.round === 'semifinal' && semiFinals[num - 1]) {
          Object.assign(semiFinals[num - 1], m)
        }

        if (m.round === 'final') {
          Object.assign(finalMatch, m)
        }
      })
    }

    console.log('🔥 Lataus valmis:', data)
  } catch (err) {
    console.error('❌ Virhe playoffien haussa:', err)
  }
})

// 🔹 ✅ KORJATTU: käytä $fetch, ei useFetch
async function saveMatch(round, matchNumber, match) {
  try {
    const result = await $fetch('/api/playoffs', {
      method: 'POST',
      body: {
        id: match.id || null,
        round,
        matchNumber: matchNumber + 1,
        team1: match.team1,
        team2: match.team2,
        score1: match.score1,
        score2: match.score2,
      },
    })

    if (result?.id) {
      match.id = result.id
    }

    console.log('✅ Tallennettu:', result)
  } catch (error) {
    console.error('❌ Virhe tallennuksessa:', error)
  }
}

function resetAll() {
  quarterFinals.forEach((m) => Object.assign(m, { team1: '', team2: '', score1: null, score2: null }))
  semiFinals.forEach((m) => Object.assign(m, { team1: '', team2: '', score1: null, score2: null }))
  Object.assign(finalMatch, { team1: '', team2: '', score1: null, score2: null })
}

function getRoundName(index) {
  if (index < quarterFinals.length) return `Puolivälierä ${index + 1}`
  else if (index < quarterFinals.length + semiFinals.length) return `Välierä ${index - quarterFinals.length + 1}`
  else return 'Finaali'
}
</script>

<style scoped>
input {
  outline: none;
}
</style>
