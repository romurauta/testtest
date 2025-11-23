<template>
  <div class="min-h-screen bg-[#1c1c1c] text-white p-0 sm:p-8">
    <div class="max-w-7xl mx-auto">
      <div class="p-4">
        <NuxtLink class="text-xl" to="/">Etusivu</NuxtLink>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-center mt-3 mb-2 text-cta">
        Joukkueiden valinta
      </h1>
    </div>

    <div
      class="text-xs grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-8 max-w-7xl mx-auto px-2 md:px-0"
    >
      <div
        v-for="(pelaajat, joukkue) in joukkueet"
        :key="joukkue"
        class="bg-[#2c2c2c] rounded-lg shadow-md p-3 sm:p-4 border border-cta"
      >
        <h2
          class="text-lg sm:text-xl font-semibold mb-2 text-cta text-center truncate"
        >
          {{ joukkue }}
        </h2>

        <div
          class="min-h-[60px] p-1 sm:p-2 rounded-md bg-[#1c1c1c] border border-dashed border-gray-600"
        >
          <div
            v-for="pelaaja in pelaajat || []"
            :key="pelaaja"
            class="bg-smoke text-white px-2 py-1 rounded-sm mb-1 text-center cursor-pointer text-xs sm:text-sm hover:bg-coal transition"
            :class="{
              'opacity-50 cursor-not-allowed hover:bg-gray-700': tallennettu,
            }"
            @click="aloitaSiirto(pelaaja)"
          >
            {{ pelaaja }}
          </div>

          <p
            v-if="(pelaajat || []).length === 0"
            class="text-gray-400 text-center italic text-xs pt-2"
          >
            Ei pelaajia
          </p>
        </div>
      </div>
    </div>

    <div
      class="bg-[#2c2c2c] p-3 sm:p-6 rounded-lg border border-cta max-w-7xl mx-auto md:mt-6 mt-4"
    >
      <h2 class="text-lg sm:text-xl font-semibold mb-3 text-cta text-center">
        Vapaat pelaajat
      </h2>
      <div
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6"
      >
        <div
          v-for="pelaaja in vapaatPelaajat"
          :key="pelaaja"
          class="bg-coal text-white border border-cta px-1 py-3 rounded-sm text-center cursor-pointer text-xs sm:text-sm hover:bg-smoke hover:text-cta transition"
          :class="{
            'opacity-50 cursor-not-allowed hover:bg-coal hover:text-white':
              tallennettu,
          }"
          @click="aloitaSiirto(pelaaja)"
        >
          {{ pelaaja }}
        </div>
      </div>
    </div>

    <div
      class="flex flex-col items-center mt-5 space-y-3 sm:space-y-4 max-w-7xl mx-auto pb-6"
    >
      <button
        class="w-full max-w-xs px-6 py-2 bg-green-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90 disabled:opacity-50"
        :disabled="tallennettu"
        @click="tallennaJoukkueet"
      >
        {{ tallennettu ? "Joukkueet lukittu" : "Tallenna joukkueet" }}
      </button>
      <button
        class="w-full max-w-xs px-6 py-2 bg-yellow-500 text-[#1c1c1c] font-semibold rounded-md hover:brightness-90"
        @click="muokkaaJoukkueet"
      >
        Muokkaa joukkueita
      </button>
      <button
        class="w-full max-w-xs px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:brightness-90"
        @click="showConfirmDialog = true"
      >
        Tyhjennä valinnat
      </button>
    </div>

    <div
      v-if="showConfirmDialog"
      class="fixed inset-0 bg-black flex items-center justify-center z-50 p-4"
      @click.self="showConfirmDialog = false"
    >
      <div
        class="bg-[#2c2c2c] p-6 rounded-lg shadow-xl max-w-sm w-full border border-red-500"
      >
        <h3 class="text-xl font-bold mb-4 text-red-400">Oletko varma?</h3>
        <p class="text-white mb-6 text-sm">
          Haluatko varmasti tyhjentää
          <span class="font-semibold">kaikki</span> joukkuevalinnat? Toimintoa
          ei voi kumota.
        </p>
        <div class="flex justify-end space-x-4">
          <button
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 text-sm"
            @click="showConfirmDialog = false"
          >
            Peruuta
          </button>
          <button
            class="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 text-sm"
            @click="vahvistaTyhjennys"
          >
            Kyllä, tyhjennä
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showMoveDialog"
      class="fixed inset-0 bg-black flex items-end justify-center z-50"
      @click.self="showMoveDialog = false"
    >
      <div
        class="bg-[#2c2c2c] p-6 rounded-t-2xl shadow-xl w-full border-t border-cta max-w-lg"
      >
        <h3 class="text-xl font-bold mb-4 text-cta">
          Siirrä pelaaja
          <span class="font-semibold text-white">{{
            pelaajaJotaSiirretaan
          }}</span>
        </h3>
        <div class="space-y-4 pr-2">
          <button
            class="w-full text-left px-4 py-3 bg-coal rounded-md hover:bg-smoke transition"
            @click="siirraPelaaja('vapaat')"
          >
            Siirrä
            <span class="font-semibold text-cta">vapaisiin pelaajiin</span>
          </button>
          <button
            v-for="joukkueNimi in Object.keys(joukkueet)"
            :key="joukkueNimi"
            class="w-full text-left px-4 py-3 bg-coal rounded-md hover:bg-smoke transition text-sm"
            @click="siirraPelaaja(joukkueNimi)"
          >
            Siirrä joukkueeseen:
            <span class="font-semibold text-cta text-base">{{
              joukkueNimi
            }}</span>
          </button>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="px-4 py-2 bg-coal text-white rounded-md hover:bg-smoke text-sm"
            @click="showMoveDialog = false"
          >
            Peruuta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { doc, onSnapshot } from "firebase/firestore";
// HUOM: Varmista, että tämä polku on oikea omassa projektissasi
import { db } from "~/server/lib/firestore";

const joukkueet = ref({
  wiilis: [],
  romu: [],
  JerDAD: [],
  Peksi: [],
  tenho: [],
  vedivaan: [],
});

const kaikkiPelaajat = [
  "Pedro",
  "Radu",
  "Lärvi",
  "venyniilo",
  "Hege",
  "Joge",
  "Löyläri",
  "Lappakeitto",
  "Jerbanderus",
  "Hasse",
  "s1mple",
  "-Pule",
  "Jakender",
  "elmeri:D",
  "Are",
  "Plasen",
  "Verdi",
  "Mussu",
  "J0nesy",
  "nico_ilari",
  "Candle",
  "Pantsi",
  "GGranny",
  "antiinsane",
];

const vapaatPelaajat = ref([...kaikkiPelaajat]);
const tallennettu = ref(false);
const showConfirmDialog = ref(false);

const showMoveDialog = ref(false);
const pelaajaJotaSiirretaan = ref(null);

const paivitaFirestore = async (uudetJoukkueet) => {
  try {
    const { error } = await useFetch("/api/joukkueet", {
      method: "POST",
      body: { joukkueet: uudetJoukkueet },
    });
    if (error.value)
      console.error("Reaaliaikainen tallennus epäonnistui:", error.value);
  } catch (err) {
    console.error("Reaaliaikainen tallennus epäonnistui:", err);
  }
};

const aloitaSiirto = (pelaaja) => {
  if (tallennettu.value) return;
  pelaajaJotaSiirretaan.value = pelaaja;
  showMoveDialog.value = true;
};

const siirraPelaaja = (kohde) => {
  const pelaaja = pelaajaJotaSiirretaan.value;
  if (!pelaaja) return;

  // 1. Poista pelaaja nykyisestä sijainnistaan
  let tarvitaanPaivitys = false;

  for (const key in joukkueet.value) {
    const i = joukkueet.value[key].indexOf(pelaaja);
    if (i !== -1) {
      joukkueet.value[key].splice(i, 1);
      tarvitaanPaivitys = true;
    }
  }

  const vIndex = vapaatPelaajat.value.indexOf(pelaaja);
  if (vIndex !== -1) {
    vapaatPelaajat.value.splice(vIndex, 1);
    tarvitaanPaivitys = true;
  }

  // 2. Lisää pelaaja uuteen kohteeseen
  if (kohde === "vapaat") {
    if (!vapaatPelaajat.value.includes(pelaaja)) {
      vapaatPelaajat.value.push(pelaaja);
      tarvitaanPaivitys = true;
    }
  } else if (joukkueet.value[kohde]) {
    joukkueet.value[kohde].push(pelaaja);
    tarvitaanPaivitys = true;
  }

  // 3. Päivitä tila, sulje modaali
  if (tarvitaanPaivitys) {
    paivitaFirestore(joukkueet.value);
  }
  showMoveDialog.value = false;
  pelaajaJotaSiirretaan.value = null;
};

watch(
  joukkueet,
  (newVal) => {
    localStorage.setItem("joukkueet", JSON.stringify(newVal));
    const varatut = Object.values(newVal || {}).flat();
    vapaatPelaajat.value = kaikkiPelaajat.filter((p) => !varatut.includes(p));
  },
  { deep: true }
);

let unsubscribe = () => {};
onMounted(() => {
  const saved = localStorage.getItem("joukkueet");
  if (saved) {
    const parsed = JSON.parse(saved);
    for (const key in parsed) {
      if (joukkueet.value[key]) joukkueet.value[key] = parsed[key] || [];
    }
  }

  const docRef = doc(db, "kokoonpanot", "nykyiset");
  unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.metadata.hasPendingWrites) {
        return;
      }

      if (docSnap.exists()) {
        const firestoreJoukkueet = docSnap.data().joukkueet || {};
        for (const key in firestoreJoukkueet) {
          joukkueet.value[key] = Array.isArray(firestoreJoukkueet[key])
            ? firestoreJoukkueet[key]
            : [];
        }
        console.log("Joukkueet päivitetty reaaliaikaisesti Firestoresta");
      } else {
        console.log("Ei joukkueita Firestoresta");
      }
    },
    (error) => console.error("Virhe reaaliaikaisessa kuuntelussa:", error)
  );
});

onUnmounted(() => {
  unsubscribe();
});

const tallennaJoukkueet = async () => {
  await paivitaFirestore(joukkueet.value);
  tallennettu.value = true;
};

const muokkaaJoukkueet = () => {
  tallennettu.value = false;
};

const tyhjennaValinnat = async () => {
  const tyhjatJoukkueet = {};
  for (const key in joukkueet.value) {
    tyhjatJoukkueet[key] = [];
  }

  joukkueet.value = tyhjatJoukkueet;
  tallennettu.value = false;

  await paivitaFirestore(joukkueet.value);
  console.log("Valinnat tyhjennetty ja tila tallennettu.");
};

const vahvistaTyhjennys = () => {
  showConfirmDialog.value = false;
  tyhjennaValinnat();
};
</script>
