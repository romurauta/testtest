<template>
  <section class="text-white justify-center flex flex-col items-center bg-coal p-6">
    <NuxtLink class="text-2xl md:mt-20" to="/">Etusivu</NuxtLink>
    <div class="w-full md:w-1/3 mt-12 md:mb-48 mb-20">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl md:text-2xl">Valitse:</h2>
        <div class="flex gap-2">
          <button @click="toggleMode" class="px-4 py-2 border border-pig text-cta bg-coal hover:bg-lightSmoke">
            {{ mode === 'bo1' ? 'Best of 1' : 'Best of 3' }}
          </button>
          <button class="px-4 py-2 border border-pig hover:bg-lightSmoke text-cta bg-coal" @click="resetAll">Tyhjennä</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="flex-1">
          <label class="block text-sm text-cta mb-1">Joukkue A</label>
          <input v-model="teamA" class="bg-smoke border border-pig px-3 py-1 w-full text-white placeholder-gray-400 focus:outline-none" />
          <p class="text-sm text-gray-400 mt-2">
            Bannit:
            <span v-for="m in bans.A" :key="m" class="bg-lightSmoke text-cta px-2 py-1 rounded mr-1">{{ m }}</span>
          </p>
        </div>

        <div class="flex-1">
          <label class="block text-sm text-cta mb-1">Joukkue B</label>
          <input v-model="teamB" class="bg-smoke border border-pig px-3 py-1 w-full text-white placeholder-gray-400 focus:outline-none" />
          <p class="text-sm text-gray-400 mt-2">
            Bannit:
            <span v-for="m in bans.B" :key="m" class="bg-lightSmoke text-cta px-2 py-1 rounded mr-1">{{ m }}</span>
          </p>
        </div>
      </div>

      <div class="mb-4 text-center">
        <p v-if="!isDone" class="text-lg font-semibold">
          Joukkueen <span class="text-cta">{{ currentTeamName }}</span> {{ currentActionText }}
        </p>
        <p v-else class="text-lg text-green-400 font-semibold">Kartat valittu</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="map in maps"
          :key="map"
          class="p-4 border border-pig bg-smoke rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
          :class="{
            'opacity-30 line-through cursor-not-allowed': isBanned(map),
            'bg-green-900 border-green-600': pickedMaps.includes(map),
          }"
          @click="onMapClick(map)"
        >
          <h3 class="font-semibold text-cta">{{ map }}</h3>
          <p class="text-xs text-gray-400 mt-1">
            <span v-if="isBanned(map)">BANNED</span>
            <span v-else-if="pickedMaps.includes(map)" class="text-green-500">PICKED</span>
            <span v-else>AVAILABLE</span>
          </p>
        </div>
      </div>

      <div class="flex justify-center gap-3 mt-6">
        <button @click="banRandom()" :disabled="isDone" class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke disabled:opacity-50">Random</button>
        <button @click="undo()" :disabled="history.length === 0" class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke disabled:opacity-50">
          Peru
        </button>
        <button @click="resetAll" class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke">Nollaa</button>
      </div>

      <div v-if="isDone" class="border border-pig bg-smoke rounded-lg p-4 mt-6 text-center">
        <h3 class="text-cta text-lg mb-2">Tulos</h3>
        <div v-if="mode === 'bo1'">
          <p>
            Pelattava kartta: <strong>{{ pickedMaps[0] }}</strong>
          </p>
        </div>
        <div v-else>
          <p><strong>Kartta 1:</strong> {{ pickedMaps[0] }}</p>
          <p><strong>Kartta 2:</strong> {{ pickedMaps[1] }}</p>
          <p><strong>Decider:</strong> {{ pickedMaps[2] }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const maps = ['Train', 'Dust2', 'Mirage', 'Nuke', 'Ancient', 'Inferno', 'Overpass']

const teamA = ref('')
const teamB = ref('')
const mode = ref('bo1') // 'bo1' or 'bo3'
const bans = ref({ A: [], B: [] })
const pickedMaps = ref([])
const history = ref([])
const turnIndex = ref(0)

// --- Veto järjestys ---
const roundsBo1 = ['B_ban', 'A_ban', 'B_ban', 'A_ban', 'B_ban', 'A_ban']
const roundsBo3 = ['B_ban', 'A_ban', 'B_pick', 'A_pick', 'B_ban', 'A_ban']

const currentRounds = computed(() => (mode.value === 'bo1' ? roundsBo1 : roundsBo3))
const currentRound = computed(() => currentRounds.value[turnIndex.value] || null)
const currentAction = computed(() => (currentRound.value?.includes('pick') ? 'pick' : 'ban'))
const currentTeam = computed(() => (currentRound.value?.startsWith('A') ? 'A' : 'B'))
const currentTeamName = computed(() => (currentTeam.value === 'A' ? teamA.value || 'Team A' : teamB.value || 'Team B'))
const isDone = computed(() => (mode.value === 'bo1' ? pickedMaps.value.length === 1 : pickedMaps.value.length === 3))

const currentActionText = computed(() => (currentAction.value === 'ban' ? 'bannaa kartan' : 'valitsee kartan'))

function isBanned(map) {
  return bans.value.A.includes(map) || bans.value.B.includes(map)
}
function remainingMaps() {
  return maps.filter((m) => !isBanned(m) && !pickedMaps.value.includes(m))
}

function onMapClick(map) {
  if (isDone.value || isBanned(map) || pickedMaps.value.includes(map)) return

  if (currentAction.value === 'ban') {
    bans.value[currentTeam.value].push(map)
    history.value.push({ team: currentTeam.value, map, type: 'ban' })
  } else if (currentAction.value === 'pick') {
    pickedMaps.value.push(map)
    history.value.push({ team: currentTeam.value, map, type: 'pick' })
  }

  stepTurn()
}

function stepTurn() {
  turnIndex.value++
  if (mode.value === 'bo1' && remainingMaps().length === 1) {
    pickedMaps.value = [remainingMaps()[0]]
  } else if (mode.value === 'bo3' && turnIndex.value >= currentRounds.value.length) {
    const remaining = remainingMaps()
    if (remaining.length === 1) pickedMaps.value.push(remaining[0])
  }
}

function banRandom() {
  const avail = remainingMaps()
  if (!avail.length || isDone.value) return
  const rand = avail[Math.floor(Math.random() * avail.length)]
  onMapClick(rand)
}

function undo() {
  const last = history.value.pop()
  if (!last) return
  if (last.type === 'ban') {
    const list = bans.value[last.team]
    const idx = list.indexOf(last.map)
    if (idx !== -1) list.splice(idx, 1)
  } else if (last.type === 'pick') {
    const idx = pickedMaps.value.indexOf(last.map)
    if (idx !== -1) pickedMaps.value.splice(idx, 1)
  }
  turnIndex.value = Math.max(0, turnIndex.value - 1)
}

function resetAll() {
  bans.value = { A: [], B: [] }
  pickedMaps.value = []
  turnIndex.value = 0
  history.value = []
}

function toggleMode() {
  mode.value = mode.value === 'bo1' ? 'bo3' : 'bo1'
  resetAll()
}
</script>
