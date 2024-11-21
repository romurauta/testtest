/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        coal: '#121212', // Tausta
        smoke: '#282828', // Elementti
        lightSmoke: '#3F3F3F', // Kevyempi harmaa
        pig: '#3f3f3f', // Korostus tms. pig nimi jäi aiemmasta pinkistä väristä
        gold: '#FFD700',
        cloud: '#8b8b8b',
        white: '#ECECEC',
        cta: '#FF6347'
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'], // Muuta tähän valitsemasi fontti
        serif: ['ui-serif', 'Georgia'],      // Vaihtoehtoisesti serif
        mono: ['ui-monospace', 'SFMono-Regular'], // Tai monospace
      },
    },
    plugins: [],
  }
}