import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Nuxt ajaa tämän laajennuksen vain asiakaspuolella (client-side)
export default defineNuxtPlugin(({ $pinia }) => {
  // Käytä laajennusta Pinian kanssa
  $pinia.use(piniaPluginPersistedstate);
});
