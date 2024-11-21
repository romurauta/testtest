import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyBKnXI3zOUFw40L9p7BMYAGBD9bX1oShbM",
	authDomain: "tournamentcs-43634.firebaseapp.com",
	projectId: "tournamentcs-43634",
	storageBucket: "tournamentcs-43634.firebasestorage.app",
	messagingSenderId: "770650716025",
	appId: "1:770650716025:web:7d963e15f2ba2eeb96a1a8",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function uploadData() {
	try {
		// Sarjataulukko data
		const sarjataulukko = [
			{ nimi: "HH", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
			{ nimi: "HNJHN", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
			{ nimi: "AAK", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
			{ nimi: "100KL", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
			{ nimi: "KN", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
			{ nimi: "VFC", voitot: 0, tasapelit: 0, havio: 0, pisteet: 0 },
		]

		for (const team of sarjataulukko) {
			await setDoc(doc(db, "sarjataulukko", team.nimi), team)
		}

		// Pelaajat data
		const pelaajat = [
			"Mussu",
			"Joge",
			"VerdiH",
			"Radu",
			"nico_ilari",
			"tenho",
			"heGe",
			"wiilis",
			"pantsi",
			"ZzeiT",
			"Perä_carry",
			"-Pule",
			"JerDAD",
			"vedivaan",
			"Are",
			"Löyläri",
			"lärvi",
			"s1mple",
			"Candle",
			"HASSE",
			"Jerbanderus",
			"Pedro",
			"elmeri:D",
			"Plasen",
			"venyniilo",
			"Jakender",
			"J0nesy",
			"Peksi",
			"romurauta",
			"Omppu6",
		]

		for (const player of pelaajat) {
			await setDoc(doc(db, "pelaajat", player), {
				nimi: player,
				kill: 0,
				death: 0,
				assist: 0,
				ratio: 0,
			})
		}

		// Ottelut data
		const ottelut = [
			{ aika: "1. 18:00-18:45", kentta: "kentta1", joukkue1: "HH", joukkue2: "KN" },
			{ aika: "1. 18:00-18:45", kentta: "kentta2", joukkue1: "HNJHN", joukkue2: "100KL" },
			{ aika: "1. 18:00-18:45", kentta: "kentta3", joukkue1: "AAK", joukkue2: "VFC" },
			{ aika: "2. 18:45-19:30", kentta: "kentta1", joukkue1: "HH", joukkue2: "HNJHN" },
			{ aika: "2. 18:45-19:30", kentta: "kentta2", joukkue1: "KN", joukkue2: "AAK" },
			{ aika: "2. 18:45-19:30", kentta: "kentta3", joukkue1: "100KL", joukkue2: "VFC" },
			{ aika: "3. 19:30-20:15", kentta: "kentta1", joukkue1: "HH", joukkue2: "100KL" },
			{ aika: "3. 19:30-20:15", kentta: "kentta2", joukkue1: "KN", joukkue2: "VFC" },
			{ aika: "3. 19:30-20:15", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "AAK" },
			{ aika: "4. 20:15-21:00", kentta: "kentta1", joukkue1: "HH", joukkue2: "AAK" },
			{ aika: "4. 20:15-21:00", kentta: "kentta2", joukkue1: "KN", joukkue2: "100KL" },
			{ aika: "4. 20:15-21:00", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "VFC" },
			{ aika: "5. 21:00-21:45", kentta: "kentta1", joukkue1: "HH", joukkue2: "VFC" },
			{ aika: "5. 21:00-21:45", kentta: "kentta2", joukkue1: "KN", joukkue2: "HNJHN" },
			{ aika: "5. 21:00-21:45", kentta: "kentta3", joukkue1: "100KL", joukkue2: "AAK" },
			{ aika: "6. 21:45-22:30", kentta: "kentta1", joukkue1: "HH", joukkue2: "KN" },
			{ aika: "6. 21:45-22:30", kentta: "kentta2", joukkue1: "HNJHN", joukkue2: "100KL" },
			{ aika: "6. 21:45-22:30", kentta: "kentta3", joukkue1: "AAK", joukkue2: "VFC" },
			{ aika: "7. 22:30-23:15", kentta: "kentta1", joukkue1: "HH", joukkue2: "HNJHN" },
			{ aika: "7. 22:30-23:15", kentta: "kentta2", joukkue1: "KN", joukkue2: "AAK" },
			{ aika: "7. 22:30-23:15", kentta: "kentta3", joukkue1: "100KL", joukkue2: "VFC" },
			{ aika: "8. 23:15-00:00", kentta: "kentta1", joukkue1: "HH", joukkue2: "100KL" },
			{ aika: "8. 23:15-00:00", kentta: "kentta2", joukkue1: "KN", joukkue2: "VFC" },
			{ aika: "8. 23:15-00:00", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "AAK" },
			{ aika: "9. 00:00-00:45", kentta: "kentta1", joukkue1: "HH", joukkue2: "AAK" },
			{ aika: "9. 00:00-00:45", kentta: "kentta2", joukkue1: "KN", joukkue2: "100KL" },
			{ aika: "9. 00:00-00:45", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "VFC" },
			{ aika: "10. 00:45-01:30", kentta: "kentta1", joukkue1: "HH", joukkue2: "VFC" },
			{ aika: "10. 00:45-01:30", kentta: "kentta2", joukkue1: "KN", joukkue2: "HNJHN" },
			{ aika: "10. 00:45-01:30", kentta: "kentta3", joukkue1: "100KL", joukkue2: "AAK" },
			{ aika: "11. 11:00-11:45", kentta: "kentta1", joukkue1: "HH", joukkue2: "KN" },
			{ aika: "11. 11:00-11:45", kentta: "kentta2", joukkue1: "HNJHN", joukkue2: "100KL" },
			{ aika: "11. 11:00-11:45", kentta: "kentta3", joukkue1: "100KL", joukkue2: "AAK" },
			{ aika: "12. 11:45-12:30", kentta: "kentta1", joukkue1: "HH", joukkue2: "HNJHN" },
			{ aika: "12. 11:45-12:30", kentta: "kentta2", joukkue1: "KN", joukkue2: "AAK" },
			{ aika: "12. 11:45-12:30", kentta: "kentta3", joukkue1: "100KL", joukkue2: "VFC" },
			{ aika: "13. 12:30-13:15", kentta: "kentta1", joukkue1: "HH", joukkue2: "100KL" },
			{ aika: "13. 12:30-13:15", kentta: "kentta2", joukkue1: "KN", joukkue2: "VFC" },
			{ aika: "13. 12:30-13:15", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "AAK" },
			{ aika: "14. 13:15-14:00", kentta: "kentta1", joukkue1: "HH", joukkue2: "AAK" },
			{ aika: "14. 13:15-14:00", kentta: "kentta2", joukkue1: "KN", joukkue2: "100KL" },
			{ aika: "14. 13:15-14:00", kentta: "kentta3", joukkue1: "HNJHN", joukkue2: "VFC" },
			{ aika: "15. 14:00-14:45", kentta: "kentta1", joukkue1: "HH", joukkue2: "VFC" },
			{ aika: "15. 14:00-14:45", kentta: "kentta2", joukkue1: "KN", joukkue2: "HNJHN" },
			{ aika: "15. 14:00-14:45", kentta: "kentta3", joukkue1: "100KL", joukkue2: "AAK" },
		]

		for (const match of ottelut) {
			const docRef = `${match.aika.replace(/\s+/g, "_")}_${match.kentta}`
			await setDoc(doc(db, "ottelut", docRef), match)
		}

		console.log("Data siirretty onnistuneesti Firestoreen!")
	} catch (error) {
		console.error("Virhe datan siirrossa:", error)
	}
}

uploadData()
