<template>
  <header class="sticky top-0 z-50 bg-[#2c2c2c] shadow-lg">
    <div>
      <div class="flex justify-between items-center md:py-3 md:px-12 p-4">
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

          <div v-if="!isLoggedIn" class="flex items-center">
            <NuxtLink
              to="/login"
              class="text-white hover:text-cta px-3 py-4 rounded-md font-medium transition font-semibold"
            >
              Kirjaudu
            </NuxtLink>
          </div>
        </nav>

        <div class="sm:hidden">
          <button
            @click="toggleMenu"
            class="p-2 rounded-md text-white focus:outline-none"
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

    <nav v-if="menuOpen" class="sm:hidden bg-smoke pb-2">
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

      <div v-if="!isLoggedIn">
        <NuxtLink
          to="/login"
          class="block p-4 text-base font-medium text-white hover:bg-[#3a3a3a] hover:text-cta transition font-semibold w-full text-left"
        >
          Kirjaudu
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, defineProps } from "vue";

// --- PROPS & EMITS ---

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

// --- REF-VIITTAUKSET MODAALIIN ---

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleLoggedIn = () => {
  emit("loggedIn");
};

const handleLogout = () => {
  emit("logout");
};

const handleLogoutAndCloseMenu = () => {
  handleLogout();
  toggleMenu();
};
</script>
