<template>
  <div class="min-h-screen bg-[#1c1c1c] text-white p-8">
    <div class="container">
      <NuxtLink class="text-3xl" to="/">Etusivu</NuxtLink>
      <h1 class="text-3xl font-bold text-center mb-8">Joukkueiden valinta</h1>
    </div>

    <!-- Joukkueet -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 container">
      <div
        v-for="(pelaajat, joukkue) in joukkueet"
        :key="joukkue"
        class="bg-[#2c2c2c] rounded-2xl shadow-md p-4 border border-[#ffb703]"
        @dragover.prevent
        @drop="pudotaPelaaja(joukkue)"
      >
        <h2 class="text-xl font-semibold mb-4 text-[#ffb703] text-center">{{ joukkue }}</h2>

        <div class="min-h-[80px] p-2 rounded-md bg-[#1c1c1c] border border-dashed border-gray-600">
          <div
            v-for="pelaaja in pelaajat"
            :key="pelaaja"
            class="bg-gray-700 text-white px-3 py-1 rounded-md mb-2 text-center cursor-move hover:bg-gray-600 transition"
            :class="{ 'opacity-50 cursor-not-allowed hover:bg-gray-700': tallennettu }"
            draggable="true"
            @dragstart="raahaaPelaaja(pelaaja)"
          >
            {{ pelaaja }}
          </div>

          <p v-if="pelaajat.length === 0" class="text-gray-400 text-center italic text-sm">Ei pelaajia</p>
        </div>
      </div>
    </div>

    <!-- Vapaat pelaajat -->
    <div class="bg-[#2c2c2c] p-6 rounded-2xl border border-[#ffb703] container" @dragover.prevent @drop="pudotaVapaaksi">
      <h2 class="text-xl font-semibold mb-4 text-[#ffb703] text-center">Vapaat pelaajat</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <div
          v-for="pelaaja in vapaatPelaajat"
          :key="pelaaja"
          class="bg-[#1c1c1c] text-white border border-[#ffb703] px-3 py-2 rounded-md text-center cursor-move hover:bg-gray-700 hover:text-[#ffb703] transition"
          :class="{ 'opacity-50 cursor-not-allowed hover:bg-[#1c1c1c] hover:text-white': tallennettu }"
          draggable="true"
          @dragstart="raahaaPelaaja(pelaaja)"
        >
          {{ pelaaja }}
        </div>
      </div>
    </div>

    <!-- Napit -->
    <div class="flex flex-col items-center mt-8 space-y-4">
      <button
        class="px-6 py-2 bg-green-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90 disabled:opacity-50"
        :disabled="tallennettu"
        @click="tallennaJoukkueet"
      >
        {{ tallennettu ? 'Joukkueet tallennettu' : 'Tallenna joukkueet' }}
      </button>
      <button class="px-6 py-2 bg-yellow-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90" @click="muokkaaJoukkueet">Muokkaa joukkueita</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const joukkueet = ref({
  wiilis: [],
  romu: [],
  JerDAD: [],
  Peksi: [],
  tenho: [],
  vedivaan: [],
})

const kaikkiPelaajat = [
  'Pedro',
  'Radu',
  'Lärvi',
  'venyniilo',
  'Hege',
  'Joge',
  'Löyläri',
  'Zzeit',
  'Jerbanderus',
  'Hasse',
  's1mple',
  'Pule',
  'Jakender',
  'elmeri',
  'Are',
  'Plasen',
  'Verdi',
  'Mussu',
  'Jonesy',
  'nico_ilari',
  'Candle',
  'Pantsi',
  'GGranny',
  'Sane',
]

const vapaatPelaajat = ref([...kaikkiPelaajat])
const raahattuPelaaja = ref(null)

// Tila tallennuksen jälkeen
const tallennettu = ref(false)

// Raahausfunktiot
const raahaaPelaaja = (pelaaja) => {
  if (!tallennettu.value) raahattuPelaaja.value = pelaaja
}

const pudotaPelaaja = (joukkue) => {
  if (!raahattuPelaaja.value || tallennettu.value) return
  for (const key in joukkueet.value) {
    const i = joukkueet.value[key].indexOf(raahattuPelaaja.value)
    if (i !== -1) joukkueet.value[key].splice(i, 1)
  }
  const vIndex = vapaatPelaajat.value.indexOf(raahattuPelaaja.value)
  if (vIndex !== -1) vapaatPelaajat.value.splice(vIndex, 1)
  joukkueet.value[joukkue].push(raahattuPelaaja.value)
  raahattuPelaaja.value = null
}

const pudotaVapaaksi = () => {
  if (!raahattuPelaaja.value || tallennettu.value) return
  for (const key in joukkueet.value) {
    const i = joukkueet.value[key].indexOf(raahattuPelaaja.value)
    if (i !== -1) joukkueet.value[key].splice(i, 1)
  }
  if (!vapaatPelaajat.value.includes(raahattuPelaaja.value)) {
    vapaatPelaajat.value.push(raahattuPelaaja.value)
  }
  raahattuPelaaja.value = null
}

// Paikallinen tallennus ja päivitys
watch(
  joukkueet,
  (newVal) => {
    localStorage.setItem('joukkueet', JSON.stringify(newVal))
    const varatut = Object.values(newVal).flat()
    vapaatPelaajat.value = kaikkiPelaajat.filter((p) => !varatut.includes(p))
  },
  { deep: true }
)

// Hae tallennetut joukkueet
onMounted(async () => {
  const saved = localStorage.getItem('joukkueet')
  if (saved) {
    const parsed = JSON.parse(saved)
    for (const key in parsed) {
      if (joukkueet.value[key]) {
        joukkueet.value[key] = parsed[key]
      }
    }
  }

  try {
    const { data } = await useFetch('/api/joukkueet', { method: 'GET' })
    if (data.value && data.value.joukkueet) {
      for (const key in data.value.joukkueet) {
        if (joukkueet.value[key]) {
          joukkueet.value[key] = data.value.joukkueet[key]
        }
      }
    }
  } catch (err) {
    console.error('Virhe joukkueiden haussa Firestoresta:', err)
  }
})

// Tallenna Firestoreen
const tallennaJoukkueet = async () => {
  try {
    const { data, error } = await useFetch('/api/joukkueet', {
      method: 'POST',
      body: { joukkueet: joukkueet.value },
    })

    if (error.value) {
      console.error('Tallennus epäonnistui:', error.value)
      return
    }

    if (data.value.success) {
      tallennettu.value = true
    } else {
      console.error('Tallennus epäonnistui:', data.value)
    }
  } catch (err) {
    console.error('Tallennus epäonnistui:', err)
  }
}

// Muokkaa joukkueita uudelleen
const muokkaaJoukkueet = () => {
  tallennettu.value = false
}
</script>
