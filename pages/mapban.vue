<template>
  <section
    class="text-white justify-center flex flex-col items-center bg-coal p-6"
  >
    <div class="w-full md:w-1/3 mt-12 md:mb-48 mb-20">
      <p class="">Valitse:</p>
      <div class="flex justify-between space-between items-center mb-6">
        <button
          @click="toggleMode"
          class="px-4 py-2 border border-pig text-cta bg-coal hover:bg-lightSmoke"
        >
          {{ mode === "bo1" ? "Best of 1" : "Best of 3" }}
        </button>
        <button
          class="px-4 py-2 border border-pig hover:bg-lightSmoke text-cta bg-coal"
          @click="resetAll"
        >
          Tyhjennä
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
        <div class="flex-1">
          <label class="block text-sm text-cta mb-1">Joukkue A</label>
          <select
            v-model="teamA"
            class="bg-smoke border border-pig px-3 py-1 w-full text-white placeholder-gray-400 focus:outline-none"
          >
            <option value="" disabled class="bg-smoke">Valitse joukkue</option>
            <option
              v-for="team in availableTeamsA"
              :key="team"
              :value="team"
              class="bg-smoke text-white"
            >
              {{ team }}
            </option>
          </select>
          <div class="text-sm text-white font-semibold mt-2">
            Bannit <br />
            <div class="min-h-8">
              <span
                v-for="m in bans.A"
                :key="m"
                class="bg-lightSmoke text-cta px-2 py-1 rounded mr-1"
                >{{ m }}</span
              >
            </div>
          </div>
        </div>

        <div class="flex-1">
          <label class="block text-sm text-cta mb-1">Joukkue B</label>
          <select
            v-model="teamB"
            class="bg-smoke border border-pig px-3 py-1 w-full text-white placeholder-gray-400 focus:outline-none"
          >
            <option value="" disabled class="bg-smoke">Valitse joukkue</option>
            <option
              v-for="team in availableTeamsB"
              :key="team"
              :value="team"
              class="bg-smoke text-white"
            >
              {{ team }}
            </option>
          </select>
          <div class="text-sm text-white font-semibold mt-2">
            Bannit <br />
            <div class="min-h-8">
              <span
                v-for="m in bans.B"
                :key="m"
                class="bg-lightSmoke text-cta px-2 py-1 rounded mr-1"
                >{{ m }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isDone"
        class="border border-pig bg-smoke rounded-lg p-4 mt-2 text-center"
      >
        <h3 class="font-semibold text-lg mb-3">
          {{ mode === "bo1" ? "Pelattava kartta" : "Pelattavat kartat" }}
        </h3>

        <div v-if="mode === 'bo1'" class="flex justify-center">
          <div class="grid grid-cols-[auto_auto]">
            <span>{{ pickedMaps[0] }}</span>
          </div>
        </div>

        <div v-else class="flex justify-center">
          <div class="grid grid-cols-[auto_auto] gap-x-3 text-left">
            <strong>1.</strong> <span>{{ pickedMaps[0] }}</span>
            <strong>2.</strong> <span>{{ pickedMaps[1] }}</span>
            <strong>3.</strong> <span>{{ pickedMaps[2] }}</span>
          </div>
        </div>
      </div>

      <div class="mb-4 text-center">
        <p v-if="!isDone && teamA && teamB" class="text-lg font-semibold">
          Joukkue <span class="text-cta">{{ currentTeamName }}</span>
          {{ currentActionText }}
        </p>
        <p
          v-else-if="!teamA || !teamB"
          class="text-lg font-semibold text-red-400"
        >
          Valitse molemmat joukkueet aloittaaksesi karttaveto.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="map in maps"
          :key="map"
          class="p-4 border border-pig bg-smoke rounded-lg text-center cursor-pointer transition-transform hover:scale-105"
          :class="{
            // Estetään kartan valinta/bannaus, jos joukkueita ei ole valittu
            'opacity-30 cursor-not-allowed': isBanned(map) || !teamA || !teamB,
            'bg-green-900 border-green-600': pickedMaps.includes(map),
          }"
          @click="onMapClick(map)"
        >
          <h3 class="font-semibold text-cta">{{ map }}</h3>
          <p class="text-xs text-gray-400 mt-1">
            <span v-if="isBanned(map)">BANNED</span>
            <span v-else-if="pickedMaps.includes(map)" class="text-green-500"
              >PICKED</span
            >
            <span v-else>AVAILABLE</span>
          </p>
        </div>
      </div>

      <div class="flex justify-center gap-3 mt-6">
        <button
          @click="banRandom()"
          :disabled="isDone || !teamA || !teamB"
          class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke disabled:opacity-50"
        >
          Random
        </button>
        <button
          @click="undo()"
          :disabled="history.length === 0"
          class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke disabled:opacity-50"
        >
          Peru
        </button>
        <button
          @click="resetAll"
          class="px-4 py-2 border border-pig bg-coal text-cta hover:bg-lightSmoke"
        >
          Nollaa
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const maps = [
  "Train",
  "Dust2",
  "Mirage",
  "Nuke",
  "Ancient",
  "Inferno",
  "Overpass",
  "Anubis",
];

// Joukkuelista
const teams = ["FomFom", "GN", "JATS", "NVS", "SB", "TT"];

// Alustetaan tyhjällä, jolloin oletuksena näkyy "Valitse joukkue"
const teamA = ref("");
const teamB = ref("");

const mode = ref("bo1"); // 'bo1' or 'bo3'
const bans = ref({ A: [], B: [] });
const pickedMaps = ref([]);
const history = ref([]);
const turnIndex = ref(0);

// --- Veto järjestys ---
const roundsBo1 = ["B_ban", "A_ban", "B_ban", "A_ban", "B_ban", "A_ban"];
const roundsBo3 = ["B_ban", "A_ban", "B_pick", "A_pick", "B_ban", "A_ban"];

const currentRounds = computed(() =>
  mode.value === "bo1" ? roundsBo1 : roundsBo3
);
const currentRound = computed(
  () => currentRounds.value[turnIndex.value] || null
);
const currentAction = computed(() =>
  currentRound.value?.includes("pick") ? "pick" : "ban"
);
const currentTeam = computed(() =>
  currentRound.value?.startsWith("A") ? "A" : "B"
);

// Näytettävä joukkueen nimi
const currentTeamName = computed(() => {
  return currentTeam.value === "A" ? teamA.value : teamB.value;
});

const isDone = computed(() =>
  mode.value === "bo1"
    ? pickedMaps.value.length === 1
    : pickedMaps.value.length === 3
);

// Laske saatavilla olevat joukkueet pudotusvalikkoihin
const availableTeamsA = computed(() =>
  teams.filter((team) => team !== teamB.value)
);
const availableTeamsB = computed(() =>
  teams.filter((team) => team !== teamA.value)
);

// Tarkkaile valintoja: jos joukkueet yrittävät valita saman nimen, nollataan toinen.
watch(teamA, (newVal) => {
  if (newVal && newVal === teamB.value) {
    teamB.value = "";
  }
});
watch(teamB, (newVal) => {
  if (newVal && newVal === teamA.value) {
    teamA.value = "";
  }
});

const currentActionText = computed(() =>
  currentAction.value === "ban" ? "bannaa kartan" : "valitsee kartan"
);

function isBanned(map) {
  return bans.value.A.includes(map) || bans.value.B.includes(map);
}
function remainingMaps() {
  return maps.filter((m) => !isBanned(m) && !pickedMaps.value.includes(m));
}

function onMapClick(map) {
  // Tarkistus, että molemmat joukkueet on valittu ennen kuin vetoa aloitetaan
  if (!teamA.value || !teamB.value) return;

  if (isDone.value || isBanned(map) || pickedMaps.value.includes(map)) return;

  if (currentAction.value === "ban") {
    bans.value[currentTeam.value].push(map);
    history.value.push({ team: currentTeam.value, map, type: "ban" });
  } else if (currentAction.value === "pick") {
    pickedMaps.value.push(map);
    history.value.push({ team: currentTeam.value, map, type: "pick" });
  }

  stepTurn();
}

function stepTurn() {
  turnIndex.value++;
  if (mode.value === "bo1" && remainingMaps().length === 1) {
    // BO1 lopetus: Jäljelle jäänyt kartta on pelattava kartta
    pickedMaps.value = [remainingMaps()[0]];
  } else if (
    mode.value === "bo3" &&
    turnIndex.value >= currentRounds.value.length
  ) {
    // BO3 lopetus: Jäljelle jäänyt kartta on kolmas kartta, jos sitä ei ole vielä valittu
    const remaining = remainingMaps();
    if (remaining.length === 1 && pickedMaps.value.length < 3) {
      pickedMaps.value.push(remaining[0]);
    }
  }
}

function banRandom() {
  const avail = remainingMaps();
  // Estetään random-toiminto jos joukkueet puuttuvat tai veto on valmis
  if (!avail.length || isDone.value || !teamA.value || !teamB.value) return;
  const rand = avail[Math.floor(Math.random() * avail.length)];
  onMapClick(rand);
}

function undo() {
  const last = history.value.pop();
  if (!last) return;
  if (last.type === "ban") {
    const list = bans.value[last.team];
    const idx = list.indexOf(last.map);
    if (idx !== -1) list.splice(idx, 1);
  } else if (last.type === "pick") {
    const idx = pickedMaps.value.indexOf(last.map);
    if (idx !== -1) pickedMaps.value.splice(idx, 1);
  }
  turnIndex.value = Math.max(0, turnIndex.value - 1);
}

function resetAll() {
  bans.value = { A: [], B: [] };
  pickedMaps.value = [];
  turnIndex.value = 0;
  history.value = [];
}

function toggleMode() {
  mode.value = mode.value === "bo1" ? "bo3" : "bo1";
  resetAll();
}
</script>
