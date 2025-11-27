import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // Aseta oletusarvo, joka toimii SSR:ssä
    onKirjautunut: false,
  }),

  getters: {
    kirjautumisTila: (state) => state.onKirjautunut,
  },

  actions: {
    kirjauduSisaan() {
      this.onKirjautunut = true;
      // Persistointi-laajennus tallentaa tämän automaattisesti
    },

    kirjauduUlos() {
      this.onKirjautunut = false;
      // Persistointi-laajennus päivittää/poistaa tallennetun tilan
    },
  },

  // ✨ UUSI OSA: Määrittele persistointi
  persist: {
    // Varmistetaan, että localStoragea käytetään vain selaimen puolella (client-side)
    // process.client on Nuxt-ympäristössä true vain selaimessa
    storage: process.client ? localStorage : undefined,
    key: "authStatus",
  },
});
