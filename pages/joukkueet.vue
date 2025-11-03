<template>
  <div class="min-h-screen bg-[#1c1c1c] text-white p-8">
    <div class="container -mb-4">
      <NuxtLink class="text-3xl" to="/">Etusivu</NuxtLink>
      <h1 class="text-3xl font-bold text-center">Joukkueiden valinta</h1>
    </div>

    <div class="text-xs grid grid-cols-1 md:grid-cols-3 gap-8 mb-2 container">
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
            v-for="pelaaja in pelaajat || []"
            :key="pelaaja"
            class="bg-gray-700 text-white px-3 py-1 rounded-md mb-2 text-center cursor-move hover:bg-gray-600 transition"
            :class="{ 'opacity-50 cursor-not-allowed hover:bg-gray-700': tallennettu }"
            draggable="true"
            @dragstart="raahaaPelaaja(pelaaja)"
          >
            {{ pelaaja }}
          </div>

          <p v-if="(pelaajat || []).length === 0" class="text-gray-400 text-center italic text-sm">Ei pelaajia</p>
        </div>
      </div>
    </div>

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

    <div class="flex flex-col items-center mt-4 space-y-4">
      <button
        class="px-6 py-2 bg-green-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90 disabled:opacity-50"
        :disabled="tallennettu"
        @click="tallennaJoukkueet"
      >
        {{ tallennettu ? 'Joukkueet lukittu' : 'Tallenna joukkueet' }}
      </button>
      <button class="px-6 py-2 bg-yellow-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90" @click="muokkaaJoukkueet">Muokkaa joukkueita</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '~/server/lib/firestore'

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
  '-Pule',
  'Jakender',
  'elmeri:D',
  'Are',
  'Plasen',
  'Verdi',
  'Mussu',
  'Jonesy',
  'nico_ilari',
  'Candle',
  'Pantsi',
  'GGranny',
  'antiinsane',
]

const vapaatPelaajat = ref([...kaikkiPelaajat])
const raahattuPelaaja = ref(null)
const tallennettu = ref(false)

const raahaaPelaaja = (pelaaja) => {
  if (!tallennettu.value && pelaaja) raahattuPelaaja.value = pelaaja
}

const paivitaFirestore = async (uudetJoukkueet) => {
  try {
    const { error } = await useFetch('/api/joukkueet', {
      method: 'POST',
      body: { joukkueet: uudetJoukkueet },
    })
    if (error.value) console.error('Reaaliaikainen tallennus epäonnistui:', error.value)
  } catch (err) {
    console.error('Reaaliaikainen tallennus epäonnistui:', err)
  }
}

const pudotaPelaaja = (joukkue) => {
  if (!raahattuPelaaja.value || tallennettu.value) return

  for (const key in joukkueet.value) {
    joukkueet.value[key] = joukkueet.value[key] || []
    const i = joukkueet.value[key].indexOf(raahattuPelaaja.value)
    if (i !== -1) joukkueet.value[key].splice(i, 1)
  }

  const vIndex = vapaatPelaajat.value.indexOf(raahattuPelaaja.value)
  if (vIndex !== -1) vapaatPelaajat.value.splice(vIndex, 1)

  joukkueet.value[joukkue] = joukkueet.value[joukkue] || []
  joukkueet.value[joukkue].push(raahattuPelaaja.value)

  paivitaFirestore(joukkueet.value)
  raahattuPelaaja.value = null
}

const pudotaVapaaksi = () => {
  if (!raahattuPelaaja.value || tallennettu.value) return

  for (const key in joukkueet.value) {
    joukkueet.value[key] = joukkueet.value[key] || []
    const i = joukkueet.value[key].indexOf(raahattuPelaaja.value)
    if (i !== -1) joukkueet.value[key].splice(i, 1)
  }

  if (!vapaatPelaajat.value.includes(raahattuPelaaja.value)) {
    vapaatPelaajat.value.push(raahattuPelaaja.value)
  }

  paivitaFirestore(joukkueet.value)
  raahattuPelaaja.value = null
}

watch(
  joukkueet,
  (newVal) => {
    localStorage.setItem('joukkueet', JSON.stringify(newVal))
    const varatut = Object.values(newVal || {}).flat()
    vapaatPelaajat.value = kaikkiPelaajat.filter((p) => !varatut.includes(p))
  },
  { deep: true }
)

let unsubscribe = () => {}
onMounted(() => {
  const saved = localStorage.getItem('joukkueet')
  if (saved) {
    const parsed = JSON.parse(saved)
    for (const key in parsed) {
      if (joukkueet.value[key]) joukkueet.value[key] = parsed[key] || []
    }
  }

  const docRef = doc(db, 'kokoonpanot', 'nykyiset')
  unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const firestoreJoukkueet = docSnap.data().joukkueet || {}
        for (const key in firestoreJoukkueet) {
          joukkueet.value[key] = Array.isArray(firestoreJoukkueet[key]) ? firestoreJoukkueet[key] : []
        }
        console.log('Joukkueet päivitetty reaaliaikaisesti Firestoresta')
      } else {
        console.log('Ei joukkueita Firestoresta')
      }
    },
    (error) => console.error('Virhe reaaliaikaisessa kuuntelussa:', error)
  )
})

onUnmounted(() => {
  unsubscribe()
})

const tallennaJoukkueet = async () => {
  await paivitaFirestore(joukkueet.value)
  tallennettu.value = true
}

const muokkaaJoukkueet = () => {
  tallennettu.value = false
}
</script>
