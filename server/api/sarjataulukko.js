import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
	const method = getMethod(event)

	if (method === "GET") {
		try {
			// Palauta sarjataulukko Firestoresta
			const querySnapshot = await getDocs(collection(db, "sarjataulukko"))
			const results = []
			querySnapshot.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() })
			})
			return results
		} catch (error) {
			console.error("Virhe sarjataulukon haussa:", error)
			return { error: "Virhe sarjataulukon haussa" }
		}
	}

	if (method === "POST") {
		const { nimi, tulos, maara } = await readBody(event)

		// Tarkista syötteet
		if (!nimi || !tulos || typeof maara !== "number") {
			console.error("Virheelliset tiedot:", { nimi, tulos, maara })
			return { error: "Invalid data provided" }
		}

		try {
			// Hae joukkueen dokumentti Firestoresta
			const sarjataulukkoRef = collection(db, "sarjataulukko")
			const q = query(sarjataulukkoRef, where("nimi", "==", nimi))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				return { error: "Joukkuetta ei löytynyt" }
			}

			// Päivitä ensimmäinen löytynyt dokumentti
			const joukkueDoc = querySnapshot.docs[0]
			const docRef = doc(db, "sarjataulukko", joukkueDoc.id)

			const joukkueData = joukkueDoc.data()
			const uusiData = { ...joukkueData }

			if (tulos === "voitto") {
				uusiData.voitot = Math.max(0, (joukkueData.voitot || 0) + maara)
				uusiData.pisteet = Math.max(0, (joukkueData.pisteet || 0) + maara * 2)
			} else if (tulos === "tasapeli") {
				uusiData.tasapelit = Math.max(0, (joukkueData.tasapelit || 0) + maara)
				uusiData.pisteet = Math.max(0, (joukkueData.pisteet || 0) + maara)
			} else if (tulos === "havio") {
				uusiData.havio = Math.max(0, (joukkueData.havio || 0) + maara)
			} else {
				console.error("Virheellinen tulos:", tulos)
				return { error: "Invalid tulos value" }
			}

			// Päivitä dokumentti Firestoreen
			await updateDoc(docRef, uusiData)

			return { success: true }
		} catch (error) {
			console.error("Päivitys epäonnistui:", error)
			return { error: "Päivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})
