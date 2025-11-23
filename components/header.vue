<template>
  <header class="sticky top-0 z-50 bg-[#2c2c2c] shadow-lg">
    <div>
      <div class="flex justify-between items-center md:py-4 md:px-12 p-4">
        <NuxtLink
          to="/"
          class="text-xl font-bold tracking-wider text-white hover:text-cta transition"
        >
          RaKu CS2-turnaus
        </NuxtLink>

        <nav class="hidden sm:flex sm:space-x-6">
          <NuxtLink
            to="/"
            class="text-white hover:text-cta px-3 py-4 rounded-md font-medium transition font-semibold"
            active-class="!text-cta"
          >
            Etusivu
          </NuxtLink>
          <NuxtLink
            to="/mapban"
            class="text-white hover:text-cta px-3 py-4 rounded-md font-medium transition font-semibold"
            active-class="!text-cta"
          >
            Karttavalinta
          </NuxtLink>
          <NuxtLink
            to="/mestarit"
            class="text-white hover:text-cta px-3 py-4 rounded-md font-medium transition font-semibold"
            active-class="!text-cta"
          >
            Mestaruudet
          </NuxtLink>
        </nav>

        <div class="sm:hidden">
          <button
            @click="toggleMenu"
            class="p-2 rounded-md text-white hover:text-cta focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta"
          >
            <svg
              v-if="!menuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      class="sm:hidden border-t border-gray-700 bg-[#1c1c1c] pb-2"
    >
      <NuxtLink
        @click="toggleMenu"
        to="/"
        class="block p-4 text-base font-medium text-white hover:bg-[#3a3a3a] hover:text-cta transition font-semibold"
        active-class="text-cta !bg-[#3a3a3a]"
      >
        Etusivu
      </NuxtLink>
      <NuxtLink
        @click="toggleMenu"
        to="/mapban"
        class="block p-4 text-base font-medium text-white hover:bg-[#3a3a3a] hover:text-cta transition font-semibold"
        active-class="text-cta !bg-[#3a3a3a]"
      >
        Karttavalinta
      </NuxtLink>
      <NuxtLink
        @click="toggleMenu"
        to="/mestarit"
        class="block p-4 text-base font-medium text-white hover:bg-[#3a3a3a] hover:text-cta transition font-semibold"
        active-class="text-cta !bg-[#3a3a3a]"
      >
        Mestaruudet
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
import { ref, defineEmits } from "vue";

// Määritellään emit-funktio, jolla voidaan lähettää tapahtumia
const emit = defineEmits(["scroll-to-otteluohjelma"]);

// Mobiilivalikon tila
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Funktio, joka lähettää scroll-tapahtuman (työpöytävalikko)
const emitScroll = () => {
  emit("scroll-to-otteluohjelma");
};

// Funktio, joka lähettää scroll-tapahtuman ja sulkee valikon (mobiilivalikko)
const emitScrollAndClose = () => {
  emitScroll();
  toggleMenu();
};
</script>
