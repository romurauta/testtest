<template>
  <div>
    <h1>Turnauksen Sarjataulukko ja Otteluohjelma</h1>

    <h2>Sarjataulukko</h2>
    <table>
      <thead>
        <tr>
          <th>Joukkue</th>
          <th>Voitot</th>
          <th>Tasapelit</th>
          <th>Häviöt</th>
          <th>Pisteet</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="joukkue in sarjataulukko" :key="joukkue.nimi">
          <td>{{ joukkue.nimi }}</td>
          <td>{{ joukkue.voitot }}</td>
          <td>{{ joukkue.tasapelit }}</td>
          <td>{{ joukkue.havio }}</td>
          <td>{{ joukkue.pisteet }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Otteluohjelma</h2>
    <table>
      <thead>
        <tr>
          <th>Aika</th>
          <th>Kenttä 1</th>
          <th>Kenttä 2</th>
          <th>Kenttä 3</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ottelu, index) in otteluohjelma" :key="index">
          <td>{{ ottelu.aika }}</td>
          <td>{{ ottelu.kentta1 }}</td>
          <td>{{ ottelu.kentta2 }}</td>
          <td>{{ ottelu.kentta3 }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Lisää Tulos</h2>
    <div>
      <label for="joukkue">Valitse joukkue:</label>
      <select v-model="valittuJoukkue" id="joukkue">
        <option v-for="joukkue in joukkueet" :key="joukkue" :value="joukkue">
          {{ joukkue }}
        </option>
      </select>

      <button @click="lisaaTulos('voitto')">Voitto</button>
      <button @click="lisaaTulos('tasapeli')">Tasapeli</button>
      <button @click="lisaaTulos('havio')">Häviö</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joukkueet: ['Are', 'Hege', 'Pedro', 'Löyläri', 'Joge', 'Venyniilo'],
      valittuJoukkue: 'Are',
      sarjataulukko: [
        { nimi: 'Are', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
        { nimi: 'Hege', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
        { nimi: 'Pedro', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
        { nimi: 'Löyläri', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
        { nimi: 'Joge', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
        { nimi: 'Venyniilo', voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
      ],
      otteluohjelma: [
        {
          aika: '18:00-19:00',
          kentta1: 'Are vs Hege',
          kentta2: 'Pedro vs Löyläri',
          kentta3: 'Joge vs Venyniilo',
        },
        {
          aika: '19:00-20:00',
          kentta1: 'Are vs Pedro',
          kentta2: 'Hege vs Joge',
          kentta3: 'Löyläri vs Venyniilo',
        },
        {
          aika: '20:00-21:00',
          kentta1: 'RUOKATAUKO',
          kentta2: 'RUOKATAUKO',
          kentta3: 'RUOKATAUKO',
        },
        {
          aika: '21:00-22:00',
          kentta1: 'Are vs Löyläri',
          kentta2: 'Hege vs Venyniilo',
          kentta3: 'Pedro vs Joge',
        },
        {
          aika: '22:00-23:00',
          kentta1: 'Are vs Joge',
          kentta2: 'Hege vs Löyläri',
          kentta3: 'Pedro vs Venyniilo',
        },
      ],
    }
  },
  methods: {
    lisaaTulos(tulos) {
      const joukkue = this.sarjataulukko.find((j) => j.nimi === this.valittuJoukkue)
      if (tulos === 'voitto') {
        joukkue.voitot++
        joukkue.pisteet += 1
      } else if (tulos === 'tasapeli') {
        joukkue.tasapelit++
        joukkue.pisteet += 0
      } else if (tulos === 'havio') {
        joukkue.havio++
      }
    },
  },
}
</script>

<style>
table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
</style>
