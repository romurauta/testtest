<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        @click="close"
      ></div>

      <div
        class="flex items-center justify-center min-h-screen px-4 text-center"
      >
        <div class="bg-smoke rounded-lg shadow-xl w-full max-w-md p-6 relative">
          <h2 class="text-white text-xl font-semibold mb-4">Kirjaudu</h2>

          <input
            v-model="password"
            type="password"
            placeholder="Anna salasana"
            class="w-full px-3 py-2 border rounded mb-4 bg-smoke text-white"
            @keyup.enter="kirjauduSisaan"
          />

          <p v-if="error" class="text-red-500 text-sm mb-3">Väärä salasana</p>

          <div class="flex justify-end space-x-2">
            <button
              @click="kirjauduSisaan"
              class="px-4 py-2 border rounded hover:bg-lightSmoke text-white"
            >
              Kirjaudu
            </button>
            <button
              @click="close"
              class="px-4 py-2 bg-cta text-white rounded hover:bg-opacity-90"
            >
              Peruuta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue"; // onMounted poistettu

const isOpen = ref(false);
const password = ref("");
const error = ref(false);

// AUTH_TOKEN_KEY - Avain poistettu, koska sitä ei enää käytetä

// --- LOGIIKKA ---

// onMounted-tarkistus poistettu, koska tilaa ei enää ladata localStorage:sta

const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
  password.value = "";
  error.value = false;
};

const kirjauduSisaan = () => {
  // HUOM: Oikeassa sovelluksessa tekisit tässä API-kutsun palvelimelle
  if (password.value === "mustang") {
    // 1. Kirjautuminen onnistui
    error.value = false;
    close();

    // 2. TALLENNA TOKEN LOCALSTORAGEEN - **POISTETTU**

    // 3. Ilmoita vanhemmalle komponentille kirjautumisesta
    emit("loggedIn");
  } else {
    // Virheellinen salasana
    error.value = true;
  }
};

// Uloskirjautumistoiminto
const kirjauduUlos = () => {
  // 1. POISTA TOKEN LOCALSTORAGESTA - **POISTETTU**

  // 2. Ilmoita vanhemmalle komponentille uloskirjautumisesta
  emit("loggedOut");
};

// Aseta open() ja kirjauduUlos() saataville ulkopuolelta
defineExpose({
  open,
  kirjauduUlos,
});
</script>
