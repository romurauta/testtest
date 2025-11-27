// nuxt.config.ts
export default defineNuxtConfig({
  // Lisää Tailwind CSS tähän
  css: [
    "~/assets/css/main.css", // Oma CSS-tiedostosi
    "~/assets/css/tailwind.css", // Tailwindin CSS
  ],
  modules: ["@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // OTA EHKÄ POIS
  // plugins: ["~/plugins/firestore.js"],

  compatibilityDate: "2024-11-18",
});
