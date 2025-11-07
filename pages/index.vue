<template>
  <div class="bg-coal text-lg">
    <div class="flex flex-col items-center justify-center py-6">
      <div>
        <h1 class="text-4xl px-8 text-center text-white shadow-lg">
          Ranuan Kummit CS2-turnaus
        </h1>
      </div>
      <div
        class="flex justify-end mt-8 gap-y-4 items-center justify-between -mb-5"
      >
        <button class="text-cta ml-2 px-4 py-1 hover:bg-lightSmoke">
          <NuxtLink to="mapban">Kartan valinta</NuxtLink>
        </button>
        <button
          class="px-4 py-2 hover:bg-lightSmoke text-cta bg-coal ml-2"
          @click="scrollaaOtteluohjelmaan"
        >
          Otteluohjelma
        </button>
      </div>
    </div>

    <!--
    <div class="container text-center">
      <button class="text-cta mt-6 mb-4 px-4 py-1 mr-4 border border-pig hover:bg-lightSmoke" @click="avaaInfoModal">Turnausinfo</button>
    </div>
    -->
    <!-- Turnausinfo modal -->
    <transition appear name="modal">
      <div
        v-if="modalAuki"
        class="fixed inset-0 flex justify-center items-center"
      >
        <div
          class="bg-coal shadow-xl shadow-black rounded-lg p-12 w-full max-w-2xl"
        >
          <ul class="list-disc pl-5 mb-6 text-white space-y-2">
            <li class="mb-2">
              Pelit pelataan perjantaina klo 18.00–02.00 ja lauantaina klo
              11.00–22.15.
            </li>
            <li class="mb-2">
              Jokainen pelaaja maksaa palkintopottiin 10 euroa. Rahat jaetaan
              voittajajoukkueen pelaajien kesken.
            </li>
            <li class="mb-2">
              Alkusarjassa pelataan jokaista joukkuetta vastaan kolme kertaa (15
              peliä/joukkue). Tämän jälkeen pelataan pudotuspelit.
            </li>
            <li class="mb-2">
              Alkusarjan ottelut pelataan best of 1 -formaatissa, ja
              puolivälierät, välierät sekä finaali pelataan best of 3
              -formaatissa.
            </li>
            <li class="mb-2">
              Sijoitus sarjataulukossa määräytyy seuraavasti: 1) pisteet, 2)
              keskinäiset ottelut, 3) voitetut erät.
            </li>
            <li class="mb-2">
              Perjantaina sovitaan ruokatauko paikan päällä. Lauantaina pidetään
              alkusarjan ja pudotuspelien välissä 1,5 tunnin ruokatauko.
            </li>
          </ul>
          <button
            class="ml-5 px-4 text-cta py-2 border border-pig hover:bg-lightSmoke"
            @click="suljeInfoModal"
          >
            Sulje
          </button>
        </div>
      </div>
    </transition>

    <div class="container py-6">
      <div class="mb-6">
        <section class="text-white flex flex-col items-center">
          <div>
            <div class="flex justify-between items-center">
              <h2 class="text-xl md:text-2xl">Sarjataulukko</h2>
            </div>

            <table class="mb-0 pb-0 border border-pig">
              <thead class="border border-pig">
                <tr>
                  <th class="border-pig bg-smoke">Joukkue</th>

                  <th class="border-pig bg-smoke relative group">
                    V
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                    >
                      Voitto
                    </span>
                  </th>

                  <th class="border-pig bg-smoke relative group">
                    T
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                    >
                      Tasapeli
                    </span>
                  </th>

                  <th class="border-pig bg-smoke relative group">
                    H
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                    >
                      Häviö
                    </span>
                  </th>

                  <th class="border-pig bg-smoke relative group">
                    P
                    <span
                      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                    >
                      Pisteet
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <!-- Loader: näytetään kun data ei ole valmis -->
                <template v-if="!sarjataulukko || sarjataulukko.length === 0">
                  <tr v-for="i in 6" :key="i" class="border-pig animate-pulse">
                    <td class="border-pig text-left pl-8 w-2/12">-</td>
                    <td class="border-pig">-</td>
                    <td class="border-pig">-</td>
                    <td class="border-pig">-</td>
                    <td class="border-pig">-</td>
                  </tr>
                </template>

                <!-- Data: näytetään kun sarjataulukko on ladattu -->
                <template v-else>
                  <tr
                    v-for="joukkue in sarjataulukko"
                    :key="joukkue.nimi"
                    class="border-pig"
                    @click="avaaModal(joukkue.joukkueKokonimi)"
                  >
                    <td
                      class="border-pig cursor-pointer hover:bg-lightSmoke text-left pl-8 w-2/12"
                    >
                      {{ joukkue.nimi }}
                    </td>
                    <td class="border-pig">{{ joukkue.voitot }}</td>
                    <td class="border-pig">{{ joukkue.tasapelit }}</td>
                    <td class="border-pig">{{ joukkue.havio }}</td>
                    <td class="border-pig">{{ joukkue.pisteet }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
            <p class="italic mt-1 pt-0 text-sm mb-4">
              Klikkaamalla sarjataulukossa joukkueen nimeä voit tarkastella
              joukkueen kokoonpanoa.
            </p>
            <div v-if="onKirjautunut">
              <label for="joukkue" class="mr-2">Päivitä joukkueen</label>
              <select
                v-model="valittuJoukkue"
                id="joukkue"
                class="mr-2 w-32 px-2 py-1 border rounded-md border-pig hover:bg-lightSmoke bg-smoke"
              >
                <option
                  class="font-medium"
                  v-for="joukkue in joukkueet"
                  :key="joukkue"
                  :value="joukkue"
                >
                  {{ joukkue }}
                </option>
              </select>
              <span>tilastoja</span>
            </div>

            <div class="pt-6" v-if="onKirjautunut">
              <p class="pr-6">Lisää joukkueelle</p>
              <div
                class="mb-4 flex items-center md:border-none md:pb-0 pb-8 border-b"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
                  <button
                    class="px-4 text-cta py-1 mr-4 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('voitto', +1)"
                  >
                    Voitto
                  </button>
                  <button
                    class="px-4 text-cta py-1 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('tasapeli', +1)"
                  >
                    Tasapeli
                  </button>
                  <button
                    class="px-4 text-cta py-1 mx-0 md:mx-4 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('havio', +1)"
                  >
                    Häviö
                  </button>
                </div>
              </div>
              <p class="pr-4">Poista joukkueelta</p>
              <div class="mb-4 flex items-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
                  <button
                    class="px-4 text-cta py-1 mr-4 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('voitto', -1)"
                  >
                    Voitto
                  </button>
                  <button
                    class="px-4 text-cta py-1 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('tasapeli', -1)"
                  >
                    Tasapeli
                  </button>
                  <button
                    class="px-4 text-cta py-1 mx-0 md:mx-4 border border-pig hover:bg-lightSmoke bg-coal"
                    @click="lisaaTulos('havio', -1)"
                  >
                    Häviö
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal for showing team players -->
            <transition appear name="modal">
              <div
                v-if="naytaModal"
                class="fixed inset-0 flex items-center justify-center"
              >
                <div
                  class="bg-coal text-white p-6 md:p-10 rounded-md shadow-xl shadow-black w-3/4 sm:w-2/4 nd:w-1/4 lg:w-2/5"
                >
                  <h3 class="text-xl font-bold mb-4">
                    Joukkueen
                    <span class="text-cta">{{ modalJoukkue }}</span> pelaajat
                  </h3>
                  <ul>
                    <li
                      class="text-xl text-cta mb-2"
                      v-for="pelaaja in joukkueenPelaajat"
                      :key="pelaaja"
                    >
                      {{ pelaaja }}
                    </li>
                  </ul>
                  <button
                    class="mt-6 px-4 py-2 border border-pig hover:bg-lightSmoke text-cta"
                    @click="suljeModal"
                  >
                    Sulje
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </section>
      </div>

      <section class="text-white px-8 py-6 flex flex-col items-center">
        <h2 class="mb-4 text-xl md:text-2xl">Tilastot</h2>
        <table class="border-pig w-full sm:w-1/3 md:2/3 text-sm">
          <thead class="border-pig">
            <tr>
              <th class="border-pig bg-smoke">Pelaaja</th>

              <th class="border-pig bg-smoke relative group">
                K
                <span
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                >
                  Kill
                </span>
              </th>

              <th class="border-pig bg-smoke relative group">
                D
                <span
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                >
                  Death
                </span>
              </th>

              <th class="border-pig bg-smoke relative group">
                A
                <span
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-black text-white text-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                >
                  Assist
                </span>
              </th>

              <th class="border-pig bg-smoke relative group">K/D Ratio</th>
            </tr>
          </thead>

          <tbody>
            <!-- Loader: jos pelaajat ei ole vielä ladattu -->
            <template v-if="!pelaajat || pelaajat.length === 0">
              <tr
                v-for="i in 6"
                :key="'loader-' + i"
                class="border-pig animate-pulse"
              >
                <td class="w-3/12 text-left border-pig whitespace-nowrap px-4">
                  -
                </td>
                <td class="border-pig w-3/12">-</td>
                <td class="border-pig w-3/12">-</td>
                <td class="border-pig w-3/12">-</td>
                <td class="border-pig">-</td>
              </tr>
            </template>

            <!-- Data: jos pelaajat on ladattu -->
            <template v-else>
              <tr
                v-for="(pelaaja, index) in pelaajat"
                :key="pelaaja.nimi"
                class="border-pig px-12"
              >
                <td
                  class="w-3/12 text-left border-pig whitespace-nowrap"
                  :class="{ 'flame-effect': index < 5 }"
                >
                  {{ index + 1 }}. {{ pelaaja.nimi }}
                </td>
                <td class="border-pig w-3/12">{{ pelaaja.kill }}</td>
                <td class="border-pig w-3/12">{{ pelaaja.death }}</td>
                <td class="border-pig w-3/12">{{ pelaaja.assist }}</td>
                <td class="border-pig" :class="{ 'flame-effect': index < 5 }">
                  {{ pelaaja.ratio.toFixed(2) }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!--Tässä teksti siksi, että taulukko olis yhtä leveä ko ylempi taulukko. En jaksanu alkaa tyylittelemään nii käytän tämmöstä häksiä-->

        <div v-if="onKirjautunut">
          <div class="pb-2">
            <label for="pelaaja" class="mr-2">Päivitä pelaajan</label>
            <select
              v-model="valittuPelaaja"
              id="pelaaja"
              class="w-32 px-2 mr-2 py-1 border rounded-md border-pig hover:bg-lightSmoke bg-smoke"
            >
              <option
                class=""
                v-for="pelaaja in pelaajat"
                :key="pelaaja.nimi"
                :value="pelaaja.nimi"
              >
                {{ pelaaja.nimi }}
              </option>
            </select>
            <span>tilastoja</span>
          </div>
          <div class="flex items-center">
            <p class="pr-4">Lisää pelaajalle:</p>
            <div class="py-2 pr-4">
              <label class="mr-2">K</label>
              <input
                class="w-16 py-1 rounded-md px-2 border border-pig bg-smoke"
                type="number"
                v-model.number="muutokset.kill"
              />
            </div>
            <div class="py-2 pr-4">
              <label class="mr-2">D</label>
              <input
                class="px-2 py-1 rounded-md w-16 border border-pig bg-smoke"
                type="number"
                v-model.number="muutokset.death"
              />
            </div>
            <div class="py-2">
              <label class="mr-2">A</label>
              <input
                class="px-2 py-1 rounded-md w-16 border border-pig bg-smoke"
                type="number"
                v-model.number="muutokset.assist"
              />
            </div>
          </div>
          <div class="pb-4 pt-2">
            <button
              class="px-4 py-2 border border-pig text-cta hover:bg-lightSmoke bg-coal"
              @click="paivitaKDA"
            >
              Päivitä tilastot
            </button>
          </div>
        </div>
      </section>
    </div>
    <div>
      <section
        ref="otteluohjelmaSection"
        class="text-white px-8 py-6 flex flex-col items-center"
      >
        <div>
          <h2 class="text-xl md:text-2xl">Otteluohjelma</h2>
          <p class="mt-6 -mb-4">Perjantai 28.11.2025</p>
          <table class="border border-pig w-full text-sm">
            <thead class="border border-pig">
              <tr class="border border-pig">
                <th class="border-pig bg-smoke">Aika</th>
                <th class="border-pig bg-smoke">Peli 1</th>
                <th class="border-pig bg-smoke">Peli 2</th>
                <th class="border-pig bg-smoke">Peli 3</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-pig"
                v-for="(ottelu, index) in otteluohjelmaPerjantai"
                :key="index"
              >
                <td class="border-pig">{{ ottelu.aika }}</td>

                <!-- Kenttä 1 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta1 }}</span>
                  <p
                    v-if="
                      ottelu.kentta1Voitetut !== null &&
                      ottelu.kentta1Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta1Voitetut > ottelu.kentta1Havitut,
                        'text-red-500':
                          ottelu.kentta1Voitetut < ottelu.kentta1Havitut,
                        'text-orange-300':
                          ottelu.kentta1Voitetut === ottelu.kentta1Havitut,
                      }"
                    >
                      {{ ottelu.kentta1Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta1Havitut > ottelu.kentta1Voitetut,
                        'text-red-500':
                          ottelu.kentta1Havitut < ottelu.kentta1Voitetut,
                        'text-orange-300':
                          ottelu.kentta1Voitetut === ottelu.kentta1Havitut,
                      }"
                    >
                      {{ ottelu.kentta1Havitut }}
                    </span>
                  </p>
                  <div v-if="onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta1', 'perjantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>

                <!-- Kenttä 2 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta2 }}</span>
                  <p
                    v-if="
                      ottelu.kentta2Voitetut !== null &&
                      ottelu.kentta2Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta2Voitetut > ottelu.kentta2Havitut,
                        'text-red-500':
                          ottelu.kentta2Voitetut < ottelu.kentta2Havitut,
                        'text-orange-300':
                          ottelu.kentta2Voitetut === ottelu.kentta2Havitut,
                      }"
                    >
                      {{ ottelu.kentta2Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta2Havitut > ottelu.kentta2Voitetut,
                        'text-red-500':
                          ottelu.kentta2Havitut < ottelu.kentta2Voitetut,
                        'text-orange-300':
                          ottelu.kentta2Voitetut === ottelu.kentta2Havitut,
                      }"
                    >
                      {{ ottelu.kentta2Havitut }}
                    </span>
                  </p>
                  <div v-if="onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta2', 'perjantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>

                <!-- Kenttä 3 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta3 }}</span>
                  <p
                    v-if="
                      ottelu.kentta3Voitetut !== null &&
                      ottelu.kentta3Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta3Voitetut > ottelu.kentta3Havitut,
                        'text-red-500':
                          ottelu.kentta3Voitetut < ottelu.kentta3Havitut,
                        'text-orange-300':
                          ottelu.kentta3Voitetut === ottelu.kentta3Havitut,
                      }"
                    >
                      {{ ottelu.kentta3Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta3Havitut > ottelu.kentta3Voitetut,
                        'text-red-500':
                          ottelu.kentta3Havitut < ottelu.kentta3Voitetut,
                        'text-orange-300':
                          ottelu.kentta3Voitetut === ottelu.kentta3Havitut,
                      }"
                    >
                      {{ ottelu.kentta3Havitut }}
                    </span>
                  </p>
                  <div v-if="onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta3', 'perjantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Tuloksen asettamiseen tehty modal -->
              <transition appear name="modal">
                <div
                  v-if="naytaTulosModal"
                  class="fixed inset-0 flex items-center justify-center"
                >
                  <div
                    class="bg-coal text-white p-12 rounded-md shadow-xl shadow-black w-1/3"
                  >
                    <h2 class="text-lg font-bold mb-4">Muokkaa tuloksia</h2>
                    <div class="flex items-center mb-4">
                      <input
                        type="number"
                        class="w-12 mr-2 px-1 py-1 border bg-smoke border-pig rounded-md"
                        v-model.number="modalData.voitetut"
                        placeholder="0"
                      />
                      -
                      <input
                        type="number"
                        class="w-12 ml-2 px-1 py-1 border bg-smoke border-pig rounded-md"
                        v-model.number="modalData.havitut"
                        placeholder="0"
                      />
                    </div>
                    <div class="flex justify-end gap-4">
                      <button
                        class="mt-6 px-4 py-2 border border-pig"
                        @click="tallennaTulosModal"
                      >
                        Tallenna
                      </button>
                      <button
                        class="mt-6 px-4 py-2 text-white bg-cta border border-pig"
                        @click="suljeTulosModal"
                      >
                        Peruuta
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
            </tbody>
          </table>
          <!--Tässä teksti siksi, että taulukko olis yhtä leveä ko ylempi taulukko. En jaksanu alkaa tyylittelemään nii käytän tämmöstä häksiä-->
          <p class="italic m-0 p-0 text-sm mb-4 text-coal">
            Klikkaamalla sarjataulukossa joukkueen nimeä voit tarkastella
            joukkueen kokoonpanoa.
          </p>
          <p class="mt-0 -mb-4">Lauantai 29.11.2025</p>
          <table class="border border-pig w-full text-sm">
            <thead class="border border-pig">
              <tr class="border border-pig">
                <th class="border-pig bg-smoke">Aika</th>
                <th class="border-pig bg-smoke">Peli 1</th>
                <th class="border-pig bg-smoke">Peli 2</th>
                <th class="border-pig bg-smoke">Peli 3</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-pig"
                v-for="(ottelu, index) in otteluohjelmaLauantai"
                :key="index"
              >
                <td class="border-pig">{{ ottelu.aika }}</td>

                <!-- Kenttä 1 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta1 }}</span>
                  <p
                    v-if="
                      ottelu.kentta1Voitetut !== null &&
                      ottelu.kentta1Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta1Voitetut > ottelu.kentta1Havitut,
                        'text-red-500':
                          ottelu.kentta1Voitetut < ottelu.kentta1Havitut,
                        'text-orange-300':
                          ottelu.kentta1Voitetut === ottelu.kentta1Havitut,
                      }"
                    >
                      {{ ottelu.kentta1Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta1Havitut > ottelu.kentta1Voitetut,
                        'text-red-500':
                          ottelu.kentta1Havitut < ottelu.kentta1Voitetut,
                        'text-orange-300':
                          ottelu.kentta1Voitetut === ottelu.kentta1Havitut,
                      }"
                    >
                      {{ ottelu.kentta1Havitut }}
                    </span>
                  </p>
                  <div v-if="ottelu.onTulosNakyva && onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta1', 'lauantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>

                <!-- Kenttä 2 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta2 }}</span>
                  <p
                    v-if="
                      ottelu.kentta2Voitetut !== null &&
                      ottelu.kentta2Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta2Voitetut > ottelu.kentta2Havitut,
                        'text-red-500':
                          ottelu.kentta2Voitetut < ottelu.kentta2Havitut,
                        'text-orange-300':
                          ottelu.kentta2Voitetut === ottelu.kentta2Havitut,
                      }"
                    >
                      {{ ottelu.kentta2Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta2Havitut > ottelu.kentta2Voitetut,
                        'text-red-500':
                          ottelu.kentta2Havitut < ottelu.kentta2Voitetut,
                        'text-orange-300':
                          ottelu.kentta2Voitetut === ottelu.kentta2Havitut,
                      }"
                    >
                      {{ ottelu.kentta2Havitut }}
                    </span>
                  </p>
                  <div v-if="ottelu.onTulosNakyva && onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta2', 'lauantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>

                <!-- Kenttä 3 -->
                <td class="border-pig">
                  <span>{{ ottelu.kentta3 }}</span>
                  <p
                    v-if="
                      ottelu.kentta3Voitetut !== null &&
                      ottelu.kentta3Havitut !== null
                    "
                    class="mt-1"
                  >
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta3Voitetut > ottelu.kentta3Havitut,
                        'text-red-500':
                          ottelu.kentta3Voitetut < ottelu.kentta3Havitut,
                        'text-orange-300':
                          ottelu.kentta3Voitetut === ottelu.kentta3Havitut,
                      }"
                    >
                      {{ ottelu.kentta3Voitetut }}
                    </span>
                    -
                    <span
                      :class="{
                        'text-green-500':
                          ottelu.kentta3Havitut > ottelu.kentta3Voitetut,
                        'text-red-500':
                          ottelu.kentta3Havitut < ottelu.kentta3Voitetut,
                        'text-orange-300':
                          ottelu.kentta3Voitetut === ottelu.kentta3Havitut,
                      }"
                    >
                      {{ ottelu.kentta3Havitut }}
                    </span>
                  </p>
                  <div v-if="ottelu.onTulosNakyva && onKirjautunut">
                    <button
                      class="ml-2 px-2 py-1 border border-pig hover:bg-lightSmoke text-sm text-cta bg-coal"
                      @click="
                        avaaTulosModal(ottelu, index, 'kentta3', 'lauantai')
                      "
                    >
                      Aseta tulos
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!--Tässä teksti siksi, että taulukko olis yhtä leveä ko ylempi taulukko. En jaksanu alkaa tyylittelemään nii käytän tämmöstä häksiä-->
          <p class="italic m-0 p-0 text-sm mb-4 text-coal">
            Klikkaamalla sarjataulukossa joukkueen nimeä voit tarkastella
            joukkueen kokoonpanoa.
          </p>
        </div>
        <Playoffs :isLoggedIn="onKirjautunut" />
      </section>
    </div>
    <div class="flex justify-end container">
      <div class="text-white">
        <!-- Näytetään joko Kirjaudu-painike tai salasana-kenttä ja painike -->
        <div v-if="!naytaSalasanaKentta">
          <button
            class="text-cta ml-2 px-4 py-1 border border-pig hover:bg-lightSmoke"
            @click="naytaSalasanaKentta = true"
          >
            Kirjaudu
          </button>
        </div>
        <div v-else>
          <input
            id="salasana"
            v-model="salasana"
            placeholder="Anna salasana"
            type="password"
            class="px-2 py-1 rounded-md border border-pig bg-smoke max-w-44 mb-4"
            :class="virhe ? 'border-red-500' : 'border-pig'"
          />
          <button
            class="text-cta ml-2 px-4 py-1 border border-pig hover:bg-lightSmoke"
            @click="kirjauduSisaan"
          >
            Kirjaudu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      naytaSalasanaKentta: false,
      uusiTeksti: "",
      tallennetutTiedot: [],
      puolivaliera1: "",
      puolivaliera2: "",
      valiera1: "",
      valiera2: "",
      finaali: "",
      naytaTulosModal: false,
      valittuKentta: "",
      valittuPäivä: "",
      valittuIndex: null,
      modalData: {
        voitetut: null,
        havitut: null,
      },
      modalAuki: false,
      joukkueetPelaajat: {
        "Tenhon Taistelijat": ["Tenho", "Löyläri", "Pedro", "GGranny", "Radu"],
        FomFom: ["romu", "Joge", "Mussu", "Hasse", "-Pule"],
        Gooners: ["Peksi", "Pantsi", "Plasen", "antiinsane", "Jerbanderus"],
        "Noob Victory Squad": [
          "vedivaan",
          "Lärvi",
          "Zzeit",
          "elmeri:D",
          "J0nesy",
        ],
        "Jere and The Stepfrags": [
          "JerDAD",
          "Hege",
          "Candle",
          "s1mple",
          "nico_ilari",
        ],
        "Spandex Boys": ["wiilis", "venyniilo", "Are", "Verdi", "Jakender"],
      },
      naytaModal: false,
      modalJoukkue: "",
      joukkueenPelaajat: [],

      // Kirjautuminen
      salasana: "",
      onKirjautunut: false,
      virhe: false,
      // Kirjautuminen
      joukkueet: [],
      valittuJoukkue: "Are",
      valittuPelaaja: "Are",
      sarjataulukko: [],
      pelaajat: [],
      muutokset: { kill: 0, death: 0, assist: 0 },
      otteluohjelmaPerjantai: [
        {
          aika: "1. 18:00-18:45",
          kentta1: "TT vs JATS",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "FomFom vs NVS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "GN vs SB",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "2. 18:45-19:30",
          kentta1: "TT vs FomFom",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "JATS vs GN",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "NVS vs SB",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "3. 19:30-20:15",
          kentta1: "TT vs NVS",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "JATS vs SB",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "FomFom vs GN",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "4. 20:15-21:00",
          kentta1: "TT vs GN",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "JATS vs NVS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "FomFom vs SB",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "21:00-21:45",
          kentta1: "RUOKATAUKO",
          kentta1Voitetut: null,
          kentta1Havitut: null,
          kentta2: "RUOKATAUKO",
          kentta2Voitetut: null,
          kentta2Havitut: null,
          kentta3: "RUOKATAUKO",
          kentta3Voitetut: null,
          kentta3Havitut: null,
        },
        {
          aika: "5. 21:45-22:30",
          kentta1: "TT vs SB",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "JATS vs FomFom",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "NVS vs GN",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "6. 22:30-23:15",
          kentta1: "JATS vs TT",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "NVS vs FomFom",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "SB vs GN",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "7. 23:15-00:00",
          kentta1: "FomFom vs TT",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "GN vs JATS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "SB vs NVS",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "8. 00:00-00:45",
          kentta1: "NVS vs TT",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "SB vs JATS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "GN vs FomFom",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
        {
          aika: "9. 00:45-01:30",
          kentta1: "GN vs TT",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "NVS vs JATS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "SB vs FomFom",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
        },
      ],
      otteluohjelmaLauantai: [
        {
          aika: "10. 11:00-11:45",
          kentta1: "SB vs TT",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "FomFom vs JATS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "GN vs NVS",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
          onTulosNakyva: true,
        },
        {
          aika: "11. 11:45-12:30",
          kentta1: "TT vs JATS",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "FomFom vs NVS",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "GN vs SB",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
          onTulosNakyva: true,
        },
        {
          aika: "12. 12:30-13:15",
          kentta1: "TT vs FomFom",
          kentta1Voitetut: 0,
          kentta1Havitut: 0,
          kentta2: "JATS vs GN",
          kentta2Voitetut: 0,
          kentta2Havitut: 0,
          kentta3: "NVS vs SB",
          kentta3Voitetut: 0,
          kentta3Havitut: 0,
          onTulosNakyva: true,
        },
        {
          aika: "13:15-14:30",
          kentta1: "RUOKATAUKO",
          kentta1Voitetut: null,
          kentta1Havitut: null,
          kentta2: "RUOKATAUKO",
          kentta2Voitetut: null,
          kentta2Havitut: null,
          kentta3: "RUOKATAUKO",
          kentta3Voitetut: null,
          kentta3Havitut: null,
        },
      ],
    };
  },
  mounted() {
    this.haePlayoffsTiedot();
  },
  methods: {
    async haeTiedot() {
      try {
        const response = await fetch("/api/tiedot");
        const data = await response.json();
        this.tallennetutTiedot = data;
      } catch (error) {
        console.error("Virhe tietojen haussa:", error);
      }
    },
    async tallennaTeksti() {
      if (!this.uusiTeksti.trim()) {
        alert("Teksti ei voi olla tyhjä");
        return;
      }
      try {
        const response = await fetch("/api/tiedot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teksti: this.uusiTeksti }),
        });
        const result = await response.json();
        if (result.success) {
          this.uusiTeksti = "";
          this.haeTiedot();
        } else {
          alert("Virhe tallennuksessa");
        }
      } catch (error) {
        console.error("Virhe tallennuksessa:", error);
      }
    },
    async poistaTeksti(id) {
      try {
        const response = await fetch("/api/tiedot", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const result = await response.json();
        if (result.success) {
          this.haeTiedot();
        } else {
          alert("Virhe poistossa");
        }
      } catch (error) {
        console.error("Virhe poistossa:", error);
      }
    },

    asetaVoittaja(vaihe, joukkue1, joukkue2) {
      const voittaja = prompt(
        `Syötä voittaja ottelusta ${joukkue1} vs ${joukkue2}:`
      );
      if (vaihe === "puolivaliera") {
        this.puolivalieravoittajat.push(voittaja);
      } else if (vaihe === "semifinaali") {
        this.semifinaalivoittajat.push(voittaja);
      } else if (vaihe === "finaali") {
        this.finaalivoittaja = voittaja;
        alert(`Finaalin voittaja on: ${voittaja}`);
      }
    },
    avaaTulosModal(ottelu, index, kentta, päivä) {
      this.valittuKentta = kentta;
      this.valittuPäivä = päivä;
      this.valittuIndex = index;
      this.modalData.voitetut = ottelu[`${kentta}Voitetut`] || 0;
      this.modalData.havitut = ottelu[`${kentta}Havitut`] || 0;
      this.naytaTulosModal = true;
    },
    suljeTulosModal() {
      this.naytaTulosModal = false;
    },
    tallennaTulosModal() {
      const { voitetut, havitut } = this.modalData;
      this.tallennaErat(
        this.valittuKentta,
        voitetut,
        havitut,
        this.valittuIndex,
        this.valittuKentta,
        this.valittuPäivä
      );
      this.suljeTulosModal();
    },
    tallennaErat(kentta, voitetut, havitut, index, valittuKentta, päivä) {
      const ottelu = this.otteluohjelmaPerjantai[index];
      ottelu[`${kentta}Voitetut`] = voitetut;
      ottelu[`${kentta}Havitut`] = havitut;
      // Tähän voidaan lisätä tallennus logiikka API:lle, jos tarvitaan.
      console.log(
        `Tallennettiin: ${voitetut} - ${havitut} kentälle ${kentta} päivä ${päivä}`
      );
    },
    scrollaaOtteluohjelmaan() {
      const otteluohjelmaElement = this.$refs.otteluohjelmaSection;
      if (otteluohjelmaElement) {
        // Alustetaan animaatio
        const startPosition = window.pageYOffset; // Nykyinen sijainti
        const targetPosition = otteluohjelmaElement.getBoundingClientRect().top; // Kohteen sijainti suhteessa ikkunaan
        const duration = 1000; // Animaation kesto millisekunteina
        const startTime = performance.now(); // Aloitusaika

        const easeInOutCubic = (t) => {
          // Easing-funktio: pehmeä kiihdytys ja hidastus
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1); // Varmistetaan, että arvo ei ylitä 1
          const easing = easeInOutCubic(progress);
          const scrollTo = startPosition + targetPosition * easing;

          window.scrollTo(0, scrollTo);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    },

    avaaInfoModal() {
      this.modalAuki = true;
    },
    suljeInfoModal() {
      this.modalAuki = false;
    },
    avaaModal(joukkueNimi) {
      this.modalJoukkue = joukkueNimi;
      this.joukkueenPelaajat = this.joukkueetPelaajat[joukkueNimi] || [];
      this.naytaModal = true;
    },
    suljeModal() {
      this.naytaModal = false;
      this.modalJoukkue = "";
      this.joukkueenPelaajat = [];
    },

    kirjauduSisaan() {
      if (this.salasana === "rantanen") {
        this.onKirjautunut = true;
        this.virhe = false;
      } else {
        this.virhe = true;
      }
    },

    async haeOttelut() {
      try {
        const response = await fetch("/api/eratulokset");
        const data = await response.json();

        if (data.error) {
          console.error("Virhe ottelutietojen haussa:", data.error);
          return;
        }

        // Päivitetään otteluohjelman tiedot Vue:ssa
        this.otteluohjelmaPerjantai.forEach((ottelu) => {
          const kentta1 = data.find(
            (item) => item.kentta === "kentta1" && item.aika === ottelu.aika
          );
          const kentta2 = data.find(
            (item) => item.kentta === "kentta2" && item.aika === ottelu.aika
          );
          const kentta3 = data.find(
            (item) => item.kentta === "kentta3" && item.aika === ottelu.aika
          );

          if (kentta1) {
            ottelu.kentta1Voitetut = kentta1.joukkue1_voitetut;
            ottelu.kentta1Havitut = kentta1.joukkue2_voitetut;
          }
          if (kentta2) {
            ottelu.kentta2Voitetut = kentta2.joukkue1_voitetut;
            ottelu.kentta2Havitut = kentta2.joukkue2_voitetut;
          }
          if (kentta3) {
            ottelu.kentta3Voitetut = kentta3.joukkue1_voitetut;
            ottelu.kentta3Havitut = kentta3.joukkue2_voitetut;
          }
        });
        this.otteluohjelmaLauantai.forEach((ottelu) => {
          const kentta1 = data.find(
            (item) => item.kentta === "kentta1" && item.aika === ottelu.aika
          );
          const kentta2 = data.find(
            (item) => item.kentta === "kentta2" && item.aika === ottelu.aika
          );
          const kentta3 = data.find(
            (item) => item.kentta === "kentta3" && item.aika === ottelu.aika
          );

          if (kentta1) {
            ottelu.kentta1Voitetut = kentta1.joukkue1_voitetut;
            ottelu.kentta1Havitut = kentta1.joukkue2_voitetut;
          }
          if (kentta2) {
            ottelu.kentta2Voitetut = kentta2.joukkue1_voitetut;
            ottelu.kentta2Havitut = kentta2.joukkue2_voitetut;
          }
          if (kentta3) {
            ottelu.kentta3Voitetut = kentta3.joukkue1_voitetut;
            ottelu.kentta3Havitut = kentta3.joukkue2_voitetut;
          }
        });
      } catch (error) {
        console.error("Virhe ottelutietojen haussa:", error);
      }
    },

    async tallennaErat(
      ottelu,
      voitetut,
      havitut,
      index,
      kenttaKey,
      ohjelmaTyyppi
    ) {
      if (
        !ottelu ||
        typeof voitetut !== "number" ||
        typeof havitut !== "number"
      ) {
        alert("Virhe: Tarkista eräluvut ja ottelutiedot!");
        return;
      }

      const [joukkue1, joukkue2] = ottelu.split(" vs ");
      const otteluOhjelma =
        ohjelmaTyyppi === "lauantai"
          ? this.otteluohjelmaLauantai
          : this.otteluohjelmaPerjantai;
      const currentOttelu = otteluOhjelma[index];

      // Tarkistetaan, että `currentOttelu` ja `aika` ovat määritetty
      if (!currentOttelu || !currentOttelu.aika) {
        console.error("Ottelua tai aikaa ei löytynyt:", { currentOttelu });
        alert("Virhe: Ottelutietoja ei löytynyt!");
        return;
      }

      try {
        // Lähetetään tiedot API:lle tallennettavaksi
        const response = await fetch("/api/eratulokset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kentta: kenttaKey,
            aika: currentOttelu.aika,
            joukkue1Voitetut: voitetut,
            joukkue2Voitetut: havitut,
          }),
        });

        const data = await response.json();
        if (data.error) {
          alert(`Virhe: ${data.error}`);
          return;
        }

        // Päivitetään Vue-tiedot suoraan ilman `$set`
        currentOttelu[`${kenttaKey}Voitetut`] = voitetut;
        currentOttelu[`${kenttaKey}Havitut`] = havitut;
      } catch (error) {
        console.error("Virhe erälukujen tallennuksessa:", error);
      }
    },
    async lataaDataJSON() {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();

        this.sarjataulukko = data.sarjataulukko;
        this.pelaajat = data.pelaajat;
        this.joukkueet = this.sarjataulukko.map((joukkue) => joukkue.nimi);

        this.valittuJoukkue = this.sarjataulukko[0]?.nimi || null;
        this.valittuPelaaja = this.pelaajat[0]?.nimi || null;
      } catch (error) {
        console.error("Tietojen lataaminen epäonnistui:", error);
      }
    },

    async lisaaTulos(tulos, maara) {
      if (!this.valittuJoukkue || !tulos || typeof maara !== "number") {
        alert("Virhe: Tarkista tiedot!");
        return;
      }

      try {
        const response = await fetch("/api/sarjataulukko", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nimi: this.valittuJoukkue, tulos, maara }),
        });
        const data = await response.json();

        if (data.error) {
          alert(`Virhe: ${data.error}`);
        } else {
          await this.paivitaSarjataulukko();
        }
      } catch (error) {
        console.error("Päivitys epäonnistui:", error);
      }
    },

    async paivitaSarjataulukko() {
      try {
        const response = await fetch("/api/sarjataulukko");
        this.sarjataulukko = await response.json();
        this.sarjataulukko.sort((a, b) => {
          const pisteetA = a.pisteet || 0;
          const pisteetB = b.pisteet || 0;
          return pisteetB - pisteetA;
        });
      } catch (error) {
        console.error("Sarjataulukon haku epäonnistui:", error);
      }
    },
    async paivitaKDA() {
      if (!this.valittuPelaaja) {
        alert("Valitse pelaaja!");
        return;
      }

      try {
        const response = await fetch("/api/tilastot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nimi: this.valittuPelaaja,
            kill: this.muutokset.kill,
            death: this.muutokset.death,
          }),
        });

        const data = await response.json();

        if (data.error) {
          console.log("MITÄ KETTINKIÄ");
        } else {
          await this.haePelaajat();
        }
      } catch (error) {
        console.error("Päivitys epäonnistui:", error);
      } finally {
        this.muutokset = { kill: 0, death: 0, assist: 0 };
      }
    },

    async lisaaPelaajaTulos(tyyppi, maara) {
      if (!this.valittuPelaaja || typeof maara !== "number") {
        alert("Virhe: Tarkista tiedot!");
        return;
      }

      try {
        const response = await fetch("/api/tilastot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nimi: this.valittuPelaaja,
            [tyyppi]: maara,
          }),
        });
        const data = await response.json();

        if (data.error) {
          alert(`Virhe: ${data.error}`);
        } else {
          await this.haePelaajat();
        }
      } catch (error) {
        console.error("Tilastojen päivitys epäonnistui:", error);
      }
    },

    async haePelaajat() {
      try {
        const response = await fetch("/api/tilastot");
        this.pelaajat = await response.json();
        this.pelaajat.sort((a, b) => {
          const ratioA = a.death > 0 ? a.kill / a.death : a.kill;
          const ratioB = b.death > 0 ? b.kill / b.death : b.kill;
          return ratioB - ratioA;
        });
      } catch (error) {
        console.error("Pelaajien haku epäonnistui:", error);
      }
    },
  },

  async mounted() {
    this.haeTiedot();
    await this.lataaDataJSON();
    await this.paivitaSarjataulukko();
    await this.haePelaajat();
    await this.haeOttelut();
  },
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 1;
  transform: scale(0.9);
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
}
.container {
  width: 80%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border-radius: 8px;
}

/* Poistaa nuolikuvakkeet Chrome, Safari, Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Poistaa nuolikuvakkeet Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: 2px solid pink; /* Sama kuin alkuperäisessä */
  padding: 5px; /* Lisää hieman tilaa */
  cursor: pointer;
}
.flame-effect {
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  0% {
    color: #ff6347;
    text-shadow: 0 0 2px #ff6347, 0 0 4px #ffa07a, 0 0 6px #ff4500;
  }
  50% {
    color: #ff7f50;
    text-shadow: 0 0 1px #ffa07a, 0 0 3px #ff6347, 0 0 5px #ff4500;
  }
  100% {
    color: #ffa07a;
    text-shadow: 0 0 2px #ffa07a, 0 0 4px #ff4500, 0 0 6px #ff6347;
  }
}
</style>
