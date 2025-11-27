<template>
  <Header />
  <div class="flex items-center justify-center pt-24 px-4 text-center">
    <div class="bg-smoke rounded-lg shadow-xl w-full max-w-md p-6 relative">
      <div v-if="auth.onKirjautunut">
        <h2 class="text-white text-xl font-semibold mb-4">Admin</h2>
      </div>

      <div v-else>
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
            @click="nollaaKentat"
            class="px-4 py-2 bg-cta text-white rounded hover:bg-opacity-90"
          >
            Peruuta
          </button>
        </div>
      </div>
      <div v-if="auth.onKirjautunut">
        <p class="text-white pb-6">
          <NuxtLink
            class="underline hover:text-cta underline-offset-2 mr-1"
            to="/"
            >Etusivulla</NuxtLink
          >
          pääset muokkaamaan tilastoja, sarjataulukkoa ja ottelun tuloksia.
        </p>
      </div>
      <button
        @click="kirjauduUlos"
        class="px-4 py-2 bg-cta text-white rounded hover:bg-opacity-90"
        v-if="auth.onKirjautunut"
      >
        Kirjaudu ulos
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const password = ref("");
const error = ref(false);

const kirjauduSisaan = () => {
  if (password.value === "mustang") {
    error.value = false;
    auth.kirjauduSisaan();
  } else {
    error.value = true;
  }
};

const kirjauduUlos = () => {
  auth.kirjauduUlos();
  // Varmistetaan, että lomakkeen tila nollataan myös uloskirjautumisen jälkeen
  nollaaKentat();
};

// Uusi funktio "Peruuta"-painikkeelle
const nollaaKentat = () => {
  password.value = "";
  error.value = false;
};
</script>
