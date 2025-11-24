<template>
  <button
    @click="isModalOpen = true"
    class="ml-1 rounded-full text-white focus:outline-none focus:ring-cta transition duration-150 ease-in-out"
    aria-label="Avaa ohjeet sarjataulukon käyttöön"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
    >
      <!-- Ympyrän border -->
      <circle cx="10" cy="10" r="8" />

      <!-- i-kirjain tekstinä -->
      <text
        x="10"
        y="14"
        text-anchor="middle"
        font-size="12"
        fill="currentColor"
        stroke="none"
      >
        i
      </text>
    </svg>
  </button>

  <ClientOnly>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="isModalOpen = false"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-smoke px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="mt-2">
                  <ul class="list-inside mt-4 space-y-2 text-sm text-white-700">
                    <li>
                      <span class="text-lg">V</span> - Voitot (2 pistettä)
                    </li>
                    <li>
                      <span class="text-lg">T</span> - Tasapelit (1 piste)
                    </li>
                    <li>
                      <span class="text-lg">H</span> - Häviöt (0 pistettä)
                    </li>
                    <li><span class="text-lg">P</span> - Pisteet</li>
                  </ul>
                  <p class="mt-4 text-xs">
                    Tasapisteissä joukkueiden järjestys määräytyy keskinäisten
                    otteluiden perusteella. Tämän jälkeen ratkaisevat voitetut
                    kierrokset.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-smoke px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cta text-base font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta sm:ml-3 sm:w-auto sm:text-sm"
              @click="isModalOpen = false"
            >
              Sulje
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
// Käytetään 'ref' -funktiota reaktiivisen tilan luomiseen
import { ref } from "vue";

// Tila modaalin näkyvyydelle. Aluksi suljettu.
const isModalOpen = ref(false);
</script>

<style scoped>
/* Scoped-tyylit voivat olla hyödyllisiä, jos haluat tarkempaa kontrollia */
/* Tailwindiä käytettäessä erillisiä tyylejä ei usein tarvita */
</style>
