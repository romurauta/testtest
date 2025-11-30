<template class="min-h-screen">
  <footer class="bg-smoke md:py-6 py-0">
    <div class="container flex flex-col justify-between">
      <div>
        <p class="text-white text-xl md:pb-9 pb-5 pt-4 md:pt-0">
          Ranuan Kummit CS2-turnaus &copy; 2021
        </p>
      </div>
      <div class="flex flex-col gap-4 md:mt-0 mt-4">
        <NuxtLink
          to="/"
          class="text-white hover:text-cta transition font-semibold"
        >
          Etusivu
        </NuxtLink>
        <NuxtLink
          to="/kehitysideat"
          class="text-white hover:text-cta transition font-semibold"
        >
          Kehitysideat
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
