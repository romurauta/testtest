import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore"
import { db } from "../lib/firestore"

export default defineEventHandler(async (event) => {
	if (event.method === "GET") {
		try {
			// Hae kaikki ottelut Firestoresta
			const querySnapshot = await getDocs(collection(db, "ottelut"))
			const results = []
			querySnapshot.forEach((doc) => {
				results.push({ id: doc.id, ...doc.data() })
			})
			return results
		} catch (error) {
			console.error("Virhe otteluiden haussa:", error)
			return { error: "Virhe otteluiden haussa" }
		}
	}

	if (event.method === "POST") {
		const { kentta, aika, joukkue1Voitetut, joukkue2Voitetut } = await readBody(event)

		// Tarkistetaan, että kaikki tiedot ovat olemassa
		if (!kentta || !aika || typeof joukkue1Voitetut !== "number" || typeof joukkue2Voitetut !== "number") {
			return { error: "Invalid data provided" }
		}

		try {
			// Hae ottelun dokumentti Firestoresta
			const ottelutRef = collection(db, "ottelut")
			const q = query(ottelutRef, where("kentta", "==", kentta), where("aika", "==", aika))
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				return { error: "Ottelua ei löytynyt" }
			}

			// Päivitetään ensimmäinen löytynyt dokumentti (oletetaan, että kenttä ja aika ovat yksilöllisiä)
			const otteluDoc = querySnapshot.docs[0]
			const docRef = doc(db, "ottelut", otteluDoc.id)

			await updateDoc(docRef, {
				joukkue1_voitetut: joukkue1Voitetut,
				joukkue2_voitetut: joukkue2Voitetut,
			})

			return { success: true }
		} catch (error) {
			console.error("Virhe tietokantapäivityksessä:", error)
			return { error: "Tietokantapäivitys epäonnistui" }
		}
	}

	return { error: "Method not allowed" }
})
