// nuxt.config.ts
export default defineNuxtConfig({
  // Lisää Tailwind CSS tähän
  css: [
    '~/assets/css/main.css', // Oma CSS-tiedostosi
    '~/assets/css/tailwind.css', // Tailwindin CSS
  ],


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-11-18',
})